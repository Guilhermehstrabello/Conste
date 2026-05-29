"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Download, Mail, Phone, Building2, Edit3, Trash2 } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CircleXIcon } from "@hugeicons/core-free-icons";
import { createSupabaseClient } from "@/app/lib/supabase";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source?: string | null;
  created_at: string;
}

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
  className?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, ariaLabel, className = '' }) => {
  return (
    <label className={`relative inline-flex items-center justify-center ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
        className="peer sr-only"
      />
      <span className="flex h-4 w-4 items-center justify-center rounded border-2 border-[#5C33A8] bg-transparent transition-colors peer-checked:bg-[#5C33A8] peer-checked:border-[#5C33A8]">
        <svg
          viewBox="0 0 20 20"
          fill="none"
          className={`h-4 w-4 text-[#F4A261] absolute pointer-events-none transition-opacity duration-150 ${checked ? 'opacity-100' : 'opacity-0'}`}
        >
          <path
            d="M5 10.5L8.5 14L15 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </label>
  );
};

const LeadsDashboardClient: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactMenu, setContactMenu] = useState<{ leadId: string; field: 'email' | 'phone' } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLead, setDeletingLead] = useState<Lead | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "", company: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [copiedInfo, setCopiedInfo] = useState<{ id: string; field: "email" | "phone" } | null>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [isDeletingSelected, setIsDeletingSelected] = useState(false);
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);
  const contactMenuCloseTimeoutRef = useRef<number | null>(null);
  const router = useRouter();
  const supabase = createSupabaseClient();

  const formatLeadSource = (lead: Lead) => {
    const source = (lead.source || '').trim();
    if (!source) return 'Não informado';

    const normalized = source.toLowerCase();
    if (normalized.includes('google')) return 'Google';
    if (normalized.includes('facebook') || normalized.includes('meta')) return 'Facebook';
    if (normalized.includes('instagram')) return 'Instagram';
    if (normalized.includes('utm')) return source;

    return source;
  };

  const handleContactAction = (lead: Lead, field: 'email' | 'phone') => {
    if (field === 'email') {
      window.location.href = `mailto:${lead.email}`;
      return;
    }

    const digits = lead.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${digits}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (session && !sessionError) {
          setSession(session);
          setIsAuthenticated(true);
          fetchLeads(session.access_token);
          return;
        }

        const verifyRes = await fetch('/api/dev-auth', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (verifyRes.ok) {
          setIsAuthenticated(true);
          fetchLeads();
          return;
        }

        router.push('/login');
      } catch (err) {
        console.error('Auth check failed:', err);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router, supabase]);

  const fetchLeads = async (token?: string) => {
    try {
      setLoading(true);
      setError(null);

      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch('/api/admin/leads', {
        method: 'GET',
        headers,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `API error ${res.status}`);
      }

      const data = await res.json();
      setLeads(data.leads || []);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError(err instanceof Error ? err.message : "Erro ao carregar leads");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const getAuthHeaders = () => {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }
    return headers;
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setEditForm({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
    });
    setActionError(null);
  };

  const closeEditModal = () => {
    setEditingLead(null);
    setActionError(null);
  };

  const handleEditChange = (field: keyof typeof editForm, value: string) => {
    setEditForm((current) => ({ ...current, [field]: value }));
  };

  const handleSaveLead = async () => {
    if (!editingLead) return;

    setIsSaving(true);
    setActionError(null);

    try {
      const response = await fetch(`/api/admin/leads/${editingLead.id}`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || `Erro ao atualizar lead: ${response.status}`);
      }

      const data = await response.json();
      const updatedLead = data.lead;
      setLeads((current) => current.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
      closeEditModal();
    } catch (err) {
      console.error("Erro ao atualizar lead:", err);
      setActionError(err instanceof Error ? err.message : "Falha ao atualizar lead.");
    } finally {
      setIsSaving(false);
    }
  };

  const openDeleteModal = (lead: Lead) => {
    setDeletingLead(lead);
    setActionError(null);
  };

  const closeDeleteModal = () => {
    setDeletingLead(null);
    setActionError(null);
  };

  const handleDeleteLead = async () => {
    if (!deletingLead) return;

    setIsSaving(true);
    setActionError(null);

    try {
      await deleteLeadById(deletingLead.id);

      setLeads((current) => current.filter((currentLead) => currentLead.id !== deletingLead.id));
      setSelectedLeadIds((current) => current.filter((leadId) => leadId !== deletingLead.id));
      closeDeleteModal();
    } catch (err) {
      console.error("Erro ao remover lead:", err);
      setActionError(err instanceof Error ? err.message : "Falha ao remover lead.");
    } finally {
      setIsSaving(false);
    }
  };

  const openContactMenu = (leadId: string, field: "email" | "phone") => {
    if (contactMenuCloseTimeoutRef.current) {
      window.clearTimeout(contactMenuCloseTimeoutRef.current);
      contactMenuCloseTimeoutRef.current = null;
    }
    setContactMenu({ leadId, field });
  };

  const closeContactMenu = () => {
    if (contactMenuCloseTimeoutRef.current) {
      window.clearTimeout(contactMenuCloseTimeoutRef.current);
    }

    contactMenuCloseTimeoutRef.current = window.setTimeout(() => {
      setContactMenu(null);
      contactMenuCloseTimeoutRef.current = null;
    }, 150);
  };

  const cancelContactMenuClose = () => {
    if (contactMenuCloseTimeoutRef.current) {
      window.clearTimeout(contactMenuCloseTimeoutRef.current);
      contactMenuCloseTimeoutRef.current = null;
    }
  };

  const toggleLeadSelection = (leadId: string) => {
    setSelectedLeadIds((current) =>
      current.includes(leadId)
        ? current.filter((selectedId) => selectedId !== leadId)
        : [...current, leadId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedLeadIds.length === leads.length) {
      setSelectedLeadIds([]);
      return;
    }

    setSelectedLeadIds(leads.map((lead) => lead.id));
  };

  const deleteLeadById = async (leadId: string) => {
    const response = await fetch(`/api/admin/leads/${leadId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || `Erro ao remover lead: ${response.status}`);
    }
  };

  const copyToClipboard = (text: string, leadId: string, field: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    setCopiedInfo({ id: leadId, field });
    if (copyTimeoutRef.current) {
      window.clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = window.setTimeout(() => {
      setCopiedInfo(null);
      copyTimeoutRef.current = null;
    }, 2000);
  };

  const closeBulkDeleteModal = () => {
    setShowBulkDeleteModal(false);
    setActionError(null);
  };

  const handleDeleteSelected = async () => {
    if (selectedLeadIds.length === 0) return;

    setIsDeletingSelected(true);
    setActionError(null);

    try {
      const successfulDeletions: string[] = [];
      const failedDeletions: string[] = [];

      for (const leadId of selectedLeadIds) {
        try {
          await deleteLeadById(leadId);
          successfulDeletions.push(leadId);
        } catch {
          failedDeletions.push(leadId);
        }
      }

      setLeads((current) => current.filter((lead) => !successfulDeletions.includes(lead.id)));
      setSelectedLeadIds((current) => current.filter((leadId) => !successfulDeletions.includes(leadId)));
      setShowBulkDeleteModal(false);

      if (failedDeletions.length > 0) {
        setActionError(`Falha ao excluir ${failedDeletions.length} lead(s).`);
      }
    } finally {
      setIsDeletingSelected(false);
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
      if (contactMenuCloseTimeoutRef.current) {
        window.clearTimeout(contactMenuCloseTimeoutRef.current);
      }
    };
  }, []);

  const exportCSV = () => {
    const csv = [
      ["Nome", "Email", "Telefone", "Empresa", "Origem", "Data"],
      ...leads.map((lead) => [
        lead.name,
        lead.email,
        lead.phone,
        lead.company,
        formatLeadSource(lead),
        new Date(lead.created_at).toLocaleDateString("pt-BR"),
      ]),
    ];

    const csvContent = csv.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E0E0E] flex items-center justify-center p-4">
        <div className="text-white">Verificando autenticação...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0E0E0E] p-4 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard de Leads</h1>
            <p className="text-[#B9A3E3]">
              Visualize e gerencie todos os leads do seu formulário.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#310276] hover:bg-[#40009E] text-white transition duration-200"
            >
              Ir para NPS
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 transition duration-200"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#1A0B2E] border border-[#40009E] rounded-lg p-6">
            <div className="text-[#B9A3E3] text-sm font-medium mb-2">Total de Leads</div>
            <div className="text-4xl font-bold text-white">{leads.length}</div>
          </div>
          <div className="bg-[#1A0B2E] border border-[#40009E] rounded-lg p-6">
            <div className="text-[#B9A3E3] text-sm font-medium mb-2">Últimos 7 dias</div>
            <div className="text-4xl font-bold text-white">
              {leads.filter((l) => {
                const date = new Date(l.created_at);
                const daysAgo = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
                return daysAgo <= 7;
              }).length}
            </div>
          </div>
          <div className="bg-[#1A0B2E] border border-[#40009E] rounded-lg p-6">
            <div className="text-[#B9A3E3] text-sm font-medium mb-2">Ação</div>
            <button
              onClick={exportCSV}
              disabled={leads.length === 0}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#310276] hover:bg-[#40009E] text-white disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-semibold"
            >
              <Download size={18} />
              <span>Exportar CSV</span>
            </button>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center text-[#B9A3E3] py-12">Carregando leads...</div>
        ) : error ? (
          <div className="bg-red-600/10 border border-red-600/50 rounded-lg p-4 text-red-400">
            {error}
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-[#1A0B2E] border border-[#40009E] rounded-lg p-8 text-center">
            <p className="text-[#B9A3E3] mb-4">Nenhum lead ainda</p>
            <p className="text-sm text-[#B9A3E3]/60">
              Os leads que responderem seus formulários aparecerão aqui
            </p>
          </div>
        ) : (
          <div>
            {selectedLeadIds.length > 0 && (
              <div className="mb-4 flex items-center justify-between rounded-xl border border-[#40009E]/40 bg-[#120824] px-4 py-3">
                <span className="text-sm text-[#B9A3E3]">
                  {selectedLeadIds.length} lead(s) selecionado(s)
                </span>
                <button
                  type="button"
                  onClick={() => setShowBulkDeleteModal(true)}
                  disabled={isDeletingSelected}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Excluir selecionados
                </button>
              </div>
            )}

            <div className="bg-[#1A0B2E] max-w-screen border border-[#40009E] rounded-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#40009E] bg-[#0E0E0E]">
                    <th className="px-4 py-4 text-left">
                      <CustomCheckbox
                        checked={leads.length > 0 && leads.every((lead) => selectedLeadIds.includes(lead.id))}
                        onChange={toggleSelectAll}
                        ariaLabel="Selecionar todos os leads"
                      />
                    </th>
                    <th className="text-left px-6 py-4 text-[#B9A3E3] font-semibold text-sm">
                      Nome
                    </th>
                    <th className="text-left px-6 py-4 text-[#B9A3E3] font-semibold text-sm">
                      Email
                    </th>
                    <th className="text-left px-6 py-4 text-[#B9A3E3] font-semibold text-sm">
                      Telefone
                    </th>
                    <th className="text-left px-6 py-4 text-[#B9A3E3] font-semibold text-sm">
                      Empresa
                    </th>
                    <th className="text-left px-6 py-4 text-[#B9A3E3] font-semibold text-sm">
                      Origem
                    </th>
                    <th className="text-left px-6 py-4 text-[#B9A3E3] font-semibold text-sm">
                      Data
                    </th>
                    <th className="text-right px-6 py-4 text-[#B9A3E3] font-semibold text-sm">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[#40009E]/30 hover:bg-[#310276]/20 transition"
                    >
                      <td className="px-4 py-4">
                        <CustomCheckbox
                          checked={selectedLeadIds.includes(lead.id)}
                          onChange={() => toggleLeadSelection(lead.id)}
                          ariaLabel={`Selecionar lead ${lead.name}`}
                        />
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-[#B9A3E3] align-top">
                        <div
                          className="relative inline-flex items-center"
                          onMouseEnter={() => openContactMenu(lead.id, 'email')}
                          onMouseLeave={closeContactMenu}
                        >
                          <span className="cursor-pointer hover:text-white transition">{lead.email}</span>
                          {contactMenu?.leadId === lead.id && contactMenu.field === 'email' && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              onMouseEnter={cancelContactMenuClose}
                              onMouseLeave={closeContactMenu}
                              className="absolute left-0 top-full z-20 mt-2 min-w-40 rounded-xl border border-[#5C33A8] bg-[#120824] p-2 shadow-lg shadow-black/40"
                            >
                              <div className="flex flex-col gap-1">
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(lead.email, lead.id, 'email')}
                                  className="rounded-lg px-2 py-1.5 text-left text-sm text-[#FFE0C0] hover:bg-[#310276]"
                                >
                                  Copiar email
                                </button>
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="rounded-lg px-2 py-1.5 text-left text-sm text-[#FFE0C0] hover:bg-[#310276]"
                                >
                                  Abrir email
                                </a>
                              </div>
                            </motion.div>
                          )}
                          {copiedInfo?.id === lead.id && copiedInfo.field === 'email' && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              className="absolute bottom-full left-0 z-10 mb-2 rounded-full bg-[#40009E] px-3 py-1 text-sm font-semibold text-white"
                            >
                              Copiado
                            </motion.div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#B9A3E3] align-top">
                        <div
                          className="relative inline-flex items-center"
                          onMouseEnter={() => openContactMenu(lead.id, 'phone')}
                          onMouseLeave={closeContactMenu}
                        >
                          <span className="cursor-pointer hover:text-white transition">{lead.phone}</span>
                          {contactMenu?.leadId === lead.id && contactMenu.field === 'phone' && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              onMouseEnter={cancelContactMenuClose}
                              onMouseLeave={closeContactMenu}
                              className="absolute left-0 top-full z-20 mt-2 min-w-40 rounded-xl border border-[#5C33A8] bg-[#120824] p-2 shadow-lg shadow-black/40"
                            >
                              <div className="flex flex-col gap-1">
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(lead.phone, lead.id, 'phone')}
                                  className="rounded-lg px-2 py-1.5 text-left text-sm text-[#FFE0C0] hover:bg-[#310276]"
                                >
                                  Copiar telefone
                                </button>
                                <a
                                  href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded-lg px-2 py-1.5 text-left text-sm text-[#FFE0C0] hover:bg-[#310276]"
                                >
                                  Abrir WhatsApp
                                </a>
                              </div>
                            </motion.div>
                          )}
                          {copiedInfo?.id === lead.id && copiedInfo.field === 'phone' && (
                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              className="absolute bottom-full left-0 z-10 mb-2 rounded-full bg-emerald-500/95 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-emerald-500/20"
                            >
                              Copiado
                            </motion.div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#B9A3E3]">{lead.company}</td>
                      <td className="px-6 py-4 text-[#B9A3E3] text-sm">
                        <span className="inline-flex rounded-full bg-[#310276]/80 p-2 text-xs font-semibold text-[#FFE0C0]">
                          {formatLeadSource(lead)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#B9A3E3] text-sm">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2 justify-end">
                          <button
                            type="button"
                            onClick={() => openEditModal(lead)}
                            className="inline-flex items-center justify-center rounded-lg border border-[#5C33A8] bg-[#120824] px-3 py-2 text-[#B9A3E3] hover:bg-[#1f0b42] transition"
                            title="Editar lead"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openDeleteModal(lead)}
                            className="inline-flex items-center justify-center rounded-lg border border-red-500 bg-red-600/10 px-3 py-2 text-red-300 hover:bg-red-600/20 transition"
                            title="Remover lead"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden p-4 space-y-4">
              {leads.map((lead, index) => (
                <motion.div
                  key={lead.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-[#0E0E0E] border border-[#40009E]/30 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <CustomCheckbox
                      checked={selectedLeadIds.includes(lead.id)}
                      onChange={() => toggleLeadSelection(lead.id)}
                      ariaLabel={`Selecionar lead ${lead.name}`}
                    />
                    <div className="flex-1 flex items-start justify-between">
                      <div>
                        <h3 className="text-white font-semibold">{lead.name}</h3>
                        <p className="text-[#B9A3E3] text-sm flex items-center gap-1 mt-1">
                          <Building2 size={14} />
                          {lead.company}
                        </p>
                      </div>
                      <span className="text-[#B9A3E3] text-xs">
                        {new Date(lead.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="relative">
                      <div
                        className="relative w-full"
                        onMouseEnter={() => openContactMenu(lead.id, 'email')}
                        onMouseLeave={closeContactMenu}
                      >
                        <button
                          type="button"
                          onClick={() => copyToClipboard(lead.email, lead.id, 'email')}
                          className="w-full text-left text-[#B9A3E3] hover:text-orange-500 transition text-sm"
                          title="Clique para copiar email"
                        >
                          <span className="flex items-center gap-2">
                            <Mail size={14} />
                            {lead.email}
                          </span>
                        </button>
                        {contactMenu?.leadId === lead.id && contactMenu.field === 'email' && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            onMouseEnter={cancelContactMenuClose}
                            onMouseLeave={closeContactMenu}
                            className="absolute left-0 top-full z-20 mt-2 min-w-40 rounded-xl border border-[#5C33A8] bg-[#120824] p-2 shadow-lg shadow-black/40"
                          >
                            <div className="flex flex-col gap-1">
                              <button
                                type="button"
                                onClick={() => copyToClipboard(lead.email, lead.id, 'email')}
                                className="rounded-lg px-2 py-1.5 text-left text-sm text-[#FFE0C0] hover:bg-[#310276]"
                              >
                                Copiar email
                              </button>
                              <a
                                href={`mailto:${lead.email}`}
                                className="rounded-lg px-2 py-1.5 text-left text-sm text-[#FFE0C0] hover:bg-[#310276]"
                              >
                                Abrir email
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      {copiedInfo?.id === lead.id && copiedInfo.field === 'email' && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="absolute bottom-full left-0 z-10 mb-2 rounded-full bg-emerald-500/95 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-emerald-500/20"
                        >
                          Copiado
                        </motion.div>
                      )}
                    </div>
                    <div className="relative">
                      <div
                        className="relative w-full"
                        onMouseEnter={() => openContactMenu(lead.id, 'phone')}
                        onMouseLeave={closeContactMenu}
                      >
                        <button
                          type="button"
                          onClick={() => copyToClipboard(lead.phone, lead.id, 'phone')}
                          className="w-full text-left text-[#B9A3E3] hover:text-orange-500 transition text-sm"
                          title="Clique para copiar telefone"
                        >
                          <span className="flex items-center gap-2">
                            <Phone size={14} />
                            {lead.phone}
                          </span>
                        </button>
                        {contactMenu?.leadId === lead.id && contactMenu.field === 'phone' && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            onMouseEnter={cancelContactMenuClose}
                            onMouseLeave={closeContactMenu}
                            className="absolute left-0 top-full z-20 mt-2 min-w-40 rounded-xl border border-[#5C33A8] bg-[#120824] p-2 shadow-lg shadow-black/40"
                          >
                            <div className="flex flex-col gap-1">
                              <button
                                type="button"
                                onClick={() => copyToClipboard(lead.phone, lead.id, 'phone')}
                                className="rounded-lg px-2 py-1.5 text-left text-sm text-[#FFE0C0] hover:bg-[#310276]"
                              >
                                Copiar telefone
                              </button>
                              <a
                                href={`https://wa.me/55${lead.phone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-lg px-2 py-1.5 text-left text-sm text-[#FFE0C0] hover:bg-[#310276]"
                              >
                                Abrir WhatsApp
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      {copiedInfo?.id === lead.id && copiedInfo.field === 'phone' && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="absolute bottom-full left-0 z-10 mb-2 rounded-full bg-emerald-500/95 px-3 py-1 text-[11px] font-semibold text-white shadow-lg shadow-emerald-500/20"
                        >
                          Copiado
                        </motion.div>
                      )}
                    </div>
                    <div className="rounded-xl bg-[#120824] px-3 py-2 text-sm">
                      <div className="text-[#B9A3E3] text-xs uppercase mb-1">Origem</div>
                      <span className="inline-flex px-2 py-1 text-[10px] font-semibold uppercase text-[#FFE0C0]">
                        {formatLeadSource(lead)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => openEditModal(lead)}
                      className="inline-flex items-center gap-2 rounded-lg border border-[#5C33A8] bg-[#120824] px-4 py-2 text-[#B9A3E3] hover:bg-[#1f0b42] transition"
                    >
                      <Edit3 size={16} />
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => openDeleteModal(lead)}
                      className="inline-flex items-center gap-2 rounded-lg border border-red-500 bg-red-600/10 px-4 py-2 text-red-300 hover:bg-red-600/20 transition"
                    >
                      <Trash2 size={16} />
                      Remover
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        )}

        {showBulkDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-[#0D0B18] p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-red-300/80">Confirmar exclusão em lote</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Excluir leads selecionados</h3>
                </div>
                <button
                  type="button"
                  onClick={closeBulkDeleteModal}
                  className="rounded-full p-2 text-red-300 hover:bg-red-500/10 transition"
                  aria-label="Fechar confirmação em lote"
                >
                  <HugeiconsIcon icon={CircleXIcon} size={20} color="currentColor" />
                </button>
              </div>

              <p className="text-sm leading-6 text-[#D1C4F6]">
                Você está prestes a excluir <span className="font-semibold text-white">{selectedLeadIds.length}</span> lead(s) selecionado(s).
                Esta ação é permanente e não pode ser desfeita.
              </p>

              {actionError && (
                <div className="mt-4 rounded-2xl bg-red-600/10 border border-red-600/50 p-4 text-sm text-red-300">
                  {actionError}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-start">
                <button
                  type="button"
                  onClick={closeBulkDeleteModal}
                  className="rounded-2xl border border-[#5C33A8] px-5 py-3 text-sm text-[#B9A3E3] hover:bg-[#1f0b42] transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleDeleteSelected}
                  disabled={isDeletingSelected}
                  className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isDeletingSelected ? 'Excluindo...' : 'Excluir permanentemente'}
                </button>
              </div>
            </div>
          </div>
        )}

        {editingLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-2xl rounded-3xl border border-[#5C33A8] bg-[#0D0B18] p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Editar Lead</h2>
                  <p className="text-sm text-[#B9A3E3]/80">Atualize as informações e salve as alterações.</p>
                </div>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-full hover:bg-[#1f0b42] p-2 text-[#B9A3E3] transition"
                  aria-label="Fechar edição"
                >
                  <HugeiconsIcon icon={CircleXIcon} size={28} color="currentColor" />
                </button>
              </div>

              {actionError && (
                <div className="mb-4 rounded-xl bg-red-600/10 border border-red-600/50 p-4 text-sm text-red-300">
                  {actionError}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-1 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-[#B9A3E3]">
                  Nome
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(event) => handleEditChange("name", event.target.value)}
                    className="w-full rounded-2xl border border-[#5C33A8] bg-[#120824] px-4 py-3 text-white outline-none focus:border-[#9C65FF]"
                  />
                </label>

                <label className="space-y-2 text-sm text-[#B9A3E3]">
                  Email
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(event) => handleEditChange("email", event.target.value)}
                    className="w-full rounded-2xl border border-[#5C33A8] bg-[#120824] px-4 py-3 text-white outline-none focus:border-[#9C65FF]"
                  />
                </label>

                <label className="space-y-2 text-sm text-[#B9A3E3]">
                  Telefone
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(event) => handleEditChange("phone", event.target.value)}
                    className="w-full rounded-2xl border border-[#5C33A8] bg-[#120824] px-4 py-3 text-white outline-none focus:border-[#9C65FF]"
                  />
                </label>

                <label className="space-y-2 text-sm text-[#B9A3E3]">
                  Empresa
                  <input
                    type="text"
                    value={editForm.company}
                    onChange={(event) => handleEditChange("company", event.target.value)}
                    className="w-full rounded-2xl border border-[#5C33A8] bg-[#120824] px-4 py-3 text-white outline-none focus:border-[#9C65FF]"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-start">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-2xl border border-[#5C33A8] px-5 py-3 text-sm text-[#B9A3E3] hover:bg-[#1f0b42] transition"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveLead}
                  disabled={isSaving}
                  className="rounded-2xl bg-[#5C33A8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#7c4dff] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isSaving ? "Salvando..." : "Salvar alterações"}
                </button>
              </div>
            </div>
          </div>
        )}

        {deletingLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg rounded-xl border border-red-500/30 bg-[#0B0716] p-6 ">
              <div className="flex items-center justify-between gap-4 border-b border-red-500/20 pb-4 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-red-300/80">Confirmar Exclusão</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">Remover Lead</h3>
                </div>
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="rounded-full p-2 text-red-300 hover:bg-red-500/10 transition"
                  aria-label="Fechar confirmação de exclusão"
                >
                  <HugeiconsIcon icon={CircleXIcon} size={20} color="currentColor" />
                </button>
              </div>

              <div className="space-y-4 text-[#D1C4F6]">
                <p className="text-sm leading-6">
                  Você está prestes a excluir o lead <span className="font-semibold text-white">{deletingLead.name}</span>.
                  Esta ação é permanente e não pode ser desfeita.
                </p>
                <div className="rounded-xl border border-red-500/20 bg-[#160722] p-4">
                  <p className="text-sm text-[#B9A3E3]">Email: <span className="text-white">{deletingLead.email}</span></p>
                  <p className="text-sm text-[#B9A3E3]">Telefone: <span className="text-white">{deletingLead.phone}</span></p>
                </div>
              </div>

              {actionError && (
                <div className="mt-4 rounded-2xl bg-red-600/10 border border-red-600/50 p-4 text-sm text-red-300">
                  {actionError}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-start">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="rounded-2xl border border-[#5C33A8] px-5 py-3 text-sm text-[#B9A3E3] hover:bg-[#1f0b42] transition"
                >
                  Manter Lead
                </button>
                <button
                  type="button"
                  onClick={handleDeleteLead}
                  disabled={isSaving}
                  className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {isSaving ? "Removendo..." : "Excluir permanentemente"}
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

    </div>
  );
};

export default LeadsDashboardClient;

"use client";

import { useState, useEffect } from 'react';

export interface NPSResponse {
  id: number;
  name: string;
  company: string;
  score: number;
  improvement: string;
  positive_points: string;
  marketing_effectiveness: string;
  recommend: string;
  extra_comment?: string;
  created_at: string;
}

export interface NPSSummary {
  totalResponses: number;
  averageScore: number;
  npsScore: number;
  promoters: number;
  passives: number;
  detractors: number;
  responsesByScore: Record<number, number>;
  monthlyTrend: Array<{
    month: string;
    averageScore: number;
    responseCount: number;
  }>;
}

export interface NPSData {
  data: NPSResponse[];
  summary: NPSSummary;
  pagination: {
    limit: number;
    offset: number;
    total: number;
  };
}

export interface NPSFilters {
  limit?: number;
  offset?: number;
  score?: number | 'all';
  dateFrom?: string;
  dateTo?: string;
}

export function useNPSData(filters: NPSFilters = {}) {
  const [data, setData] = useState<NPSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams();
      
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.offset) params.append('offset', filters.offset.toString());
      if (filters.score && filters.score !== 'all') params.append('score', filters.score.toString());
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);

      const response = await fetch(`/api/respostas-nps?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao buscar dados NPS:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters.limit, filters.offset, filters.score, filters.dateFrom, filters.dateTo]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

export function getNPSCategory(score: number): { category: string; color: string } {
  if (score >= 9) {
    return { category: 'Promotores', color: '#10B981' }; // Green
  } else if (score >= 7) {
    return { category: 'Neutros', color: '#F59E0B' }; // Yellow
  } else {
    return { category: 'Detratores', color: '#EF4444' }; // Red
  }
}

export function formatNPSScore(score: number): string {
  return score >= 0 ? `+${score.toFixed(1)}` : score.toFixed(1);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function formatMonth(monthString: string): string {
  const [year, month] = monthString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('pt-BR', {
    month: 'short',
    year: '2-digit'
  });
}
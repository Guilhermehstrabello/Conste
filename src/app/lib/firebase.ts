import { getFirestore } from 'firebase/firestore';
import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';

// Definindo a interface para as configurações do Firebase
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Configuração do Firebase com tipagem (usa env se disponível; fallback para valores atuais)
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Validação clara das vars obrigatórias em runtime (falha explícita em produção)
const required = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID"
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length > 0) {
  const msg = `Missing Firebase env vars: ${missing.join(", ")}`;
  // Em produção, falhe rápido; em dev, apenas logue para não interromper testes locais
  if (process.env.NODE_ENV === "production") {
    console.error("Firebase env vars ausentes:", missing.join(", "), { firebaseConfig });
    throw new Error(msg);
  } else {
    console.warn("Firebase env vars ausentes (dev):", missing.join(", "), { firebaseConfig });
    // continuar sem lançar para permitir testes locais (garanta .env.local depois)
  }
}

// Inicializando o app Firebase com singleton para evitar múltiplas inicializações no Next.js
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Obtendo uma instância do Firestore
const db: Firestore = getFirestore(app);

export { db };
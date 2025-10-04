import { getFirestore } from 'firebase/firestore';
import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Firestore } from 'firebase/firestore';


// Configuração do Firebase com tipagem (usa env se disponível; fallback para valores atuais)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  // Corrigido: storageBucket costuma usar o domínio appspot.com
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

// Inicializando o app Firebase com singleton para evitar múltiplas inicializações no Next.js
const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Obtendo uma instância do Firestore
const db: Firestore = getFirestore(app);

export { db };
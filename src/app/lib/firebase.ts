import { getFirestore } from 'firebase/firestore';
import { FirebaseApp, initializeApp } from 'firebase/app';
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

// Configuração do Firebase com tipagem
const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyDUizAQi6oITMqW9NR-cLSxXJrfY1WWJjk",
  authDomain: "form-lp-conste.firebaseapp.com",
  projectId: "form-lp-conste",
  storageBucket: "form-lp-conste.firebasestorage.app",
  messagingSenderId: "876627714829",
  appId: "1:876627714829:web:cbbab83a8e99ce822e4644"
};

// Inicializando o app Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Obtendo uma instância do Firestore
const db: Firestore = getFirestore(app);

export { db };
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// --- DUBLÊS (Componentes temporários para o site funcionar sem as pastas extras) ---
// Assim que você criar os arquivos reais, nós trocamos isso.
const HomeView = () => <div style={{padding: '2rem'}}><h2>Bem-vindo à Gestão de Obras</h2><p>O sistema está online! Agora podemos construir as funcionalidades.</p></div>;
const AssistantsView = () => <div>Página de Assistentes (Em construção)</div>;
const ToolsHubView = () => <div>Ferramentas (Em construção)</div>;
const VideoClassesView = () => <div>Aulas (Em construção)</div>;
const BlogView = () => <div>Blog (Em construção)</div>;
const AdminPanel = () => <div>Painel Admin (Em construção)</div>;
// ----------------------------------------------------------------------------------

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar que você já consertou */}
      <Navbar />

      <main style={{ flex: 1, padding: '10px' }}>
        {currentView === 'home' && <HomeView />}
        {/* Lógica simples para alternar telas no futuro */}
      </main>

      {/* Footer que você já consertou */}
      <Footer />
    </div>
  );
}

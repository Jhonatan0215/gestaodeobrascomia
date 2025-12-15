import React from 'react';

export default function Home() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Cabeçalho Hero */}
      <section style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f0f9ff', borderRadius: '12px', marginBottom: '40px' }}>
        <h1 style={{ color: '#0f172a', fontSize: '3rem', marginBottom: '10px' }}>
          Gestão de Obras com <span style={{ color: '#0ea5e9' }}>Inteligência Artificial</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Aumente sua produtividade e elimine erros com nossa suíte de ferramentas para engenheiros e arquitetos.
        </p>
        <button style={{ marginTop: '20px', padding: '12px 24px', fontSize: '1rem', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Acessar Ferramentas IA 🚀
        </button>
      </section>

      {/* Grid de Funcionalidades */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Card 1 */}
        <div style={{ border: '1px solid #e2e8f0', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ color: '#0f172a' }}>🤖 Assistentes Especializados</h3>
          <p style={{ color: '#64748b' }}>Bots treinados para responder dúvidas técnicas e normas (NBR).</p>
        </div>

        {/* Card 2 */}
        <div style={{ border: '1px solid #e2e8f0', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ color: '#0f172a' }}>📝 Gerador de Documentos</h3>
          <p style={{ color: '#64748b' }}>Crie relatórios, diários de obra e contratos em segundos.</p>
        </div>

        {/* Card 3 */}
        <div style={{ border: '1px solid #e2e8f0', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ color: '#0f172a' }}>📊 Orçamentos Automáticos</h3>
          <p style={{ color: '#64748b' }}>Integração com tabelas e composições de preço.</p>
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AssistantsView, ToolsHubView, VideoClassesView, BlogView } from './components/PageViews';
import { AdminPanel } from './components/Admin';
import { Prompt, Assistant } from './types';
import { api } from './src/lib/api';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');

  // Global State managed by Admin
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [heroImage, setHeroImage] = useState("https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2532&auto=format&fit=crop");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedPrompts, fetchedAssistants] = await Promise.all([
          api.getPrompts(),
          api.getAssistants()
        ]);

        // If DB is empty, fallback to static data (optional, or just show empty)
        // For now, if empty, we use static data so the user sees something initially? 
        // No, user wants migration. But if he didn't migrate data yet, it will be empty.
        // Let's use fetched data.
        setPrompts(fetchedPrompts);
        setAssistants(fetchedAssistants);

      } catch (error) {
        console.error("Failed to load data", error);
        // Fallback or Alert?
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // If viewing admin, render admin panel full screen
  if (currentView === 'admin') {
    return (
      <AdminPanel
        onLogout={() => setCurrentView('home')}
        prompts={prompts}
        setPrompts={setPrompts}
        assistants={assistants}
        setAssistants={setAssistants}
        heroImage={heroImage}
        setHeroImage={setHeroImage}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-surface">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-secondary font-bold animate-pulse">Carregando Hub...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            prompts={prompts}
            heroImage={heroImage}
          />
        )}

        {/* We pass assistants state to the view */}
        {currentView === 'assistants' && (
          <AssistantsView assistants={assistants} />
        )}

        {currentView === 'tools' && <ToolsHubView />}
        {currentView === 'videos' && <VideoClassesView />}
        {currentView === 'blog' && <BlogView />}
      </main>

      <Footer />
    </div>
  );
};

export default App;

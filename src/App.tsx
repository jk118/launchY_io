import { useState } from 'react';
import { initialFormData, type FormData, type ScreenState } from './types';
import Nav from './components/Nav';
import FormScreen from './components/FormScreen';
import GeneratingScreen from './components/GeneratingScreen';
import ResultsScreen from './components/ResultsScreen';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('form');
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const startGeneration = () => {
    setScreen('generating');
  };

  const handleGenerationComplete = () => {
    setScreen('results');
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setScreen('form');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Nav />
      
      <main className="flex-1 flex flex-col relative">
        {/* Subtle animated gradient background for form & generating screens */}
        {(screen === 'form' || screen === 'generating') && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
            <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
          </div>
        )}

        <div className="relative z-10 flex-1 flex flex-col">
          {screen === 'form' && (
            <FormScreen 
              formData={formData} 
              setFormData={setFormData} 
              onComplete={startGeneration} 
            />
          )}
          {screen === 'generating' && (
            <GeneratingScreen 
              onComplete={handleGenerationComplete} 
            />
          )}
          {screen === 'results' && (
            <ResultsScreen 
              formData={formData} 
              onRestart={resetForm} 
            />
          )}
        </div>
      </main>
    </div>
  );
}

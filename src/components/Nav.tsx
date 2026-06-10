import { Sparkles } from 'lucide-react';

export default function Nav() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b border-white/5 relative z-20 bg-[#0A0A0A]/50 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="text-xl font-semibold tracking-tight text-white">LaunchY<span className="text-white/60">.io</span></span>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70">
        <Sparkles className="w-3 h-3 text-violet-400" />
        <span>Powered by Akamai AI</span>
      </div>
    </nav>
  );
}

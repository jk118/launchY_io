import { type FormData } from '../types';
import { motion } from 'motion/react';
import { Download, RefreshCw, Copy, Play, Share, Sparkles } from 'lucide-react';

interface ResultsScreenProps {
  formData: FormData;
  onRestart: () => void;
}

export default function ResultsScreen({ formData, onRestart }: ResultsScreenProps) {
  
  const concepts = [
    { id: 1, title: 'Bold Founder Story', style: 'Cinematic', duration: formData.videoLength, thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, title: 'Product-First Demo', style: 'Technical', duration: formData.videoLength, thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, title: 'High-Energy Hype', style: 'Motion Graphics', duration: formData.videoLength, thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop' },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 lg:p-12 max-w-7xl mx-auto w-full">
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Your Launch Concepts</h1>
          <p className="text-white/50">Generated for {formData.name || 'your startup'}</p>
        </div>
        <button 
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-white/10 hover:bg-white/5 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Start New Campaign
        </button>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {concepts.map((concept, i) => (
          <motion.div 
            key={concept.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col bg-[#121212] border border-white/5 rounded-2xl overflow-hidden group"
          >
            {/* Thumbnail/Player Placeholder */}
            <div className="aspect-video relative bg-black border-b border-white/5 overflow-hidden">
              <img src={concept.thumbnail} alt={concept.title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <button className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-violet-600 hover:border-violet-500 transition-colors">
                <Play className="w-5 h-5 ml-1" fill="currentColor" />
              </button>
              <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/60 backdrop-blur text-[10px] font-medium text-white/90">
                00:{concept.duration}
              </div>
            </div>

            {/* Details */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider bg-white/5 text-white/70">
                  {concept.style}
                </span>
                {formData.tone && (
                  <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider bg-violet-500/10 text-violet-400">
                    {formData.tone}
                  </span>
                )}
              </div>
              <h3 className="font-medium text-lg leading-tight mb-6">{concept.title}</h3>
              
              <div className="mt-auto flex items-center gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition-colors">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-white/10 hover:bg-white/5 transition-colors" title="Refine">
                  <Sparkles className="w-4 h-4 text-white/70" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Script Section */}
      <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Generated Master Script</h2>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 text-xs font-medium hover:bg-white/5 transition-colors">
              <Copy className="w-3.5 h-3.5" />
              Copy
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 text-xs font-medium hover:bg-white/5 transition-colors">
              <Share className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        <div className="space-y-6 font-mono text-sm text-white/80 leading-relaxed border-l-2 border-white/10 pl-4 sm:pl-6">
          <div className="relative">
            <span className="absolute -left-[30px] sm:-left-[38px] top-1 text-[10px] text-white/40 bg-[#121212] py-0.5 pr-2">00:00</span>
            <span className="text-violet-400 font-semibold">[VISUAL] </span> Fast-paced montage of frustrated people working late at laptops. Dark blue lighting.
            <br />
            <span className="text-emerald-400 font-semibold">[AUDIO] </span> Muffled, heavy bass heartbeat. 
          </div>
          <div className="relative">
            <span className="absolute -left-[30px] sm:-left-[38px] top-1 text-[10px] text-white/40 bg-[#121212] py-0.5 pr-2">00:05</span>
            <span className="text-violet-400 font-semibold">[VISUAL] </span> Abrupt cut to {formData.name || 'Startup'} dashboard. Clean, bright, purple glowing accents. 
            <br />
            <span className="text-emerald-400 font-semibold">[AUDIO] </span> Beat drops. Crisp synth wave.
            <br />
            <span className="text-blue-400 font-semibold">[VO] </span> "Stop doing it the hard way."
          </div>
          <div className="relative">
            <span className="absolute -left-[30px] sm:-left-[38px] top-1 text-[10px] text-white/40 bg-[#121212] py-0.5 pr-2">00:12</span>
            <span className="text-violet-400 font-semibold">[VISUAL] </span> Feature spotlights flashing in sync with the beat. 
            <br />
            <span className="text-blue-400 font-semibold">[VO] </span> "{formData.description || 'This changes everything.'}"
          </div>
          <div className="relative">
            <span className="absolute -left-[30px] sm:-left-[38px] top-1 text-[10px] text-white/40 bg-[#121212] py-0.5 pr-2">00:{formData.videoLength - 5}</span>
            <span className="text-violet-400 font-semibold">[VISUAL] </span> Fade to black. Logo appears. 
            <br />
            <span className="text-blue-400 font-semibold">[VO] </span> "Available now."
            <br />
            <span className="text-yellow-400 font-semibold">[TEXT] </span> {formData.url || 'website.com'}
          </div>
        </div>
      </div>

    </div>
  );
}

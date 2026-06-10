import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Loader2, Sparkles, Activity, Tag, Zap } from 'lucide-react';

interface GeneratingScreenProps {
  onComplete: () => void;
}

const STREAMING_TEXT = "Launch script initialization complete. Fade in on a bold establishing shot. The world is moving fast. Voiceover: 'You don't need another tool. You need a revolution.' Quick cuts of frustrated users. Cut to the product interface gleaming in the dark. Deep synth bass drops. Voiceover: 'Enter LaunchY. The intelligence behind the launch.' 3D renders of the platform mapping out target audiences. Fast dynamic topography lines..."

export default function GeneratingScreen({ onComplete }: GeneratingScreenProps) {
  const [step1Status, setStep1Status] = useState<'loading' | 'done'>('loading');
  const [step2Status, setStep2Status] = useState<'waiting' | 'loading' | 'done'>('waiting');
  const [step3Status, setStep3Status] = useState<'waiting' | 'loading' | 'done'>('waiting');
  const [streamedText, setStreamedText] = useState('');
  
  // Fake progress simulation
  useEffect(() => {
    const t1 = setTimeout(() => {
      setStep1Status('done');
      setStep2Status('loading');
    }, 1500);
    
    const t2 = setTimeout(() => {
      setStep2Status('done');
      setStep3Status('loading');
    }, 3500);

    const t3 = setTimeout(() => {
      setStep3Status('done');
      setTimeout(onComplete, 1000);
    }, 7000);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  // Fake text streaming
  useEffect(() => {
    if (step2Status === 'loading' || step3Status === 'loading') {
      let i = 0;
      const interval = setInterval(() => {
        setStreamedText(STREAMING_TEXT.slice(0, i));
        i += 3; // speed of streaming
        if (i > STREAMING_TEXT.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step2Status, step3Status]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-3xl flex flex-col items-center">
        
        <motion.div 
          animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 rounded-2xl bg-violet-600/20 flex items-center justify-center mb-8 border border-violet-500/30"
        >
          <Sparkles className="w-8 h-8 text-violet-400" />
        </motion.div>
        
        <h2 className="text-2xl font-semibold tracking-tight mb-12">Crafting your launch...</h2>

        {/* Status Rows */}
        <div className="w-full max-w-md space-y-4 mb-12">
          <StatusRow label="Analyzing your brand..." status={step1Status} />
          <StatusRow label="Selecting reference videos..." status={step2Status} />
          <StatusRow label="Generating your launch concepts..." status={step3Status} />
        </div>

        {/* Streaming Text Area */}
        <div className="w-full bg-[#121212] border border-white/5 rounded-xl p-5 mb-8 h-40 overflow-hidden relative">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-3 font-semibold">Your Launch Script</div>
          <p className="font-mono text-sm text-white/70 leading-relaxed">
            {streamedText}
            {(step2Status === 'loading' || step3Status === 'loading') && (
              <span className="inline-block w-2 h-4 ml-1 bg-violet-500 animate-pulse" />
            )}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#121212] to-transparent" />
        </div>

        {/* Metrics Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md">
            <Activity className="w-3.5 h-3.5 text-violet-400" />
            <span>Akamai Foundation-V2</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span>Latency: 42ms</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md">
            <Tag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tokens: 1,842</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-md">
            <span className="text-white/60">Estimated Cost: $0.012</span>
          </div>
        </div>

      </div>
    </div>
  );
}

function StatusRow({ label, status }: { label: string, status: 'waiting' | 'loading' | 'done' }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg border ${status === 'waiting' ? 'border-transparent opacity-40' : status === 'loading' ? 'border-violet-500/20 bg-violet-500/5' : 'border-white/5 bg-white/5'}`}>
      <span className="font-medium text-sm">{label}</span>
      <div className="w-5 h-5 flex items-center justify-center">
        {status === 'waiting' && <span className="w-1.5 h-1.5 rounded-full bg-white/20" />}
        {status === 'loading' && <Loader2 className="w-4 h-4 text-violet-400 animate-spin" />}
        {status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
      </div>
    </div>
  );
}

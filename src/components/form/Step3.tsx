import { type FormData } from '../../types';
import type { Dispatch, SetStateAction } from 'react';
import { UploadCloud } from 'lucide-react';

interface Step3Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3({ formData, setFormData, onNext, onBack }: Step3Props) {
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium tracking-tight mb-1">Final Details</h2>
        <p className="text-white/50 text-sm mb-6">Let's refine the output.</p>
      </div>

      <div className="space-y-8">
        
        {/* Video Length Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-white/80">Video Length</label>
            <span className="text-sm font-bold text-violet-400">{formData.videoLength}s</span>
          </div>
          
          <input 
            type="range" 
            min="15" 
            max="60" 
            step="15"
            value={formData.videoLength}
            onChange={(e) => setFormData(f => ({ ...f, videoLength: parseInt(e.target.value) }))}
            className="w-full accent-violet-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/40 mt-2 font-medium">
            <span>15s (Shorts/Reels)</span>
            <span>30s (Standard)</span>
            <span>60s (Manifesto)</span>
          </div>
        </div>

        {/* Brand Kit Upload */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Brand Kit <span className="text-white/40 font-normal ml-1">(Optional)</span></label>
          <div className="border-2 border-dashed border-white/10 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-violet-500/20 transition-colors">
              <UploadCloud className="w-6 h-6 text-white/50 group-hover:text-violet-400 transition-colors" />
            </div>
            <p className="text-sm font-medium text-white/80 mb-1">Upload logos, fonts, or color palettes</p>
            <p className="text-xs text-white/40">Drag and drop or click to browse</p>
          </div>
        </div>

        {/* Custom Input */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Reference Video URL <span className="text-white/40 font-normal ml-1">(Optional)</span></label>
          <input 
            type="url" 
            value={formData.inspoUrl}
            onChange={(e) => setFormData(f => ({ ...f, inspoUrl: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-mono text-sm"
            placeholder="e.g. YouTube or Vimeo link"
          />
        </div>

      </div>

      <div className="pt-6 mt-8 border-t border-white/5 flex justify-between">
        <button 
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg font-medium text-white/70 hover:text-white transition-colors"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          className="px-6 py-2.5 rounded-lg font-bold bg-violet-600 text-white hover:bg-violet-500 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all flex items-center gap-2"
        >
          Generate Launch 
          <span className="text-lg leading-none">✨</span>
        </button>
      </div>
    </div>
  );
}

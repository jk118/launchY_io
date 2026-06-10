import { type FormData, type Tone, type Platform, type VideoSubject } from '../../types';
import type { Dispatch, SetStateAction } from 'react';

interface Step2Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  onNext: () => void;
  onBack: () => void;
}

const TONES: Tone[] = ['Bold', 'Minimal', 'Emotional', 'Technical', 'Playful'];
const PLATFORMS: Platform[] = ['Instagram', 'LinkedIn', 'Twitter/X', 'YouTube'];
const VIDEO_SUBJECTS: { value: VideoSubject; label: string; desc: string }[] = [
  { value: 'Product', label: 'Product', desc: 'Showcase what you built' },
  { value: 'Person', label: 'Person', desc: 'Feature the founder or team' },
  { value: 'Story', label: 'Story', desc: 'Lead with the problem & journey' },
];

export default function Step2({ formData, setFormData, onNext, onBack }: Step2Props) {
  const isComplete = formData.tone !== '' && formData.platforms.length > 0 && formData.videoSubject !== '';

  const togglePlatform = (p: Platform) => {
    setFormData(f => {
      if (f.platforms.includes(p)) {
        return { ...f, platforms: f.platforms.filter(x => x !== p) };
      } else {
        return { ...f, platforms: [...f.platforms, p] };
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium tracking-tight mb-1">Vibe & Audience</h2>
        <p className="text-white/50 text-sm mb-6">How should your launch feel?</p>
      </div>

      <div className="space-y-8">
        
        {/* Toggle Grid */}
        <div className="grid grid-cols-2 gap-6 p-4 rounded-xl bg-white/5 border border-white/5">
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Target</label>
            <div className="flex bg-[#1A1A1A] rounded-lg p-1 border border-white/5">
              {(['B2B', 'B2C'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(f => ({ ...f, businessModel: type }))}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    formData.businessModel === type 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Product</label>
            <div className="flex bg-[#1A1A1A] rounded-lg p-1 border border-white/5">
              {(['Software', 'Hardware'] as const).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(f => ({ ...f, productType: type }))}
                  className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    formData.productType === type 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Tone <span className="text-violet-500">*</span></label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {TONES.map(tone => (
              <button
                key={tone}
                type="button"
                onClick={() => setFormData(f => ({ ...f, tone }))}
                className={`p-4 rounded-xl text-left border transition-all ${
                  formData.tone === tone 
                    ? 'bg-violet-600/10 border-violet-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.15)]' 
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="font-medium text-sm mb-1">{tone}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Video Subject */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Video Focus <span className="text-violet-500">*</span></label>
          <div className="grid grid-cols-3 gap-3">
            {VIDEO_SUBJECTS.map(({ value, label, desc }) => (
              <button
                key={value}
                type="button"
                onClick={() => setFormData(f => ({ ...f, videoSubject: value }))}
                className={`p-4 rounded-xl text-left border transition-all ${
                  formData.videoSubject === value
                    ? 'bg-violet-600/10 border-violet-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.15)]'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div className="font-medium text-sm mb-1">{label}</div>
                <div className="text-xs text-white/40 leading-tight">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Where will this live? <span className="text-violet-500">*</span></label>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map(platform => (
              <button
                key={platform}
                type="button"
                onClick={() => togglePlatform(platform)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                  formData.platforms.includes(platform)
                    ? 'bg-white text-black border-white' 
                    : 'bg-transparent border-white/20 text-white/70 hover:border-white/40'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

      </div>

      <div className="pt-6 mt-6 border-t border-white/5 flex justify-between">
        <button 
          onClick={onBack}
          className="px-6 py-2.5 rounded-lg font-medium text-white/70 hover:text-white transition-colors"
        >
          Back
        </button>
        <button 
          onClick={onNext}
          disabled={!isComplete}
          className="px-6 py-2.5 rounded-lg font-medium bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Next Step
        </button>
      </div>
    </div>
  );
}

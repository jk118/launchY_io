import { type FormData, type Category } from '../../types';
import type { Dispatch, SetStateAction } from 'react';
import { ChevronDown } from 'lucide-react';

interface Step1Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  onNext: () => void;
}

const CATEGORIES: Category[] = ['SaaS', 'Consumer', 'Hardware', 'Marketplace', 'Dev Tools', 'Other'];

export default function Step1({ formData, setFormData, onNext }: Step1Props) {
  const isComplete = formData.name.trim() !== '' && formData.description.trim() !== '' && formData.category !== '';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium tracking-tight mb-1">The Basics</h2>
        <p className="text-white/50 text-sm mb-6">Let's start with what you're building.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Startup Name <span className="text-violet-500">*</span></label>
          <input 
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData(f => ({ ...f, name: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            placeholder="e.g. Acme Corp"
            autoFocus
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">One-line Description <span className="text-violet-500">*</span></label>
          <input 
            type="text" 
            value={formData.description}
            onChange={(e) => setFormData(f => ({ ...f, description: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            placeholder="What does it do? Keep it punchy."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-1.5">Website URL <span className="text-white/40 font-normal ml-1">(Optional)</span></label>
          <input 
            type="url" 
            value={formData.url}
            onChange={(e) => setFormData(f => ({ ...f, url: e.target.value }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            placeholder="https://"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Category <span className="text-violet-500">*</span></label>
          <div className="relative">
            <select
              value={formData.category}
              onChange={(e) => setFormData(f => ({ ...f, category: e.target.value as Category }))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all font-medium text-sm"
            >
              <option value="" disabled className="bg-[#1A1A1A] text-white/50">Select a category...</option>
              {CATEGORIES.map(category => (
                <option key={category} value={category} className="bg-[#1A1A1A] text-white">{category}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-white/50" />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-white/5 flex justify-end">
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

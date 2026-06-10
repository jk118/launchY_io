import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type FormData } from '../types';
import Step1 from './form/Step1';
import Step2 from './form/Step2';
import Step3 from './form/Step3';

interface FormScreenProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  onComplete: () => void;
}

export default function FormScreen({ formData, setFormData, onComplete }: FormScreenProps) {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-2xl">
        {/* Header / Step Indicator */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Create Your Launch Video</h1>
          <p className="text-white/50 text-sm mb-8">Step {step} of 3</p>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === step ? 'w-12 bg-violet-600' : 
                  i < step ? 'w-8 bg-violet-600/50' : 'w-8 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-[#121212] border border-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {step === 1 && (
                <Step1
                  formData={formData}
                  setFormData={setFormData}
                  onNext={nextStep}
                />
              )}
              {step === 2 && (
                <Step2
                  formData={formData}
                  setFormData={setFormData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
              {step === 3 && (
                <Step3
                  formData={formData}
                  setFormData={setFormData}
                  onNext={nextStep}
                  onBack={prevStep}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testing nav arrows */}
        <div className="flex items-center justify-between mt-4 px-1">
          <button
            onClick={prevStep}
            disabled={step === 1}
            className="flex items-center gap-1 text-xs text-white/25 hover:text-white/50 disabled:opacity-0 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            prev
          </button>
          <span className="text-xs text-white/20">skip</span>
          <button
            onClick={nextStep}
            className="flex items-center gap-1 text-xs text-white/25 hover:text-white/50 transition-colors"
          >
            next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

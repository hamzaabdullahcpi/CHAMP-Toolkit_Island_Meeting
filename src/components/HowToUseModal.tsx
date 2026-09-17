import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { HowToUseContent, defaultHowToUseContent } from '../services/airtableService';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
  content?: HowToUseContent;
}

export default function HowToUseModal({ isOpen, onClose, content }: HowToUseModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const title = content?.title || defaultHowToUseContent.title;
  const intro = content?.intro || defaultHowToUseContent.intro;
  const introParagraphs = intro
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  const items = content?.items && content.items.length > 0 ? content.items : defaultHowToUseContent.items;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink/70 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-surface border border-line shadow-2xl z-10 flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top subtle brand accent line */}
          <div className="w-full h-1 bg-[#3B877E] shrink-0" />

          {/* Modal Header */}
          <div className="px-6 py-5 md:px-8 md:py-6 bg-paper border-b border-line flex items-start justify-between gap-4 shrink-0">
            <div className="max-w-3xl">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-ink leading-tight">
                {title}
              </h3>
              
              <div className="body-text-sm mt-2.5 leading-relaxed space-y-2 text-ink-muted">
                {introParagraphs.map((paragraph, idx) => (
                  <p key={idx}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-ink-muted hover:text-ink hover:bg-surface border border-transparent hover:border-line transition-colors cursor-pointer shrink-0 mt-0.5"
              aria-label="Close dialog"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body: 2x2 Grid with Minimalist Clean Design */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 bg-surface">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {items.map((item, index) => (
                <div 
                  key={index}
                  className="p-5 sm:p-6 bg-paper border border-line flex flex-col justify-start transition-all hover:border-[#3B877E]/50 hover:shadow-xs group"
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <span className="text-[11px] font-bold text-[#3B877E] uppercase tracking-wider bg-[#3B877E]/10 px-2 py-0.5 border border-[#3B877E]/20 inline-block">
                      {item.name}
                    </span>
                    <span className="font-heading text-xl sm:text-2xl font-bold text-ink-muted/40 group-hover:text-[#3B877E] transition-colors leading-none select-none">
                      0{index + 1}
                    </span>
                  </div>

                  <h4 className="font-heading text-base sm:text-[17px] font-bold text-ink tracking-tight leading-snug mb-1.5">
                    {item.heading}
                  </h4>

                  <p className="body-text-sm text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 md:px-8 bg-paper border-t border-line flex items-center justify-end shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-ink text-surface text-xs font-semibold hover:bg-ink/90 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

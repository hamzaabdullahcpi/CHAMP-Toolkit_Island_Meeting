import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface HowToUseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ToolkitComponentItem {
  name: string;
  heading: string;
  description: string;
}

const NAVIGATE_COMPONENTS: ToolkitComponentItem[] = [
  {
    name: "Actions",
    heading: "Start with what needs to happen.",
    description: "Six interconnected areas of action supporting the CHAMP Implementation Roadmap across multilevel governance, finance and implementation.",
  },
  {
    name: "Implementation Pathways",
    heading: "Choose a way to put the Action into practice.",
    description: "Practical approaches that governments and their partners can adapt to their context.",
  },
  {
    name: "Implementation Guidance",
    heading: "Follow practical guidance for each pathway.",
    description: "Key steps and considerations to help governments and partners apply the approach.",
  },
];

const SUPPORTING_COMPONENTS: ToolkitComponentItem[] = [
  {
    name: "Tools",
    heading: "Use resources that can help.",
    description: "Practical frameworks, methodologies and resources that support specific parts of implementation.",
  },
  {
    name: "Illustrative Examples",
    heading: "See what the approach looks like in practice.",
    description: "Real-world examples showing how governments and partners have applied it in different contexts.",
  },
  {
    name: "Country Journeys",
    heading: "See how the pieces connect.",
    description: "Deeper country examples showing how multiple Actions and pathways work together as part of a wider governance, finance and implementation system.",
  },
];

export default function HowToUseModal({ isOpen, onClose }: HowToUseModalProps) {
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
                How to use this Toolkit
              </h3>
              
              <div className="body-text-sm mt-2.5 leading-relaxed space-y-2">
                <p>
                  The CHAMP Toolkit is designed for national governments, cities and subnational authorities, Friends of CHAMP, and development partners, to turn shared climate priorities into investment and implementation.
                </p>
                <p>
                  It is organised around six interconnected Actions that take you from alignment and enabling conditions through to investment, implementation and scale.
                </p>
                <p>
                  Explore the 6 Actions - each containing implementation pathways alongside implementation guidance, tools and practical examples.
                </p>
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

          {/* Modal Body: Two Clean Grouped Sections without distracting icons */}
          <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-1 bg-surface space-y-6">
            
            {/* GROUP 1: NAVIGATE THE TOOLKIT */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-line">
                <span className="text-xs font-bold uppercase tracking-wider text-ink font-heading">
                  NAVIGATE THE TOOLKIT
                </span>
                <span className="text-[11px] text-ink-muted hidden sm:inline-block">
                  Core Journey: Actions → Pathways → Guidance
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {NAVIGATE_COMPONENTS.map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-paper border border-line flex flex-col justify-between transition-colors hover:border-[#3B877E]/40 group"
                  >
                    <div>
                      {/* Component Label */}
                      <h4 className="font-heading text-sm font-bold text-[#3B877E] tracking-tight mb-2">
                        {item.name}
                      </h4>

                      {/* Lead-in heading */}
                      <p className="text-xs font-semibold text-ink leading-snug mb-1.5">
                        {item.heading}
                      </p>

                      {/* Description */}
                      <p className="text-[12.5px] text-ink/80 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GROUP 2: SUPPORTING YOUR JOURNEY */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1.5 border-b border-line">
                <span className="text-xs font-bold uppercase tracking-wider text-ink font-heading">
                  SUPPORTING YOUR JOURNEY
                </span>
                <span className="text-[11px] text-ink-muted hidden sm:inline-block">
                  Resources, Evidence & Practical Applications
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {SUPPORTING_COMPONENTS.map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-paper border border-line flex flex-col justify-between transition-colors hover:border-[#3B877E]/40 group"
                  >
                    <div>
                      {/* Component Label */}
                      <h4 className="font-heading text-sm font-bold text-[#3B877E] tracking-tight mb-2">
                        {item.name}
                      </h4>

                      {/* Lead-in heading */}
                      <p className="text-xs font-semibold text-ink leading-snug mb-1.5">
                        {item.heading}
                      </p>

                      {/* Description */}
                      <p className="text-[12.5px] text-ink/80 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 md:px-8 bg-paper border-t border-line flex items-center justify-between shrink-0">
            <span className="text-xs text-ink font-medium">
              Choose an Action to get started.
            </span>
            <button
              onClick={onClose}
              className="ml-auto px-5 py-2 bg-ink text-surface text-xs font-semibold hover:bg-ink/90 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

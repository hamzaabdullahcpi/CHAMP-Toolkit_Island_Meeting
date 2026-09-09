import re

new_landing = """import { motion } from "motion/react";
import MindMapGraphic from "./MindMapGraphic";
import { ExternalLink } from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
  onIntro: () => void;
  onNavigateToStep?: (stepId: number, pathwayIdx?: number, example?: any) => void;
}

export default function LandingPage({ onStart, onIntro, onNavigateToStep }: LandingPageProps) {
  return (
    <div className="max-w-[1400px] mx-auto pb-20 overflow-x-hidden">
      {/* Hero Banner Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full overflow-hidden mb-16 min-h-[45vh] lg:min-h-[50vh] flex flex-col justify-end group shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] rounded-sm md:mt-8 border border-line"
      >
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1920&q=80" 
            alt="Sustainable City Skyline" 
            className="w-full h-full object-cover transition-transform duration-[20s] ease-out group-hover:scale-105" 
            referrerPolicy="no-referrer"
          />
          {/* Gradient overlay for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent"></div>
        </div>
        <div className="relative z-10 p-8 md:p-14 lg:p-16 flex flex-col items-start text-left w-full h-full justify-end max-w-5xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/20 bg-black/40 backdrop-blur-md mb-6 rounded-sm">
            <div className="w-1.5 h-1.5 bg-surface"></div>
            <span className="text-[11px] font-bold text-surface uppercase tracking-[0.2em]">A toolkit for national governments, cities and friends of CHAMP</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-surface mb-6 leading-[1.05]">
            <span className="bg-[#3c4799] text-white px-3 py-0.5 rounded-sm inline-block mr-2">CHAMP</span>
            Toolkit
            <span className="block text-surface/80 mt-2 font-light text-4xl md:text-5xl lg:text-6xl">for Multilevel Climate Investment.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-surface/90 leading-relaxed font-light mb-8 max-w-4xl">
            Supporting the ‘CHAMP Investment Pledge’ delivery through guidance on policy reform, governance, investment pipelines, project aggregation and financial instruments.
          </p>
        </div>
      </motion.div>

      {/* Expandable Mind Map Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-24 flex flex-col items-center w-full"
      >
        <MindMapGraphic onNavigateToStep={onNavigateToStep || (() => {})} />
      </motion.div>

      {/* Partnership Section (Footer) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 max-w-5xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 bg-surface p-10 border border-line">
          <div className="md:w-5/12 space-y-6 flex flex-col justify-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-ink leading-tight tracking-tight">
              A Joint Contribution to CHAMP
            </h2>
            <p className="text-lg text-ink-muted font-light leading-relaxed">
              This toolkit is a strategic partnership between <strong className="text-ink font-semibold">CCFLA</strong> and <strong className="text-ink font-semibold">Viable Cities</strong>. A key goal of this toolkit is to showcase impactful multilevel governance initiatives championed in <strong className="text-ink font-semibold">Sweden</strong>.
            </p>
          </div>
          <div className="md:w-7/12 w-full flex flex-col items-center justify-between gap-6 py-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 w-full">
              <div className="flex-1 flex justify-end items-center">
                <img 
                  src="https://www.climatepolicyinitiative.org/wp-content/uploads/2020/09/CCFLA-hero.png" 
                  alt="CCFLA" 
                  className="h-32 md:h-40 object-contain mix-blend-multiply" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden sm:block w-px h-24 bg-line shrink-0"></div>
              <div className="flex-1 flex justify-start items-center">
                <img 
                  src="https://images.squarespace-cdn.com/content/v1/59e86b55aeb625e2140eec1a/1634044375194-3G0ZG1T5HGMGNB2QSEYU/1.+VC_Logotyp_PRIM%C3%84R_RGB.png" 
                  alt="Viable Cities" 
                  className="h-16 md:h-20 object-contain mix-blend-multiply opacity-90" 
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            <div className="flex flex-col items-center justify-center pt-6 border-t border-line w-4/5 md:w-3/4">
              <span className="text-ink-muted text-xs uppercase tracking-widest font-semibold mb-4">Supported by</span>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/3840px-Flag_of_Sweden.svg.png" 
                alt="Sweden" 
                className="w-24 object-contain shadow-sm rounded-sm" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
"""

with open("src/components/LandingPage.tsx", "w") as f:
    f.write(new_landing)

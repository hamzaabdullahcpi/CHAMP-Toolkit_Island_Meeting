import { useState } from "react";
import { motion } from "motion/react";
import MindMapGraphic from "./MindMapGraphic";
import CommitmentToImplementationSection from "./CommitmentToImplementationSection";
import HowToUseModal from "./HowToUseModal";
import { ExternalLink, HelpCircle } from "lucide-react";
import { HomePageContent, defaultHomePageContent } from "../services/airtableService";
import { RoadmapPillar } from "../data/champRoadmapData";
import { ChampPledge } from "../data/champPledgesData";

interface LandingPageProps {
  onStart: () => void;
  onIntro: () => void;
  onNavigateToStep?: (stepId: number, pathwayIdx?: number, example?: any) => void;
  actionsData?: any[];
  homePageData?: HomePageContent;
  onOpenRoadmap?: (componentId?: string) => void;
  roadmapPillars?: RoadmapPillar[];
  champPledges?: ChampPledge[];
}

function renderFormattedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="text-ink font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function LandingPage({ 
  onStart, 
  onIntro, 
  onNavigateToStep, 
  actionsData,
  homePageData = defaultHomePageContent,
  onOpenRoadmap,
  roadmapPillars,
  champPledges
}: LandingPageProps) {
  const [isHowToUseOpen, setIsHowToUseOpen] = useState(false);
  const hero = homePageData?.hero || defaultHomePageContent.hero;
  const partnership = homePageData?.partnership || defaultHomePageContent.partnership;
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full pb-16 overflow-x-hidden">
      {/* How to Use This Toolkit Modal */}
      <HowToUseModal 
        isOpen={isHowToUseOpen}
        onClose={() => setIsHowToUseOpen(false)}
      />

      {/* Full-bleed Hero Banner Section */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full overflow-hidden min-h-[50vh] lg:min-h-[55vh] flex flex-col justify-end group shadow-[0_20px_40px_-20px_rgba(0,0,0,0.15)] border-b border-line"
      >
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={hero.imageUrl || "https://plus.unsplash.com/premium_photo-1697729968500-d0c63fd49bfa?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
            alt="Sustainable City Skyline" 
            className="w-full h-full object-cover transition-transform duration-[20s] ease-out group-hover:scale-105" 
            referrerPolicy="no-referrer"
          />
          {/* Gradient overlay for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/65 to-ink/20"></div>
        </div>

        {/* Inner Content with responsive max-width and padding */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-12 md:pb-16 flex flex-col items-start text-left justify-end">
          {hero.eyebrow && (
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/20 bg-black/40 backdrop-blur-md mb-6 rounded-sm">
              <div className="w-1.5 h-1.5 bg-surface"></div>
              <span className="text-[11px] font-bold text-surface uppercase tracking-[0.2em]">{hero.eyebrow}</span>
            </div>
          )}
          
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-surface mb-6 leading-[1.05]">
            {hero.titleBadge && (
              <span className="bg-[#3c4799] text-white px-3 py-0.5 rounded-sm inline-block mr-2">
                {hero.titleBadge}
              </span>
            )}
            {hero.titleMain || "Toolkit"}
            {hero.titleSub && (
              <span className="block text-surface/80 mt-2 font-light text-4xl md:text-5xl lg:text-6xl">
                {hero.titleSub}
              </span>
            )}
          </h1>
          
          {hero.description && (
            <p className="text-xl md:text-2xl text-surface/90 leading-relaxed font-light max-w-4xl mb-4">
              {hero.description}
            </p>
          )}

          {/* Primary "How to use this Toolkit" button in Hero - filled with #3c4799 */}
          <button
            type="button"
            onClick={() => setIsHowToUseOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#3c4799] hover:bg-[#4856b8] text-white border border-[#3c4799] text-xs md:text-sm font-semibold shadow-lg hover:shadow-xl transition-all cursor-pointer rounded-none group"
            aria-label="Open guide: How to use this Toolkit"
          >
            <HelpCircle size={16} className="text-white shrink-0 group-hover:scale-105 transition-transform" />
            <span>How to use this Toolkit</span>
          </button>
        </div>
      </motion.div>

      {/* Main interactive and partnership content */}
      <div className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto mt-8 md:mt-10 space-y-10">
        {/* From Commitment to Implementation Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="w-full"
        >
          <CommitmentToImplementationSection 
            onNavigateToStep={onNavigateToStep}
            onOpenRoadmap={onOpenRoadmap || (() => {})}
            roadmapPillars={roadmapPillars}
            champPledges={champPledges}
          />
        </motion.div>

        {/* Expandable Mind Map Section */}
        <motion.div 
          id="six-actions-section"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center w-full scroll-mt-6"
        >
          <MindMapGraphic onNavigateToStep={onNavigateToStep || (() => {})} actionsData={actionsData} />
        </motion.div>

        {/* Partnership Section - Original Prominent Composition & Large Logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 bg-surface p-10 md:p-12 border border-line">
            <div className="md:w-5/12 space-y-6 flex flex-col justify-center">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-ink leading-tight tracking-tight">
                {partnership.title || "A Joint Contribution to CHAMP"}
              </h2>
              <p className="text-lg text-ink-muted font-light leading-relaxed">
                {renderFormattedText(partnership.description || "This toolkit is a strategic partnership between CCFLA and Viable Cities. A key goal of this toolkit is to showcase impactful multilevel governance initiatives championed in Sweden.")}
              </p>

              {/* Links to CPI, CCFLA, and Viable Cities */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                <span className="font-medium text-ink">Learn more:</span>
                <a 
                  href="https://citiesclimatefinance.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:underline hover:opacity-80 transition-opacity"
                >
                  CCFLA
                  <ExternalLink size={11} />
                </a>
                <span className="text-line">•</span>
                <a 
                  href="https://viablecities.se" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:underline hover:opacity-80 transition-opacity"
                >
                  Viable Cities
                  <ExternalLink size={11} />
                </a>
                <span className="text-line">•</span>
                <a 
                  href="https://www.climatepolicyinitiative.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-ink-muted hover:text-ink hover:underline transition-colors"
                >
                  CPI
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            <div className="md:w-7/12 w-full flex flex-col items-center justify-between gap-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 w-full">
                {partnership.partner1LogoUrl && (
                  <a 
                    href="https://citiesclimatefinance.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-end items-center hover:opacity-85 transition-opacity"
                    title="Cities Climate Finance Leadership Alliance / Climate Policy Initiative"
                  >
                    <img 
                      src={partnership.partner1LogoUrl} 
                      alt={partnership.partner1Name || "CCFLA"} 
                      className="h-32 md:h-40 object-contain mix-blend-multiply" 
                      referrerPolicy="no-referrer"
                    />
                  </a>
                )}
                {partnership.partner1LogoUrl && partnership.partner2LogoUrl && (
                  <div className="hidden sm:block w-px h-24 bg-line shrink-0"></div>
                )}
                {partnership.partner2LogoUrl && (
                  <a 
                    href="https://viablecities.se" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-start items-center hover:opacity-85 transition-opacity"
                    title="Viable Cities"
                  >
                    <img 
                      src={partnership.partner2LogoUrl} 
                      alt={partnership.partner2Name || "Viable Cities"} 
                      className="h-16 md:h-20 object-contain mix-blend-multiply opacity-90" 
                      referrerPolicy="no-referrer"
                    />
                  </a>
                )}
              </div>
              
              {(partnership.supportedByLogoUrl || partnership.supportedByName) && (
                <div className="flex flex-col items-center justify-center pt-6 border-t border-line w-4/5 md:w-3/4">
                  <span className="text-ink-muted text-xs uppercase tracking-widest font-semibold mb-4">
                    {partnership.supportedByLabel || "Supported by"}
                  </span>
                  {partnership.supportedByLogoUrl && (
                    <img 
                      src={partnership.supportedByLogoUrl} 
                      alt={partnership.supportedByName || "Sponsor"} 
                      className="w-24 object-contain shadow-sm rounded-sm" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Copyright line */}
          <div className="mt-8 text-center text-xs text-ink-muted">
            © {currentYear} <strong>Climate Policy Initiative</strong> and <strong>Viable Cities</strong>. All rights reserved.
          </div>
        </motion.div>
      </div>
    </div>
  );
}


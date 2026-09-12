import { useState } from "react";
import { motion } from "motion/react";
import MindMapGraphic from "./MindMapGraphic";
import CommitmentToImplementationSection from "./CommitmentToImplementationSection";
import HowToUseModal from "./HowToUseModal";
import { ExternalLink, HelpCircle } from "lucide-react";
import { HomePageContent, defaultHomePageContent } from "../services/airtableService";
import { RoadmapPillar } from "../data/champRoadmapData";
import { ChampPledge } from "../data/champPledgesData";
import { resolveAssetUrl, defaultHeroImage } from "../utils/assetUtils";

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
        content={homePageData?.howToUse}
      />

      {/* Hero: full-bleed photo with a content panel contained inside it, flush to the right */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full h-[560px] sm:h-[620px] lg:h-[700px] overflow-hidden group"
      >
        <img
          src={resolveAssetUrl(hero.imageUrl, defaultHeroImage)}
          alt="Aerial view of Stockholm's Södra Länken highway and Slussen transit interchange"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[20s] ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== defaultHeroImage) {
              target.src = defaultHeroImage;
            }
          }}
        />

        {/* Content panel: contained within the photo, flush to the right edge. Shorter than the
            photo so it stays visible above (mostly) and below the panel. */}
        <div className="absolute right-0 bottom-8 md:bottom-10 w-full sm:w-[92%] md:w-[84%] lg:w-[78%] xl:w-[72%] bg-surface flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-10">
          {hero.eyebrow && (
            <span className="text-[11px] text-[#ED8439] uppercase tracking-[0.15em] mb-2">
              {hero.eyebrow}
            </span>
          )}

          <h1 className="font-display font-bold text-[44px] sm:text-[52px] lg:text-[60px] leading-[1.1] text-[#163331] mb-4">
            {hero.titleBadge}{hero.titleBadge && hero.titleMain ? " " : ""}{hero.titleMain || "Toolkit"}
            {hero.titleSub && (
              <span className="block mt-1 font-light text-2xl sm:text-3xl lg:text-4xl">
                {hero.titleSub}
              </span>
            )}
          </h1>

          {hero.description && (
            <p className="body-text leading-relaxed mb-6">
              {hero.description}
            </p>
          )}

          {/* "How to use this Toolkit" link - plain text, same ink color as the rest of the site */}
          <button
            type="button"
            onClick={() => setIsHowToUseOpen(true)}
            className="inline-flex items-center gap-2 self-start text-ink text-xs md:text-sm font-semibold cursor-pointer group/btn hover:opacity-70 transition-opacity"
            aria-label="Open guide: How to use this Toolkit"
          >
            <HelpCircle size={16} className="text-ink shrink-0 group-hover/btn:scale-105 transition-transform" />
            <span className="underline underline-offset-4 decoration-ink/30">How to use this Toolkit</span>
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
              <h2 className="title-h2">
                {partnership.title || "A Joint Contribution to CHAMP"}
              </h2>
              <p className="body-text leading-relaxed">
                {renderFormattedText(partnership.description || "This toolkit is a strategic partnership between CCFLA and Viable Cities. A key goal of this toolkit is to showcase impactful multilevel governance initiatives championed in Sweden.")}
              </p>

              {/* Links to CCFLA and Viable Cities */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                <span className="font-medium text-ink">{partnership.learnMoreLabel || "Learn more:"}</span>
                <a 
                  href={partnership.partner1Url || "https://citiesclimatefinance.org"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:underline hover:opacity-80 transition-opacity"
                >
                  {partnership.partner1Name || "CCFLA"}
                  <ExternalLink size={11} />
                </a>
                <span className="text-line">•</span>
                <a 
                  href={partnership.partner2Url || "https://viablecities.se"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-accent hover:underline hover:opacity-80 transition-opacity"
                >
                  {partnership.partner2Name || "Viable Cities"}
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            <div className="md:w-7/12 w-full flex flex-col items-center justify-between gap-6 py-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 w-full">
                {partnership.partner1LogoUrl && (
                  <a 
                    href={partnership.partner1Url || "https://citiesclimatefinance.org"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-end items-center hover:opacity-85 transition-opacity"
                    title={partnership.partner1Name || "Cities Climate Finance Leadership Alliance"}
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
                    href={partnership.partner2Url || "https://viablecities.se"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex justify-start items-center hover:opacity-85 transition-opacity"
                    title={partnership.partner2Name || "Viable Cities"}
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


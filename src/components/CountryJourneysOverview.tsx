import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { CountryJourneyData } from '../types/countryJourney';
import { defaultCountryJourneys } from '../data/countryJourneysData';

interface CountryJourneysOverviewProps {
  countryJourneys?: CountryJourneyData[];
  onSelectCountry: (countryId: string) => void;
  onNavigateToCoreAction?: (actionId: number) => void;
}

export default function CountryJourneysOverview({ 
  countryJourneys = defaultCountryJourneys, 
  onSelectCountry, 
  onNavigateToCoreAction 
}: CountryJourneysOverviewProps) {
  // Sort country journeys by order ascending (Sweden first, then Brazil, Morocco, etc.)
  const sortedJourneys = [...countryJourneys].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');

  const checkScrollability = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

      // Estimate active index based on scroll position
      const cardWidth = 360; // approximate card + gap
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(0, newIndex), sortedJourneys.length - 1));
    }
  };

  useEffect(() => {
    checkScrollability();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        el.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [sortedJourneys.length, viewMode]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 380;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 380;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {/* Header Section */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-none text-accent font-mono text-xs font-semibold uppercase tracking-widest mb-4">
          <Globe size={13} />
          Country Journeys
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight leading-[1.1] mb-6">
          Country Multilevel Governance Journeys
        </h1>
        
        <div className="space-y-4 text-lg text-ink-muted leading-relaxed font-light font-sans max-w-4xl">
          <p>
            The Country Journeys contain deep dive analysis grounded in real-world contexts, showcasing institutional relationships, learning loops, implementation cycles, accountability mechanisms, and enabling conditions required to implement and scale Implementation Pathways across different countries.
          </p>
          <p>
            Country Journeys are intended not only to document implementation approaches, but also to showcase how cities, regions and national governments have co-developed practical solutions that can inform other CHAMP countries.
          </p>
          <p className="text-ink font-normal pt-2 border-l-2 border-accent pl-4 text-base italic bg-surface/50 py-2 rounded-none">
            Special focus on the interactions between institutions and programs, governance capabilities, intermediary functions, financing and implementation platforms, and feedback loops required to sustain long-term climate investment.
          </p>
        </div>
      </div>

      {/* Featured Country Case Studies Header & Controls */}
      <div className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-line">
          <div>
            <h2 className="font-heading text-2xl font-medium text-ink">
              Featured Country Case Studies
            </h2>
          </div>

          {/* Controls: View Mode & Slider Navigation */}
          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="inline-flex p-1 bg-surface border border-line rounded-none text-ink-muted">
              <button
                type="button"
                onClick={() => setViewMode('slider')}
                className={`p-1.5 rounded-none transition-all flex items-center gap-1.5 text-xs font-medium ${
                  viewMode === 'slider' 
                    ? 'bg-paper text-accent shadow-xs' 
                    : 'text-ink-muted hover:text-ink'
                }`}
                title="Slider View"
              >
                <SlidersHorizontal size={15} />
                <span className="hidden md:inline">Slider</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-none transition-all flex items-center gap-1.5 text-xs font-medium ${
                  viewMode === 'grid' 
                    ? 'bg-paper text-accent shadow-xs' 
                    : 'text-ink-muted hover:text-ink'
                }`}
                title="Grid View"
              >
                <LayoutGrid size={15} />
                <span className="hidden md:inline">Grid</span>
              </button>
            </div>

            {/* Slider Next / Prev Buttons */}
            {viewMode === 'slider' && sortedJourneys.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleScroll('left')}
                  disabled={!canScrollLeft}
                  className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all ${
                    canScrollLeft 
                      ? 'bg-surface border-line text-ink hover:border-accent hover:text-accent shadow-xs' 
                      : 'border-line/40 text-ink-muted/30 cursor-not-allowed'
                  }`}
                  aria-label="Previous Country"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll('right')}
                  disabled={!canScrollRight}
                  className={`w-8 h-8 rounded-none border flex items-center justify-center transition-all ${
                    canScrollRight 
                      ? 'bg-surface border-line text-ink hover:border-accent hover:text-accent shadow-xs' 
                      : 'border-line/40 text-ink-muted/30 cursor-not-allowed'
                  }`}
                  aria-label="Next Country"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Empty State if all unpublished */}
        {sortedJourneys.length === 0 ? (
          <div className="p-12 text-center bg-surface border border-line rounded-none">
            <Info size={32} className="mx-auto text-ink-muted mb-3" />
            <h3 className="font-heading text-lg text-ink font-medium mb-1">
              No Country Journeys Published
            </h3>
            <p className="text-xs text-ink-muted max-w-md mx-auto">
              Make sure to check the <code>Published</code> box on your country records in Airtable to display them here.
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedJourneys.map((j) => (
              <CountryCard
                key={j.countryId}
                journey={j}
                onSelectCountry={onSelectCountry}
              />
            ))}
          </div>
        ) : (
          /* SLIDER / CAROUSEL VIEW */
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar scrollbar-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {sortedJourneys.map((j) => (
                <div 
                  key={j.countryId} 
                  className="w-[85vw] sm:w-[360px] md:w-[370px] flex-shrink-0 snap-start"
                >
                  <CountryCard
                    journey={j}
                    onSelectCountry={onSelectCountry}
                  />
                </div>
              ))}
            </div>

            {/* Slider Indicator Dots */}
            {sortedJourneys.length > 1 && (
              <div className="flex justify-center items-center gap-1.5 mt-4">
                {sortedJourneys.map((j, idx) => (
                  <button
                    key={j.countryId}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    className={`h-1.5 rounded-none transition-all duration-300 ${
                      activeIndex === idx 
                        ? 'w-6 bg-accent' 
                        : 'w-1.5 bg-line hover:bg-ink-muted/50'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* Extracted Card Component for Crisp Consistency in Grid & Slider */
interface CountryCardProps {
  journey: CountryJourneyData;
  onSelectCountry: (countryId: string) => void;
}

function CountryCard({ journey: j, onSelectCountry }: CountryCardProps) {
  const isReady = j.isReady || j.status === 'Available';
  const isComingSoon = !isReady || j.status === 'Coming Soon';

  // Crisp text fallbacks
  const displayTagline = j.tagline || `${j.countryName} Multilevel Governance Model`;
  const displaySummary = j.summary || j.headerDescription || (
    isReady
      ? `Subnational climate governance frameworks, institutional platforms, and finance pathways in ${j.countryName}.`
      : `Country journey and multilevel governance analysis in preparation.`
  );

  return (
    <div
      className={`h-full rounded-none overflow-hidden flex flex-col transition-all duration-300 ${
        isReady 
          ? 'bg-surface border border-line hover:border-accent hover:shadow-md cursor-pointer group' 
          : 'bg-[#f4f5f6] dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/70 opacity-75 cursor-default select-none'
      }`}
      onClick={() => {
        if (isReady) {
          onSelectCountry(j.countryId);
        }
      }}
    >
      {/* Image Header */}
      <div className={`relative h-36 w-full overflow-hidden ${isReady ? 'bg-slate-900' : 'bg-slate-300 dark:bg-slate-800'}`}>
        {j.cardImage && (
          <img 
            src={j.cardImage} 
            alt={j.countryName} 
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isReady 
                ? 'group-hover:scale-105' 
                : 'grayscale contrast-75 brightness-95 opacity-70'
            }`} 
          />
        )}
        <div className={`absolute inset-0 ${isReady ? 'bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent' : 'bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent'}`} />
        
        <div className="absolute top-3 left-3.5 flex items-center gap-1.5">
          <span className="text-white font-heading font-semibold text-base sm:text-lg drop-shadow-md tracking-tight">
            {j.countryName}
          </span>
        </div>

        {isComingSoon && (
          <div className="absolute top-3 right-3">
            <span className="text-[9.5px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none bg-slate-800/90 text-slate-200 border border-slate-600/50 backdrop-blur-xs">
              Coming Soon
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className={`font-heading text-base font-semibold leading-snug mb-1.5 transition-colors ${
            isReady ? 'text-ink group-hover:text-accent' : 'text-ink/80'
          }`}>
            {displayTagline}
          </h3>
          
          <p className={`text-xs leading-relaxed font-light line-clamp-3 ${
            isReady ? 'text-ink-muted' : 'text-ink-muted/80 italic'
          }`}>
            {displaySummary}
          </p>
        </div>

        {/* Key Mechanisms / Highlights Pills if present */}
        {j.keyMechanisms && j.keyMechanisms.length > 0 && (
          <div className="pt-1">
            <div className="flex flex-wrap gap-1">
              {j.keyMechanisms.slice(0, 3).map((mech, idx) => (
                <span 
                  key={idx} 
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-none transition-colors ${
                    isReady 
                      ? 'bg-paper border border-line text-ink-muted group-hover:border-accent/40' 
                      : 'bg-paper/70 border border-line/60 text-ink-muted/70'
                  }`}
                >
                  {mech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Link */}
        <div className="pt-2.5 border-t border-line/60 flex items-center justify-between mt-auto">
          <span className={`text-[11.5px] font-semibold flex items-center gap-1.5 transition-colors ${
            isReady ? 'text-accent group-hover:text-accent-dark' : 'text-ink-muted/70'
          }`}>
            {isReady ? (
              <>
                Explore Country Journey
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </>
            ) : (
              <>
                In Development
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}


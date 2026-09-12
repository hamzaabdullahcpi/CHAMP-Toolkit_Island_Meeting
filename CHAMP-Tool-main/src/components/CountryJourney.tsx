import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getActionTheme } from '../utils/actionThemes';
import SwedenArchitectureDiagram from './SwedenArchitectureDiagram';
import { CountryJourneyData } from '../types/countryJourney';
import { swedenJourneyDefaultData } from '../data/countryJourneysData';

interface CountryJourneyProps {
  countryData?: CountryJourneyData;
  targetActionId?: number;
  onBackToJourneys?: () => void;
  onNavigateToCoreAction?: (actionId: number) => void;
}

export default function CountryJourney({ 
  countryData = swedenJourneyDefaultData, 
  targetActionId,
  onBackToJourneys, 
  onNavigateToCoreAction 
}: CountryJourneyProps) {
  const [activeTab, setActiveTab] = useState<'context' | 'model'>(() => targetActionId ? 'model' : 'context');
  const [highlightedActionId, setHighlightedActionId] = useState<number | null>(targetActionId || null);

  // Collapsible states for Action 1 to 6
  const [openActions, setOpenActions] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });

  // Handle targetActionId deep link from core action page
  useEffect(() => {
    if (targetActionId) {
      setActiveTab('model');
      setHighlightedActionId(targetActionId);
      setOpenActions(prev => ({
        ...prev,
        [targetActionId]: true
      }));

      // Scroll after DOM elements are mounted and laid out
      const attemptScroll = (attemptsLeft = 8) => {
        const el = document.getElementById(`country-action-${targetActionId}`);
        if (el) {
          // Native scroll into view
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          
          // Container-aware scroll adjustment for <main> wrapper
          const mainEl = document.querySelector('main');
          if (mainEl) {
            const elRect = el.getBoundingClientRect();
            const mainRect = mainEl.getBoundingClientRect();
            const targetScrollTop = mainEl.scrollTop + (elRect.top - mainRect.top) - 40;
            if (Math.abs(elRect.top - mainRect.top - 40) > 15) {
              mainEl.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
            }
          }
        } else if (attemptsLeft > 0) {
          setTimeout(() => attemptScroll(attemptsLeft - 1), 80);
        }
      };

      const timer1 = setTimeout(() => attemptScroll(8), 60);
      const timer2 = setTimeout(() => attemptScroll(4), 250);
      const timer3 = setTimeout(() => attemptScroll(2), 550);
      const clearHighlightTimer = setTimeout(() => setHighlightedActionId(null), 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(clearHighlightTimer);
      };
    }
  }, [targetActionId]);

  const toggleAction = (id: number) => {
    setOpenActions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAllActions = () => {
    setOpenActions({ 1: true, 2: true, 3: true, 4: true, 5: true, 6: true });
  };

  const collapseAllActions = () => {
    setOpenActions({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false });
  };

  // If the country is not ready or has no content
  if (!countryData.isReady && (!countryData.contextSections || countryData.contextSections.length === 0)) {
    return (
      <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-36">
        {onBackToJourneys && (
          <div className="mb-6">
            <button
              onClick={onBackToJourneys}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted hover:text-accent transition-colors cursor-pointer group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Country Journeys Overview
            </button>
          </div>
        )}

        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded-md">
              Country Journey
            </span>
          </div>
          
          <h1 className="title-h1 mb-6">
            {countryData.headerTitle || `${countryData.countryName}'s Journey to Multilevel Climate Implementation`}
          </h1>

          <p className="body-text leading-relaxed max-w-4xl">
            {countryData.headerDescription || countryData.summary}
          </p>
        </div>

        <div className="p-12 bg-surface border border-line rounded-lg text-center py-24 space-y-3">
          <h3 className="font-heading text-2xl font-medium text-ink">
            {countryData.countryName} Country Journey Coming Soon
          </h3>
          <p className="body-text-sm max-w-md mx-auto leading-relaxed">
            We are structuring multilevel climate governance datasets, case studies, and architecture diagrams for {countryData.countryName}. Updates will synchronize automatically from Airtable.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-36">
      {/* Back to Journeys Breadcrumb */}
      {onBackToJourneys && (
        <div className="mb-6">
          <button
            onClick={onBackToJourneys}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-muted hover:text-accent transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Country Journeys Overview
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="mb-10">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded-md">
            Country Journey
          </span>
        </div>
        
        <h1 className="title-h1 mb-6">
          {countryData.headerTitle || `${countryData.countryName}’s Multilevel Governance and Implementation Journey`}
        </h1>

        <p className="body-text leading-relaxed max-w-4xl">
          {countryData.headerDescription || countryData.summary}
        </p>
      </div>

      {/* Main Tabs Navigation (A & B) */}
      <div className="flex border-b border-line bg-paper rounded-t-xl overflow-x-auto hide-scrollbar mb-8 shadow-2xs">
        <button
          onClick={() => setActiveTab('context')}
          className={`flex-1 min-w-[280px] py-4 px-6 text-left transition-all duration-200 focus:outline-none cursor-pointer border-b-2 ${
            activeTab === 'context'
              ? 'border-accent bg-surface text-ink font-semibold shadow-xs'
              : 'border-transparent text-ink-muted hover:text-ink hover:bg-surface/50 font-medium'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              activeTab === 'context' ? 'bg-accent text-white' : 'bg-line text-ink-muted'
            }`}>
              A
            </span>
            <span className="text-xs uppercase tracking-wider font-bold">{countryData.tabATitle || 'The Context'}</span>
          </div>
          <p className="text-xs font-light text-ink-muted mt-1 truncate">
            {countryData.tabASubtitle || 'An Evolving Mission-Oriented Approach to Urban Climate Transition'}
          </p>
        </button>

        <button
          onClick={() => setActiveTab('model')}
          className={`flex-1 min-w-[280px] py-4 px-6 text-left transition-all duration-200 focus:outline-none cursor-pointer border-b-2 ${
            activeTab === 'model'
              ? 'border-accent bg-surface text-ink font-semibold shadow-xs'
              : 'border-transparent text-ink-muted hover:text-ink hover:bg-surface/50 font-medium'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              activeTab === 'model' ? 'bg-accent text-white' : 'bg-line text-ink-muted'
            }`}>
              B
            </span>
            <span className="text-xs uppercase tracking-wider font-bold">{countryData.tabBTitle || 'The Multilevel Model'}</span>
          </div>
          <p className="text-xs font-light text-ink-muted mt-1 truncate">
            {countryData.tabBSubtitle || 'Architecture Diagram & 6 Multilevel Governance Actions'}
          </p>
        </button>
      </div>

      {/* Tab Contents */}
      <AnimatePresence mode="wait">
        {activeTab === 'context' ? (
          /* =========================================================================
             TAB A: THE COUNTRY CONTEXT (CLEAN EDITORIAL TEXT, NO BOXES, CLEAN LISTS)
             ========================================================================= */
          <motion.div
            key="tab-a"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-12"
          >
            {/* Section 1: Central Premises if available */}
            {countryData.premises && countryData.premises.length > 0 && (
              <div className="space-y-4">
                <h2 className="title-h2">
                  {countryData.premisesHeading || `Central Premises of ${countryData.countryName}’s Multilevel Journey`}
                </h2>
                {countryData.premisesIntro && (
                  <p className="body-text leading-relaxed">
                    {countryData.premisesIntro}
                  </p>
                )}

                <div className="space-y-4 pt-2">
                  {countryData.premises.map((premise, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent/10 text-accent font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {premise.number || idx + 1}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-ink mb-1">
                          {premise.title}
                        </h3>
                        <p className="body-text leading-relaxed">
                          {premise.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr className="border-line" />
              </div>
            )}

            {/* Context Sections */}
            {countryData.contextSections && countryData.contextSections.map((section, secIdx) => (
              <div key={secIdx} className="space-y-4">
                <h2 className="title-h2">
                  {section.title}
                </h2>

                {section.paragraphs && section.paragraphs.map((p, pIdx) => (
                  <div key={pIdx} className="body-text leading-relaxed space-y-2">
                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => <strong className="text-ink font-medium">{children}</strong>,
                        p: ({ children }) => <span>{children}</span>
                      }}
                    >
                      {p}
                    </ReactMarkdown>
                  </div>
                ))}

                {section.bulletPoints && section.bulletPoints.length > 0 && (
                  <ul className="space-y-2.5 pl-2 pt-1">
                    {section.bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="body-text flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        <span>
                          {bp.label && <strong className="text-ink font-medium">{bp.label} </strong>}
                          {bp.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* Transition to Model Link */}
            <div className="pt-4 border-t border-line flex items-center justify-between">
              <span className="text-sm text-ink-muted font-light">
                Proceed to explore the architecture diagram and implementation pathways.
              </span>
              <button
                onClick={() => setActiveTab('model')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors cursor-pointer group"
              >
                <span>View The Multilevel Model</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* =========================================================================
             TAB B: MULTILEVEL CLIMATE GOVERNANCE AND IMPLEMENTATION MODEL
             ========================================================================= */
          <motion.div
            key="tab-b"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-12"
          >
            {/* Overview & Architecture Diagram */}
            <div className="space-y-4">
              <div>
                <h3 className="font-heading text-2xl font-medium text-ink mb-2">
                  {countryData.modelHeading || `${countryData.countryName}’s Multilevel Climate Governance and Implementation Model`}
                </h3>
                <div className="body-text leading-relaxed">
                  <ReactMarkdown
                    components={{
                      strong: ({ children }) => <strong className="text-ink font-medium">{children}</strong>,
                      p: ({ children }) => <p className="mb-2">{children}</p>
                    }}
                  >
                    {countryData.modelOverview}
                  </ReactMarkdown>
                </div>
                {countryData.modelDiagramNote && (
                  <p className="body-text-sm leading-relaxed mt-1">
                    {countryData.modelDiagramNote}
                  </p>
                )}
              </div>

              {/* Minimal Clean Image Diagram Container with Fullscreen & Zoom */}
              {/* If countryData provides custom diagram image url, it passes down, else defaults to local sweden blueprint */}
              <SwedenArchitectureDiagram 
                customImageUrl={countryData.diagramImageUrl}
                customTitle={`${countryData.countryName}’s Multilevel Climate Governance Architecture`}
              />
            </div>

            {/* The Actions Header & Expand Controls */}
            {countryData.actions && countryData.actions.length > 0 && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-line">
                  <div>
                    <h3 className="font-heading text-2xl font-medium text-ink">
                      {countryData.actionsHeading || `${countryData.countryName}'s Journey Across the 6 Implementation Pathways`}
                    </h3>
                    <p className="body-text-sm mt-0.5">
                      {countryData.actionsSubtitle || `How the ${countryData.countryName} mission model maps into the Toolkit's 6 core multilevel climate governance actions.`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={expandAllActions}
                      className="px-3 py-1.5 bg-surface border border-line rounded-none text-xs font-semibold text-ink hover:bg-paper transition-colors cursor-pointer"
                    >
                      Expand All
                    </button>
                    <button
                      onClick={collapseAllActions}
                      className="px-3 py-1.5 bg-surface border border-line rounded-none text-xs font-semibold text-ink-muted hover:text-ink hover:bg-paper transition-colors cursor-pointer"
                    >
                      Collapse All
                    </button>
                  </div>
                </div>

                {/* Render Actions */}
                {countryData.actions.map((act) => {
                  const actionNum = act.actionNumber;
                  const theme = getActionTheme(actionNum);
                  const isOpen = openActions[actionNum];

                  const isHighlighted = highlightedActionId === actionNum;

                  return (
                    <div 
                      key={actionNum}
                      id={`country-action-${actionNum}`}
                      className={`bg-surface border rounded-none overflow-hidden shadow-xs transition-all scroll-mt-20 sm:scroll-mt-24 ${
                        isHighlighted ? 'ring-2' : ''
                      }`}
                      style={{
                        borderColor: isHighlighted ? theme.hex : isOpen ? theme.borderSubtle : 'var(--line)',
                        boxShadow: isHighlighted ? `0 0 0 2px ${theme.borderMedium}, 0 4px 20px -2px rgba(0, 0, 0, 0.08)` : undefined
                      }}
                    >
                      <div className="h-1.5 w-full" style={{ backgroundColor: theme.hex }} />

                      <button
                        onClick={() => toggleAction(actionNum)}
                        className="w-full p-6 sm:p-8 flex items-start justify-between gap-4 text-left hover:bg-paper/50 transition-colors focus:outline-none cursor-pointer rounded-none"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span 
                              className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-none"
                              style={{ backgroundColor: theme.bgLight, color: theme.darkHex, border: `1px solid ${theme.borderSubtle}` }}
                            >
                              Action {actionNum}
                            </span>
                            <span className="text-xs text-ink-muted font-medium">{act.actionThemeTitle}</span>
                          </div>
                          <h4 className="font-heading text-xl sm:text-2xl font-medium text-ink">
                            {act.title}
                          </h4>
                        </div>

                        <div 
                          className={`p-2 rounded-none transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                          style={{ color: theme.hex }}
                        >
                          <ChevronDown size={20} />
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 sm:p-8 pt-0 border-t border-line/60 space-y-6">
                              <div className="body-text leading-relaxed space-y-4 pt-6">
                                {act.paragraphs.map((p, pIdx) => (
                                  <div key={pIdx} className="space-y-2">
                                    <ReactMarkdown
                                      components={{
                                        strong: ({ children }) => <strong className="text-ink font-medium">{children}</strong>,
                                        p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                                        ol: ({ children }) => <ol className="list-decimal pl-5 space-y-2 mt-2">{children}</ol>,
                                        ul: ({ children }) => <ul className="list-disc pl-5 space-y-2 mt-2">{children}</ul>,
                                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                                      }}
                                    >
                                      {p}
                                    </ReactMarkdown>
                                  </div>
                                ))}
                              </div>

                              {/* Case Study if present */}
                              {act.caseStudy && (act.caseStudy.title || (act.caseStudy.paragraphs && act.caseStudy.paragraphs.length > 0)) && (
                                <div className="mt-8 pt-6 border-t border-line/60">
                                  {act.caseStudy.title && (
                                    <h5 className="font-heading text-xl font-medium text-ink mb-3 leading-snug">
                                      {act.caseStudy.title}
                                    </h5>
                                  )}
                                  {act.caseStudy.paragraphs && (
                                    <div className="body-text leading-relaxed space-y-3">
                                      {act.caseStudy.paragraphs.map((cp, cIdx) => (
                                        <div key={cIdx}>
                                          <ReactMarkdown
                                            components={{
                                              strong: ({ children }) => <strong className="text-ink font-medium">{children}</strong>,
                                              p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
                                            }}
                                          >
                                            {cp}
                                          </ReactMarkdown>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* What this has enabled */}
                              {act.enabledSummary && (
                                <div className={act.caseStudy && (act.caseStudy.title || (act.caseStudy.paragraphs && act.caseStudy.paragraphs.length > 0)) ? "mt-8 pt-6 border-t border-line/60" : "mt-8"}>
                                  <div 
                                    className="p-5 sm:p-6 rounded-none border space-y-2"
                                    style={{ backgroundColor: theme.bgSubtle, borderColor: theme.borderSubtle }}
                                  >
                                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider" style={{ color: theme.darkHex }}>
                                      <CheckCircle2 size={15} />
                                      What this has enabled
                                    </div>
                                    <p className="body-text-sm leading-relaxed">
                                      {act.enabledSummary}
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Seamless Action Guidance Link in Footer */}
                              {onNavigateToCoreAction && (
                                <div className="pt-4 border-t border-line/60 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => onNavigateToCoreAction(actionNum)}
                                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold border transition-all rounded-none cursor-pointer shadow-2xs hover:shadow-xs group"
                                    style={{
                                      borderColor: theme.borderSubtle,
                                      backgroundColor: theme.bgLight,
                                      color: theme.darkHex,
                                    }}
                                  >
                                    <span>See related toolkit guidance</span>
                                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                                  </button>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

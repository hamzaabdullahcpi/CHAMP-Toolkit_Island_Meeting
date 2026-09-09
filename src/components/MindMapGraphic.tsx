import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { actionsData as fallbackActionsData } from '../data/content';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import { getActionTheme } from '../utils/actionThemes';

export default function MindMapGraphic({ 
  onNavigateToStep,
  actionsData: passedActions
}: { 
  onNavigateToStep: (stepId: number, pathwayIdx?: number, example?: any) => void;
  actionsData?: any[];
}) {
  const actions = passedActions && passedActions.length > 0 ? passedActions : fallbackActionsData;
  const [activeActionId, setActiveActionId] = useState<number | null>(null);
  const [activePathwayIdx, setActivePathwayIdx] = useState<number | null>(null);

  const activeAction = actions.find(a => a.id === activeActionId);
  const activePathway = activeAction && activePathwayIdx !== null ? activeAction.pathways[activePathwayIdx] : null;
  const activeTheme = activeAction ? getActionTheme(activeAction.id) : null;

  return (
    <div className="w-full flex flex-col items-center bg-paper py-12 px-4 md:px-8 border-y border-line min-h-[520px]">
      <div className="text-center mb-8 max-w-3xl">
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-2">
          Explore 6 Actions
        </h3>
        <p className="text-ink-muted text-xs md:text-[13px] font-light">
          {activeActionId 
            ? "Click any action card to switch, click pathways to view key resources, or click (↗) to navigate directly." 
            : "Click any action card to explore its implementation pathways and key resources, or click (↗) to navigate directly."}
        </p>
      </div>

      {/* Mind Map Canvas Container */}
      <div className="w-full max-w-6xl mx-auto flex justify-center overflow-x-auto pb-4 custom-scrollbar">
        <motion.div 
          layout
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-stretch justify-center gap-2.5 sm:gap-3 md:gap-4 min-w-0"
        >
          {/* Column 1 (or 3x2 Grid): Core 6 Action Cards */}
          <motion.div 
            layout
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className={
              !activeActionId
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full max-w-5xl"
                : "flex flex-col justify-center w-full min-w-[170px] max-w-[270px] gap-2 shrink"
            }
          >
            {activeActionId !== null && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-1 flex items-center justify-between px-1"
              >
                <span>Actions</span>
                <button 
                  onClick={() => {
                    setActiveActionId(null);
                    setActivePathwayIdx(null);
                  }}
                  className="text-[11px] text-accent hover:underline lowercase font-medium cursor-pointer"
                >
                  view grid
                </button>
              </motion.div>
            )}

            {actions.map((action) => {
              const isSelected = activeActionId === action.id;
              const theme = getActionTheme(action.id);
              const pathwayCount = action.pathways?.length || 0;
              const pathwayLabel = pathwayCount === 1 ? 'Pathway' : 'Pathways';

              return (
                <motion.div
                  layout
                  key={action.id}
                  transition={{ 
                    layout: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: 0.2 }
                  }}
                  onClick={() => {
                    if (activeActionId === null) {
                      setActiveActionId(action.id);
                      setActivePathwayIdx(0);
                    } else if (isSelected) {
                      setActiveActionId(null);
                      setActivePathwayIdx(null);
                    } else {
                      setActiveActionId(action.id);
                      setActivePathwayIdx(0);
                    }
                  }}
                  style={
                    activeActionId !== null
                      ? isSelected
                        ? {
                            borderLeft: `4px solid ${theme.hex}`,
                            backgroundColor: theme.bgLight,
                            borderColor: theme.borderSubtle,
                          }
                        : {}
                      : {}
                  }
                  className={`cursor-pointer group flex flex-col relative rounded-none select-none ${
                    !activeActionId
                      ? 'justify-between p-5 md:p-6 bg-surface border border-line shadow-2xs hover:shadow-md min-h-[170px] overflow-hidden'
                      : isSelected
                      ? 'p-2.5 sm:p-3 border-y border-r shadow-xs z-10'
                      : 'p-2 sm:p-2.5 bg-surface/70 border border-line hover:bg-surface opacity-85 hover:opacity-100'
                  }`}
                  onMouseEnter={(e) => {
                    if (!activeActionId) {
                      e.currentTarget.style.borderColor = theme.borderMedium;
                      e.currentTarget.style.backgroundColor = theme.bgSubtle;
                    } else if (!isSelected) {
                      e.currentTarget.style.borderColor = theme.borderSubtle;
                      e.currentTarget.style.backgroundColor = theme.bgSubtle;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!activeActionId) {
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.backgroundColor = '';
                    } else if (!isSelected) {
                      e.currentTarget.style.borderColor = '';
                      e.currentTarget.style.backgroundColor = '';
                    }
                  }}
                >
                  {!activeActionId ? (
                    /* Grid View Card Layout */
                    <div className="flex flex-col justify-between h-full min-h-[145px]">
                      {/* Decorative Brand Top Bar */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: theme.hex }}
                      />

                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <span 
                            className="font-heading text-2xl font-bold tracking-tight"
                            style={{ color: theme.hex }}
                          >
                            0{action.id}
                          </span>
                          
                          {/* Direct Navigation Button */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              onNavigateToStep(action.id);
                            }}
                            title={`Go to Action 0${action.id} Page`}
                            className="w-8 h-8 rounded-none bg-paper border border-line text-ink-muted flex items-center justify-center shadow-2xs group/btn cursor-pointer transition-colors"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = theme.hex;
                              e.currentTarget.style.borderColor = theme.hex;
                              e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '';
                              e.currentTarget.style.borderColor = '';
                              e.currentTarget.style.color = '';
                            }}
                          >
                            <ArrowUpRight size={15} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                          </button>
                        </div>

                        <h4 className="font-heading text-[15.5px] font-semibold text-ink leading-snug mb-3">
                          {action.title}
                        </h4>
                      </div>

                      <div className="pt-3 border-t border-line/80 flex items-center justify-between text-xs">
                        <span className="font-medium text-ink-muted group-hover:text-ink transition-colors">
                          <span>{pathwayCount} {pathwayLabel}</span>
                        </span>
                        <span 
                          className="flex items-center gap-0.5 font-semibold group-hover:translate-x-0.5 transition-transform"
                          style={{ color: theme.darkHex }}
                        >
                          Explore <ChevronRight size={13} />
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* Stacked View Card Layout */
                    <div className="flex flex-col min-w-0">
                      <div className="flex justify-between items-center mb-1 gap-1">
                        <span 
                          className="font-bold truncate text-[11px] tracking-wide"
                          style={{ color: isSelected ? theme.darkHex : theme.hex }}
                        >
                          Action 0{action.id}
                        </span>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onNavigateToStep(action.id);
                          }}
                          title={`Go to Action ${action.id} Page`}
                          style={isSelected ? { backgroundColor: theme.hex, color: '#FFFFFF' } : {}}
                          className={`flex shrink-0 items-center justify-center rounded-none focus:outline-none cursor-pointer transition-colors ${
                            isSelected 
                              ? 'w-5.5 h-5.5 shadow-2xs' 
                              : 'bg-line/40 hover:text-white text-ink-muted w-5.5 h-5.5'
                          }`}
                          onMouseEnter={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = theme.hex;
                              e.currentTarget.style.color = '#FFFFFF';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.backgroundColor = '';
                              e.currentTarget.style.color = '';
                            }
                          }}
                        >
                          <ArrowUpRight size={11} className="stroke-[2.2]" />
                        </button>
                      </div>
                      
                      <h4 className={`line-clamp-2 break-words text-[12.5px] leading-snug font-medium ${isSelected ? 'text-ink font-semibold' : 'text-ink/80'}`}>
                        {action.title}
                      </h4>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Column 2: Action Pathways */}
          <AnimatePresence mode="popLayout">
            {activeAction && activeTheme && (
              <motion.div 
                key={`pathways-${activeAction.id}`}
                layout
                initial={{ opacity: 0, x: 20, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-stretch shrink min-w-0 w-full max-w-[310px]"
              >
                {/* Connector */}
                <div className="hidden sm:flex flex-col justify-center px-1 shrink-0">
                  <svg width="12" height="2" className="overflow-visible">
                    <line 
                      x1="0" 
                      y1="0" 
                      x2="12" 
                      y2="0" 
                      stroke={activeTheme.hex} 
                      strokeWidth="2" 
                      strokeDasharray="3 2" 
                      strokeOpacity="0.5" 
                    />
                  </svg>
                </div>

                {/* Pathways Column */}
                <div className="flex flex-col justify-center w-full min-w-[180px] max-w-[300px]">
                  <div className="text-[11px] font-bold uppercase tracking-wider mb-2 text-center flex items-center justify-center gap-1.5 text-ink-muted">
                    <span>Implementation Pathways</span>
                    <span 
                      className="px-1.5 py-0.2 rounded-none text-[10px] font-bold"
                      style={{ backgroundColor: activeTheme.badgeBg, color: activeTheme.badgeText }}
                    >
                      {activeAction.pathways?.length || 0}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 max-h-[440px] overflow-y-auto custom-scrollbar pr-1 pb-1">
                    {activeAction.pathways?.map((pathway: any, idx: number) => {
                      const isActive = activePathwayIdx === idx;
                      return (
                        <div 
                          key={idx}
                          onClick={() => {
                            setActivePathwayIdx(isActive ? null : idx);
                          }}
                          style={isActive ? {
                            borderLeft: `4px solid ${activeTheme.hex}`,
                            backgroundColor: activeTheme.bgLight,
                            borderColor: activeTheme.borderSubtle,
                          } : {}}
                          className={`p-2.5 sm:p-3 cursor-pointer rounded-none flex flex-col gap-1.5 shrink-0 group/pathway select-none transition-colors ${
                            isActive 
                              ? 'border-y border-r shadow-xs z-10' 
                              : 'bg-surface/70 border border-line hover:bg-surface'
                          }`}
                          onMouseEnter={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.borderColor = activeTheme.borderSubtle;
                              e.currentTarget.style.backgroundColor = activeTheme.bgSubtle;
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive) {
                              e.currentTarget.style.borderColor = '';
                              e.currentTarget.style.backgroundColor = '';
                            }
                          }}
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-[12.5px] font-medium leading-snug break-words ${isActive ? 'text-ink font-semibold' : 'text-ink/80 group-hover/pathway:text-ink'}`}>
                                {pathway.title || pathway.name}
                              </h4>
                            </div>

                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToStep(activeAction.id, idx);
                              }}
                              title="Go to Pathway Page"
                              style={isActive ? { backgroundColor: activeTheme.hex, color: '#FFFFFF' } : {}}
                              className={`shrink-0 focus:outline-none w-5.5 h-5.5 flex items-center justify-center rounded-none cursor-pointer transition-colors ${
                                isActive
                                  ? 'shadow-2xs'
                                  : 'bg-line/40 text-ink-muted'
                              }`}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.backgroundColor = activeTheme.hex;
                                  e.currentTarget.style.color = '#FFFFFF';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.backgroundColor = '';
                                  e.currentTarget.style.color = '';
                                }
                              }}
                            >
                              <ArrowUpRight size={11} className="stroke-[2.2]" />
                            </button>
                          </div>

                          {(() => {
                            const keyCount = pathway.illustrativeExamples?.length || 0;
                            const addCount = pathway.resources?.length || 0;
                            if (keyCount === 0 && addCount === 0) return null;

                            return (
                              <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                                {keyCount > 0 && (
                                  <span 
                                    className="px-1.5 py-0.5 rounded-none text-[9px] font-semibold"
                                    style={{ backgroundColor: activeTheme.bgMedium, color: activeTheme.darkHex }}
                                  >
                                    {keyCount} {keyCount === 1 ? 'Key' : 'Key Resources'}
                                  </span>
                                )}
                                {addCount > 0 && (
                                  <span 
                                    className="px-1.5 py-0.5 rounded-none text-[9px] font-medium bg-line/40 text-ink-muted"
                                  >
                                    {addCount} {addCount === 1 ? 'Additional' : 'Additional'}
                                  </span>
                                )}
                              </div>
                            );
                          })()}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Column 3: Key Resources */}
          <AnimatePresence mode="popLayout">
            {activePathway && activeTheme && (
              <motion.div 
                key={`examples-${activePathwayIdx}`}
                layout
                initial={{ opacity: 0, x: 20, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 15, scale: 0.97 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-stretch shrink min-w-0 w-full max-w-[320px]"
              >
                {/* Connector */}
                <div className="hidden sm:flex flex-col justify-center px-1 shrink-0">
                  <svg width="12" height="2" className="overflow-visible">
                    <line 
                      x1="0" 
                      y1="0" 
                      x2="12" 
                      y2="0" 
                      stroke={activeTheme.hex} 
                      strokeWidth="2" 
                      strokeDasharray="3 2" 
                      strokeOpacity="0.5" 
                    />
                  </svg>
                </div>

                {/* Key Resources Column */}
                <div className="flex flex-col justify-center w-full min-w-[190px] max-w-[310px]">
                  <div className="text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-2 text-center flex items-center justify-center gap-1.5">
                    <span>Key Resources</span>
                  </div>

                  <div className="flex flex-col gap-2 max-h-[440px] overflow-y-auto custom-scrollbar pr-1 pb-1">
                    {activePathway.illustrativeExamples && activePathway.illustrativeExamples.length > 0 ? (
                      activePathway.illustrativeExamples.map((ex: any, idx: number) => {
                        const isTool = String(ex.type || '').toLowerCase().includes('tool');
                        return (
                          <div 
                            key={idx}
                            onClick={() => {
                              onNavigateToStep(activeAction.id, activePathwayIdx!, ex);
                            }}
                            className="p-2.5 cursor-pointer bg-surface border border-line hover:shadow-2xs rounded-none flex items-start justify-between gap-2 group shrink-0 select-none transition-colors"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = activeTheme.borderMedium;
                              e.currentTarget.style.backgroundColor = activeTheme.bgSubtle;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '';
                              e.currentTarget.style.backgroundColor = '';
                            }}
                          >
                            <div className="flex-1 min-w-0">
                              {ex.type && (
                                <div className="mb-1.5">
                                 <span 
                                    className="inline-block px-1.5 py-0.5 rounded-none text-[9.5px] font-semibold uppercase tracking-wider"
                                    style={{ 
                                      backgroundColor: activeTheme.bgMedium, 
                                      color: activeTheme.darkHex 
                                    }}
                                  >
                                    {ex.type}
                                  </span>
                                </div>
                              )}
                              <h4 
                                className="text-[12.5px] font-medium leading-snug text-ink/90 group-hover:text-ink break-words"
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = activeTheme.darkHex;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = '';
                                }}
                              >
                                {ex.title}
                              </h4>
                            </div>
                            <ArrowUpRight 
                              size={12} 
                              className="shrink-0 text-ink-muted mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" 
                              style={{ color: activeTheme.hex }}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 border border-dashed border-line text-center text-ink-muted text-[11px] italic shrink-0 bg-surface/30 rounded-none">
                        No key resources in this pathway.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

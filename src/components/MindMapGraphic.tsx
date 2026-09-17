import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { actionsData as fallbackActionsData } from '../data/content';
import { ArrowUpRight, ChevronRight, Filter, X, Check, ChevronDown, Search, RotateCcw } from 'lucide-react';
import { getActionTheme } from '../utils/actionThemes';

const LEAD_ACTORS = [
  'Finance Ministry',
  'Planning Ministry',
  'Climate Ministry',
  'Urban / Local Government Ministry',
  'Industry Ministry',
  'Procurement Authority'
];

// Helper to normalize actor names for robust matching
function normalizeActor(name: string) {
  return (name || '').trim().toLowerCase();
}

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
  const [selectedActors, setSelectedActors] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  // Close filter dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // Compute pathway counts per lead actor across all actions
  const actorCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const actor of LEAD_ACTORS) {
      counts[actor] = 0;
    }

    for (const action of actions) {
      for (const p of action.pathways || []) {
        const leads: string[] = Array.isArray(p.potentialNationalLead) ? p.potentialNationalLead : [];
        const normalizedLeads = leads.map(normalizeActor);

        for (const actor of LEAD_ACTORS) {
          if (normalizedLeads.includes(normalizeActor(actor))) {
            counts[actor]++;
          }
        }
      }
    }
    return counts;
  }, [actions]);

  // Toggle single lead actor in selected list
  const handleToggleActor = (actor: string) => {
    setSelectedActors((prev) => {
      if (prev.includes(actor)) {
        return prev.filter((a) => a !== actor);
      } else {
        return [...prev, actor];
      }
    });
  };

  const handleClearAll = () => {
    setSelectedActors([]);
  };

  // Filter actions and pathways based on selected lead actors
  const filteredActions = useMemo(() => {
    if (selectedActors.length === 0) {
      return actions.map((action) => ({
        ...action,
        displayPathways: (action.pathways || []).map((p: any, idx: number) => ({
          ...p,
          originalIndex: idx
        }))
      }));
    }

    const normalizedSelected = selectedActors.map(normalizeActor);

    return actions
      .map((action) => {
        const matching = (action.pathways || [])
          .map((p: any, idx: number) => ({ ...p, originalIndex: idx }))
          .filter((p: any) => {
            const leads: string[] = Array.isArray(p.potentialNationalLead) ? p.potentialNationalLead : [];
            const normalizedLeads = leads.map(normalizeActor);
            return normalizedSelected.some((sel) => normalizedLeads.includes(sel));
          });
        return {
          ...action,
          displayPathways: matching
        };
      })
      .filter((action) => action.displayPathways.length > 0);
  }, [actions, selectedActors]);

  // If currently active action is no longer visible under the filter, fallback or adjust
  const activeAction = filteredActions.find((a) => a.id === activeActionId);
  const activeDisplayPathways = activeAction ? activeAction.displayPathways : [];
  const activePathway = activeAction && activePathwayIdx !== null ? activeDisplayPathways[activePathwayIdx] : null;
  const activeTheme = activeAction ? getActionTheme(activeAction.id) : null;

  // Keep activeActionId aligned if current active action is not in filtered list
  useEffect(() => {
    if (activeActionId !== null && filteredActions.length > 0) {
      const exists = filteredActions.some((a) => a.id === activeActionId);
      if (!exists) {
        setActiveActionId(filteredActions[0].id);
        setActivePathwayIdx(null);
      }
    }
  }, [filteredActions, activeActionId]);

  // Ensure activePathwayIdx stays within bounds of activeDisplayPathways
  useEffect(() => {
    if (activePathwayIdx !== null) {
      if (activeDisplayPathways.length === 0) {
        setActivePathwayIdx(null);
      } else if (activePathwayIdx >= activeDisplayPathways.length) {
        setActivePathwayIdx(0);
      }
    }
  }, [activeDisplayPathways, activePathwayIdx]);

  // Filtered lead actors for search query
  const filteredLeadActors = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return LEAD_ACTORS;
    return LEAD_ACTORS.filter((a) => a.toLowerCase().includes(q));
  }, [searchQuery]);

  return (
    <div className="w-full flex flex-col items-center bg-paper py-12 px-4 md:px-8 border-y border-line min-h-[520px]">
      <div className="text-center mb-6 max-w-3xl">
        <h3 className="font-heading text-2xl md:text-3xl font-bold text-ink mb-2">
          Explore 6 Actions
        </h3>
        <p className="body-text-sm">
          {activeActionId 
            ? "Click any action card to switch, click pathways to view key resources, or click (↗) to navigate directly." 
            : "Click any action card to explore its implementation pathways and key resources, or click (↗) to navigate directly."}
        </p>
      </div>

      {/* Mind Map Canvas Container */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center overflow-x-auto pb-4 custom-scrollbar">
        {/* Top Header Bar when Expanded: Actions on left, Filter on right top aligned with uppermost card */}
        {activeActionId !== null && (
          <div className="w-full flex items-center justify-between gap-4 mb-2.5 max-w-5xl px-1">
            {/* Left: Actions Count & View Grid */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-ink-muted uppercase tracking-wider">
                Actions ({filteredActions.length})
              </span>
              <button 
                onClick={() => {
                  setActiveActionId(null);
                  setActivePathwayIdx(null);
                }}
                className="text-[11px] text-accent hover:underline lowercase font-medium cursor-pointer"
              >
                view grid
              </button>
            </div>

            {/* Right: Filter Trigger & Active Tags */}
            <div className="relative flex items-center gap-2" ref={filterRef}>
              {/* Compact Active Tags */}
              {selectedActors.length > 0 && (
                <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
                  {selectedActors.map((actor) => (
                    <span
                      key={actor}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10.5px] font-medium bg-surface border border-line text-ink select-none"
                    >
                      <span>{actor}</span>
                      <button
                        type="button"
                        onClick={() => handleToggleActor(actor)}
                        className="text-ink-muted hover:text-accent transition-colors cursor-pointer"
                        title={`Remove ${actor}`}
                      >
                        <X size={9} />
                      </button>
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-[10.5px] text-ink-muted hover:text-accent underline underline-offset-2 cursor-pointer font-medium ml-0.5"
                  >
                    Clear
                  </button>
                </div>
              )}

              {/* Filter Trigger Button */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs transition-colors cursor-pointer select-none rounded-none border ${
                  selectedActors.length > 0
                    ? 'border-accent text-accent font-medium bg-accent/5'
                    : 'border-line/90 hover:border-ink/50 text-ink bg-transparent'
                }`}
                aria-expanded={isFilterOpen}
                aria-haspopup="dialog"
              >
                <Filter size={11} className={selectedActors.length > 0 ? "text-accent stroke-[2.2]" : "text-ink-muted"} />
                <span className="text-[11.5px]">Filter by actor</span>
                {selectedActors.length > 0 && (
                  <span className="px-1 py-0.2 bg-accent text-white text-[9.5px] font-bold">
                    {selectedActors.length}
                  </span>
                )}
                <ChevronDown 
                  size={11} 
                  className={`text-ink-muted transition-transform duration-150 ${isFilterOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {/* Compact Dropdown Popover */}
              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-1.5 z-50 w-[280px] sm:w-[310px] bg-paper border border-line shadow-xl text-left"
                  >
                    {/* Search Bar */}
                    <div className="p-2 border-b border-line flex items-center gap-2 bg-surface/40">
                      <Search size={12} className="text-ink-muted shrink-0 ml-1" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search lead actors..."
                        className="w-full text-xs bg-transparent border-none outline-none text-ink placeholder:text-ink-muted py-0.5"
                        autoFocus
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="text-ink-muted hover:text-ink p-0.5 cursor-pointer"
                        >
                          <X size={11} />
                        </button>
                      )}
                    </div>

                    {/* Lead Actor Options */}
                    <div className="max-h-[240px] overflow-y-auto custom-scrollbar p-1.5 space-y-0.5">
                      {filteredLeadActors.length === 0 ? (
                        <div className="py-4 text-center text-xs text-ink-muted italic">
                          No matching lead actors found.
                        </div>
                      ) : (
                        filteredLeadActors.map((actor) => {
                          const isSelected = selectedActors.includes(actor);
                          const count = actorCounts[actor] || 0;

                          return (
                            <button
                              key={actor}
                              type="button"
                              onClick={() => handleToggleActor(actor)}
                              className={`w-full text-left px-2 py-1.5 text-[11.5px] rounded-none transition-colors flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? 'bg-accent/10 text-accent font-medium'
                                  : 'hover:bg-surface text-ink'
                              }`}
                            >
                              <span className="truncate pr-1.5">{actor}</span>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {count > 0 && (
                                  <span className="text-[9.5px] px-1 bg-ink/5 text-ink font-semibold">
                                    {count}
                                  </span>
                                )}
                                <div className={`w-3.5 h-3.5 border flex items-center justify-center ${
                                  isSelected 
                                    ? 'border-accent bg-accent text-white' 
                                    : 'border-line bg-surface'
                                }`}>
                                  {isSelected && <Check size={10} className="stroke-[2.5]" />}
                                </div>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>

                    {/* Footer Controls */}
                    <div className="p-2 border-t border-line flex items-center justify-between text-xs bg-surface/40">
                      <span className="text-[11px] text-ink-muted">
                        {selectedActors.length} selected
                      </span>
                      <div className="flex items-center gap-2">
                        {selectedActors.length > 0 && (
                          <button
                            type="button"
                            onClick={handleClearAll}
                            className="text-[11px] text-ink-muted hover:text-accent cursor-pointer"
                          >
                            Clear
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setIsFilterOpen(false)}
                          className="px-2.5 py-0.5 bg-ink text-paper text-[11px] font-medium cursor-pointer"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {filteredActions.length === 0 ? (
          <div className="py-12 px-6 text-center max-w-md mx-auto bg-surface border border-dashed border-line">
            <h4 className="text-sm font-semibold text-ink mb-1">
              No pathways match the selected actor{selectedActors.length > 1 ? 's' : ''}
            </h4>
            <p className="text-xs text-ink-muted mb-4">
              Action 5 is currently populated with full actor targeting. Other actions will be populated soon.
            </p>
            <button
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-paper text-xs font-semibold rounded-none cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Show All Actions</span>
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex items-stretch justify-center gap-2.5 sm:gap-3 md:gap-4 min-w-0"
          >
            {/* Column 1 (or 3x2 Grid): Filtered Action Cards */}
            <motion.div 
              layout
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className={
                !activeActionId
                  ? filteredActions.length <= 2 
                    ? "flex flex-wrap justify-center gap-4 md:gap-5 w-full max-w-2xl"
                    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 w-full max-w-5xl"
                  : "flex flex-col justify-center w-full min-w-[170px] max-w-[270px] gap-2 shrink"
              }
            >
              {filteredActions.map((action) => {
                const isSelected = activeActionId === action.id;
                const theme = getActionTheme(action.id);
                const pathwayCount = action.displayPathways?.length || 0;
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
                        ? `justify-between p-5 md:p-6 bg-surface border border-line shadow-2xs hover:shadow-md min-h-[170px] overflow-hidden ${
                            filteredActions.length <= 2 ? 'w-full sm:w-[320px]' : ''
                          }`
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
                            <span>
                              {pathwayCount} {pathwayLabel}
                              {selectedActors.length > 0 && ` matching`}
                            </span>
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
                        {activeDisplayPathways.length}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 max-h-[440px] overflow-y-auto custom-scrollbar pr-1 pb-1">
                      {activeDisplayPathways.map((pathway: any, idx: number) => {
                        const isActive = activePathwayIdx === idx;
                        const originalIdx = pathway.originalIndex !== undefined ? pathway.originalIndex : idx;

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
                                  onNavigateToStep(activeAction.id, originalIdx);
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

                            {/* Lead Badge only if filtered */}
                            {selectedActors.length > 0 && pathway.potentialNationalLead && pathway.potentialNationalLead.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {pathway.potentialNationalLead.map((lead: string, lIdx: number) => {
                                  const isLeadSelected = selectedActors.some(
                                    (sel) => normalizeActor(sel) === normalizeActor(lead)
                                  );
                                  return (
                                    <span 
                                      key={lIdx} 
                                      className={`px-1.5 py-0.2 text-[9px] rounded-none ${
                                        isLeadSelected
                                          ? 'bg-accent/15 text-accent font-semibold border border-accent/30'
                                          : 'bg-surface border border-line text-ink-muted'
                                      }`}
                                    >
                                      {lead}
                                    </span>
                                  );
                                })}
                              </div>
                            )}

                            {(() => {
                              const keyCount = pathway.illustrativeExamples?.length || 0;
                              if (keyCount === 0) return null;

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
                          const originalIdx = activePathway.originalIndex !== undefined ? activePathway.originalIndex : (activePathwayIdx || 0);
                          return (
                            <div 
                              key={idx}
                              onClick={() => {
                                onNavigateToStep(activeAction.id, originalIdx, ex);
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
        )}
      </div>
    </div>
  );
}

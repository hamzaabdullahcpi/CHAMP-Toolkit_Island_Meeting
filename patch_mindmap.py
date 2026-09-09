import re

with open('src/components/MindMapGraphic.tsx', 'r') as f:
    content = f.read()

# 1. Action Layer
action_target = """                    onClick={() => {
                      if (isActive) {
                        setActiveActionId(null);
                        setActivePathwayIdx(null);
                      } else {
                        setActiveActionId(action.id);
                        // Auto-expand first pathway to show examples together
                        setActivePathwayIdx(0);
                      }
                    }}
                    className={`cursor-pointer group flex flex-col relative ${
                      !activeActionId 
                        ? 'p-6 bg-surface border-t-2 border-t-transparent border border-line hover:border-t-accent hover:shadow-md transition-shadow'
                        : isActive 
                          ? 'p-4 bg-surface border-l-4 border-transparent border-l-accent shadow-md z-20 scale-[1.02] origin-left'
                          : 'p-3 bg-surface/40 border-l-2 border-transparent border-l-line hover:bg-surface/80 hover:border-l-ink/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <motion.div layout transition={springTransition} className="flex justify-between items-start mb-2">
                      <motion.span layout transition={springTransition} className={`font-bold ${!activeActionId ? 'text-2xl font-heading text-accent' : isActive ? 'text-[12px] text-accent' : 'text-[10px] text-ink-muted'}`}>
                        0{action.id}
                      </motion.span>
                      {!activeActionId ? (
                        <div className="bg-line/30 group-hover:bg-accent group-hover:text-white text-ink-muted w-6 h-6 flex items-center justify-center rounded-full transition-colors">
                          <Plus size={14} />
                        </div>
                      ) : isActive ? (
                        <div className="text-accent">
                          <Minus size={14} />
                        </div>
                      ) : (
                        <div className="text-ink-muted group-hover:text-ink transition-colors">
                          <Plus size={12} />
                        </div>
                      )}
                    </motion.div>"""

action_replacement = """                    onClick={() => onNavigateToStep(action.id)}
                    className={`cursor-pointer group flex flex-col relative ${
                      !activeActionId 
                        ? 'p-6 bg-surface border-t-2 border-t-transparent border border-line hover:border-t-accent hover:shadow-md transition-shadow'
                        : isActive 
                          ? 'p-4 bg-surface border-l-4 border-transparent border-l-accent shadow-md z-20 scale-[1.02] origin-left'
                          : 'p-3 bg-surface/40 border-l-2 border-transparent border-l-line hover:bg-surface/80 hover:border-l-ink/30 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <motion.div layout transition={springTransition} className="flex justify-between items-start mb-2">
                      <motion.span layout transition={springTransition} className={`font-bold ${!activeActionId ? 'text-2xl font-heading text-accent' : isActive ? 'text-[12px] text-accent' : 'text-[10px] text-ink-muted'}`}>
                        0{action.id}
                      </motion.span>
                      
                      {/* Expand/Collapse Button (prevents row click) */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isActive) {
                            setActiveActionId(null);
                            setActivePathwayIdx(null);
                          } else {
                            setActiveActionId(action.id);
                            setActivePathwayIdx(0);
                          }
                        }}
                        className={`flex items-center justify-center rounded-full transition-colors focus:outline-none ${!activeActionId ? 'bg-line/30 group-hover:bg-accent group-hover:text-white text-ink-muted w-6 h-6' : isActive ? 'text-accent' : 'text-ink-muted group-hover:text-ink'}`}
                      >
                        {isActive ? <Minus size={!activeActionId ? 14 : 14} /> : <Plus size={!activeActionId ? 14 : 12} />}
                      </button>
                    </motion.div>"""

content = content.replace(action_target, action_replacement)

# 2. Pathways Layer
pathway_target = """                          <div 
                            key={idx}
                            onClick={() => setActivePathwayIdx(isActive ? null : idx)}
                            className={`p-3 cursor-pointer transition-colors border-l-2 flex flex-col gap-2 shadow-sm shrink-0 ${
                              isActive 
                                 ? 'bg-surface border-l-accent shadow-md z-20' 
                                 : 'bg-surface/50 border-l-line hover:bg-surface hover:border-l-ink/30'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2">
                                <GitMerge size={12} className={`shrink-0 mt-0.5 ${isActive ? 'text-accent' : 'text-ink-muted'}`} />
                                <h4 className={`text-[12px] font-medium leading-snug ${isActive ? 'text-ink' : 'text-ink/80'}`}>
                                  {pathway.title || pathway.name}
                                </h4>
                              </div>
                              {/* small indicator */}
                              <div className="shrink-0 mt-0.5">
                                {isActive ? <Minus size={10} className="text-accent" /> : <Plus size={10} className="text-line" />}
                              </div>
                            </div>
                          </div>"""

pathway_replacement = """                          <div 
                            key={idx}
                            onClick={() => onNavigateToStep(activeAction.id, idx)}
                            className={`p-3 cursor-pointer transition-colors border-l-2 flex flex-col gap-2 shadow-sm shrink-0 group/pathway ${
                              isActive 
                                 ? 'bg-surface border-l-accent shadow-md z-20' 
                                 : 'bg-surface/50 border-l-line hover:bg-surface hover:border-l-accent/50'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2 group-hover/pathway:text-accent transition-colors">
                                <GitMerge size={12} className={`shrink-0 mt-0.5 ${isActive ? 'text-accent' : 'text-ink-muted group-hover/pathway:text-accent/70'}`} />
                                <h4 className={`text-[12px] font-medium leading-snug ${isActive ? 'text-ink' : 'text-ink/80 group-hover/pathway:text-ink'}`}>
                                  {pathway.title || pathway.name}
                                </h4>
                              </div>
                              {/* Expand/Collapse Button (prevents row click) */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePathwayIdx(isActive ? null : idx);
                                }}
                                className="shrink-0 mt-0.5 focus:outline-none p-0.5 hover:bg-line/50 rounded-sm text-ink-muted hover:text-ink transition-colors"
                              >
                                {isActive ? <Minus size={12} className="text-accent" /> : <Plus size={12} />}
                              </button>
                            </div>
                          </div>"""

content = content.replace(pathway_target, pathway_replacement)

# 3. Remove "Read Action Details" button
btn_action_target = """                    <button 
                      onClick={() => onNavigateToStep(activeAction.id)}
                      className="mb-3 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 p-2 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      Read Action Details <ArrowRight size={12} />
                    </button>"""
content = content.replace(btn_action_target, "")

# 4. Remove "Read Pathway" button
btn_pathway_target = """                    <button 
                      onClick={() => onNavigateToStep(activeAction.id, activePathwayIdx!)}
                      className="mb-3 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 p-2 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      Read Pathway <ArrowRight size={12} />
                    </button>"""
content = content.replace(btn_pathway_target, "")

with open('src/components/MindMapGraphic.tsx', 'w') as f:
    f.write(content)

import re

with open('src/components/MindMapGraphic.tsx', 'r') as f:
    content = f.read()

# Action layer button:
# <button 
#   onClick={(e) => {
#     e.stopPropagation();
#     if (isActive) { ...
#   className={`flex items-center justify-center rounded-full transition-colors focus:outline-none ${!activeActionId ? 'bg-line/30 group-hover:bg-accent group-hover:text-white text-ink-muted w-6 h-6' : isActive ? 'text-accent' : 'text-ink-muted group-hover:text-ink'}`}
# >
#   {isActive ? <Minus size={!activeActionId ? 14 : 14} /> : <Plus size={!activeActionId ? 14 : 12} />}
# </button>

# Pathway layer button:
# <button 
#   onClick={(e) => {
#     e.stopPropagation();
#     setActivePathwayIdx(isActive ? null : idx);
#   }}
#   className="shrink-0 mt-0.5 focus:outline-none p-0.5 hover:bg-line/50 rounded-sm text-ink-muted hover:text-ink transition-colors"
# >
#   {isActive ? <Minus size={12} className="text-accent" /> : <Plus size={12} />}
# </button>


action_target = """                      {/* Expand/Collapse Button (prevents row click) */}
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
                      </button>"""

action_replacement = """                      {/* Expand/Collapse Button (prevents row click) */}
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
                        className={`flex shrink-0 items-center justify-center rounded-full transition-colors focus:outline-none ${!activeActionId ? 'bg-line/30 group-hover:bg-accent group-hover:text-white text-ink-muted w-8 h-8' : isActive ? 'bg-accent/10 hover:bg-accent/20 text-accent w-7 h-7' : 'bg-line/30 hover:bg-line/50 text-ink-muted group-hover:text-ink w-7 h-7'}`}
                      >
                        {isActive ? <Minus size={16} /> : <Plus size={16} />}
                      </button>"""

content = content.replace(action_target, action_replacement)

pathway_target = """                              {/* Expand/Collapse Button (prevents row click) */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePathwayIdx(isActive ? null : idx);
                                }}
                                className="shrink-0 mt-0.5 focus:outline-none p-0.5 hover:bg-line/50 rounded-sm text-ink-muted hover:text-ink transition-colors"
                              >
                                {isActive ? <Minus size={12} className="text-accent" /> : <Plus size={12} />}
                              </button>"""

pathway_replacement = """                              {/* Expand/Collapse Button (prevents row click) */}
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActivePathwayIdx(isActive ? null : idx);
                                }}
                                className="shrink-0 focus:outline-none w-6 h-6 flex items-center justify-center bg-line/30 hover:bg-line/60 rounded-full text-ink-muted hover:text-ink transition-colors -mr-1"
                              >
                                {isActive ? <Minus size={14} className="text-accent" /> : <Plus size={14} />}
                              </button>"""

content = content.replace(pathway_target, pathway_replacement)

with open('src/components/MindMapGraphic.tsx', 'w') as f:
    f.write(content)


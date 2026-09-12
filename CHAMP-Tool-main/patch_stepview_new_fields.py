import re

with open('src/components/StepView.tsx', 'r') as f:
    content = f.read()

# Replace the Pathways Content block to include new fields
old_pathway_details = """                      <div className="prose prose-sm prose-p:text-ink/80 prose-p:leading-relaxed max-w-none">
                        <p>{activePathway.overview}</p>
                        
                        {activePathway.whatItIs && (
                          <div className="mt-8">
                            <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-[0.1em] mb-4">What it is</h4>
                            <p>{activePathway.whatItIs}</p>
                          </div>
                        )}"""

new_pathway_details = """                      <div className="prose prose-sm prose-p:text-ink/80 prose-p:leading-relaxed max-w-none">
                        <p>{activePathway.overview}</p>
                        
                        {activePathway.whatItIs && (
                          <div className="mt-8 bg-paper p-5 border border-line shadow-sm">
                            <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-[0.1em] mb-3 flex items-center gap-2"><Lightbulb size={16} className="text-accent" /> What it is</h4>
                            <p>{activePathway.whatItIs}</p>
                          </div>
                        )}
                        
                        {activePathway.whyItIsNeeded && (
                          <div className="mt-6 bg-paper p-5 border border-line shadow-sm">
                            <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-[0.1em] mb-3 flex items-center gap-2"><Settings size={16} className="text-accent" /> Why it is needed</h4>
                            <p>{activePathway.whyItIsNeeded}</p>
                          </div>
                        )}
                        
                        {activePathway.keyActors && activePathway.keyActors.length > 0 && (
                          <div className="mt-6 bg-paper p-5 border border-line shadow-sm">
                            <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-[0.1em] mb-3 flex items-center gap-2"><Users size={16} className="text-accent" /> Key Actors</h4>
                            <div className="flex flex-wrap gap-2">
                                {activePathway.keyActors.map((actor: string, i: number) => (
                                    <span key={i} className="px-3 py-1 bg-surface text-ink text-xs font-medium border border-line">{actor}</span>
                                ))}
                            </div>
                          </div>
                        )}
                        
                        {activePathway.transferability && activePathway.transferability.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-[0.1em] mb-3 flex items-center gap-2"><GitMerge size={16} className="text-accent" /> Transferability Considerations</h4>
                            <ul className="space-y-3">
                                {activePathway.transferability.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 bg-surface/50 p-3 border border-line shadow-sm">
                                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                        <span className="text-[13px] leading-relaxed text-ink/80">{item}</span>
                                    </li>
                                ))}
                            </ul>
                          </div>
                        )}
                        
                        {activePathway.enablingConditions && activePathway.enablingConditions.length > 0 && (
                          <div className="mt-6">
                            <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-[0.1em] mb-3 flex items-center gap-2"><CheckCircle2 size={16} className="text-accent" /> Enabling Conditions</h4>
                            <ul className="space-y-3">
                                {activePathway.enablingConditions.map((item: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 bg-surface/50 p-3 border border-line shadow-sm">
                                        <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" />
                                        <span className="text-[13px] leading-relaxed text-ink/80">{item}</span>
                                    </li>
                                ))}
                            </ul>
                          </div>
                        )}"""

content = content.replace(old_pathway_details, new_pathway_details)

old_sub_examples = """                                {selectedExample.link && (
                                  <a 
                                    href={selectedExample.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 text-[13px] font-medium text-accent hover:text-accent-hover transition-colors"
                                  >
                                    Read full case study <ExternalLink size={14} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}"""

new_sub_examples = """                                {selectedExample.subExamples && selectedExample.subExamples.length > 0 && (
                                  <div className="mt-10 border-t border-line pt-8">
                                    <h4 className="text-[14px] font-bold text-ink mb-6">Deep Dives & Models</h4>
                                    <div className="space-y-6">
                                      {selectedExample.subExamples.map((sub: any, i: number) => (
                                        <div key={i} className="bg-surface/50 border border-line p-5 shadow-sm">
                                          <h5 className="text-[15px] font-bold text-ink mb-2">{sub.title}</h5>
                                          <p className="text-[14px] leading-relaxed text-ink/80 mb-4 whitespace-pre-wrap">{sub.fullText || sub.excerpt}</p>
                                          {sub.link && (
                                            <a href={sub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[13px] font-medium text-accent hover:text-accent-hover transition-colors">
                                              Learn more about {sub.title} <ExternalLink size={14} />
                                            </a>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                
                                {selectedExample.link && (
                                  <a 
                                    href={selectedExample.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-8 text-[13px] font-medium text-accent hover:text-accent-hover transition-colors bg-surface px-4 py-2 border border-line hover:border-accent shadow-sm"
                                  >
                                    Read full case study <ExternalLink size={14} />
                                  </a>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}"""

content = content.replace(old_sub_examples, new_sub_examples)

with open('src/components/StepView.tsx', 'w') as f:
    f.write(content)

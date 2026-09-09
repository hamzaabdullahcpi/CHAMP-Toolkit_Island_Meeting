import re

with open('src/components/StepView.tsx', 'r') as f:
    content = f.read()

# 1. Update ExpandableBox signature and usage
target_exbox_sig = "function ExpandableBox({ title, content, icon: Icon = Lightbulb }: { title: string, content: string, icon?: any }) {"
replacement_exbox_sig = "function ExpandableBox({ title, content, link, icon: Icon = Lightbulb }: { title: string, content: string, link?: string, icon?: any }) {"
content = content.replace(target_exbox_sig, replacement_exbox_sig)

target_exbox_content = """            <div className="pt-5 border-t border-accent/10 mt-5">
              <p className="text-ink/80 leading-[1.8] font-light text-[15px] whitespace-pre-wrap">{content}</p>
            </div>"""
replacement_exbox_content = """            <div className="pt-5 border-t border-accent/10 mt-5">
              <p className="text-ink/80 leading-[1.8] font-light text-[15px] whitespace-pre-wrap mb-4">{content}</p>
              {link && (
                <a 
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-paper border border-line text-[13px] font-bold uppercase tracking-wider text-ink hover:text-accent hover:border-accent transition-colors"
                >
                  Know More
                  <ExternalLink size={14} />
                </a>
              )}
            </div>"""
content = content.replace(target_exbox_content, replacement_exbox_content)

# Update the subExamples.map to pass link
target_subex_map = """                      <ExpandableBox 
                        key={i} 
                        title={subEx.title} 
                        content={subEx.fullText || subEx.excerpt} 
                      />"""
replacement_subex_map = """                      <ExpandableBox 
                        key={i} 
                        title={subEx.title} 
                        content={subEx.fullText || subEx.excerpt} 
                        link={subEx.link}
                      />"""
content = content.replace(target_subex_map, replacement_subex_map)

# 2. Add "Know More" to selectedExample (main modal)
target_modal = """              <div className="p-6 md:p-10 overflow-y-auto">
                <p className="text-ink leading-[1.8] font-light text-[16px] md:text-[17px] whitespace-pre-wrap">
                  {selectedExample.fullText}
                </p>"""
replacement_modal = """              <div className="p-6 md:p-10 overflow-y-auto">
                <p className="text-ink leading-[1.8] font-light text-[16px] md:text-[17px] whitespace-pre-wrap mb-6">
                  {selectedExample.fullText}
                </p>
                {selectedExample.link && (
                  <div className="mb-6">
                    <a 
                      href={selectedExample.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-paper border border-line text-[13px] font-bold uppercase tracking-wider text-ink hover:text-accent hover:border-accent transition-colors"
                    >
                      Know More
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}"""
content = content.replace(target_modal, replacement_modal)

with open('src/components/StepView.tsx', 'w') as f:
    f.write(content)

import re

with open('src/components/StepView.tsx', 'r') as f:
    content = f.read()

rich_text_component = """
function RichTextRenderer({ text, textClass }: { text: string, textClass: string }) {
  if (!text) return null;
  const lines = text.split('\\n');
  return (
    <div className="space-y-2">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={i} className="h-2" />;
        const bulletMatch = trimmed.match(/^[\\-\\*\•]\\s+(.*)/);
        if (bulletMatch) {
          return (
            <div key={i} className="flex items-start gap-3 md:pl-2 my-2">
              <CheckCircle2 size={18} className="shrink-0 text-accent mt-0.5" />
              <div className={`flex-1 ${textClass} text-ink/95`}>{bulletMatch[1]}</div>
            </div>
          );
        }
        return <div key={i} className={`${textClass}`}>{line}</div>;
      })}
    </div>
  );
}

function ExpandableBox"""

# Insert RichTextRenderer right before ExpandableBox
content = content.replace("function ExpandableBox", rich_text_component)

# Update ExpandableBox to use RichTextRenderer
target_exbox = """<p className="text-ink/80 leading-[1.8] font-light text-[15px] whitespace-pre-wrap mb-4">{content}</p>"""
replacement_exbox = """<div className="mb-4">
                <RichTextRenderer text={content} textClass="text-ink/80 leading-[1.8] font-light text-[15px]" />
              </div>"""
content = content.replace(target_exbox, replacement_exbox)

# Update Modal to use RichTextRenderer
target_modal = """<p className="text-ink leading-[1.8] font-light text-[16px] md:text-[17px] whitespace-pre-wrap mb-6">
                  {selectedExample.fullText}
                </p>"""
replacement_modal = """<div className="mb-6">
                  <RichTextRenderer text={selectedExample.fullText} textClass="text-ink leading-[1.8] font-light text-[16px] md:text-[17px]" />
                </div>"""
content = content.replace(target_modal, replacement_modal)

with open('src/components/StepView.tsx', 'w') as f:
    f.write(content)


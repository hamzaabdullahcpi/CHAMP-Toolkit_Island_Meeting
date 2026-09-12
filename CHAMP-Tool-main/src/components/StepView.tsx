import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronDown, 
  ChevronUp,
  X, 
  CheckCircle2, 
  Lightbulb, 
  ExternalLink, 
  Network, 
  Sparkles,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { getActionTheme, ActionTheme } from '../utils/actionThemes';
import { enhanceAction5Examples, getAction5Connection } from '../data/action5ResourceConnections';

function CollapsibleList({ 
  title, 
  items, 
  preamble,
  theme, 
  defaultOpen = false 
}: { 
  title: string; 
  items: string[]; 
  preamble?: string;
  theme?: ActionTheme; 
  defaultOpen?: boolean; 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-2 border border-line bg-paper overflow-hidden transition-all shadow-sm rounded-none">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-surface/50 transition-colors focus:outline-none cursor-pointer"
      >
        <h4 className="text-[13px] font-bold text-ink-muted uppercase tracking-[0.1em]">{title}</h4>
        <div className={`shrink-0 w-8 h-8 rounded-none flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={18} className="stroke-[1.5] text-ink" />
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
            <div className="p-6 pt-3 bg-surface border-t border-line space-y-4">
              {preamble && (
                <p className="body-text-sm leading-relaxed mb-2">{preamble}</p>
              )}
              <ul className="space-y-3.5">
                {items.map((item, idx) => {
                  const cleanedItem = item.replace(/^(?:[-*+•—–·◦⁃]|\d+[\.\)])\s*/, '').trim();
                  return (
                    <li key={idx} className="body-text-sm flex items-start gap-3.5 leading-relaxed">
                      <div 
                        className="w-4 h-4 mt-[5px] shrink-0 flex items-center justify-center"
                        style={{ color: theme?.hex || 'var(--accent)' }}
                      >
                        <CheckCircle2 size={15} />
                      </div>
                      <span className="flex-1 min-w-0">{cleanedItem}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function KeyActors({ actors, theme }: { actors: string[], theme?: ActionTheme }) {
  if (!actors || actors.length === 0) return null;
  return (
    <div className="mt-8 p-6 bg-paper border border-line rounded-none">
      <h4 className="text-[12px] font-bold text-ink-muted uppercase tracking-widest mb-3.5">
        Key Actors
      </h4>
      <div className="flex flex-wrap gap-2">
        {actors.map((actor, idx) => (
          <span 
            key={idx} 
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-surface border border-line text-[12.5px] font-medium text-ink shadow-2xs rounded-none transition-colors"
            onMouseEnter={(e) => {
              if (theme) e.currentTarget.style.borderColor = theme.borderMedium;
            }}
            onMouseLeave={(e) => {
              if (theme) e.currentTarget.style.borderColor = '';
            }}
          >
            <span 
              className="w-1.5 h-1.5 rounded-none shrink-0" 
              style={{ backgroundColor: theme?.hex || 'var(--accent, #008080)' }}
            />
            {actor}
          </span>
        ))}
      </div>
    </div>
  );
}

function ExpandableText({ title, content, theme }: { title: string, content: string, theme?: ActionTheme }) {
  const [expanded, setExpanded] = useState(false);
  const THRESHOLD = 220;
  const isLong = Boolean(content && content.length > THRESHOLD);
  
  if (!content) return null;

  const getTruncatedSnippet = (str: string, maxLen: number) => {
    const sub = str.slice(0, maxLen);
    const lastSpace = sub.lastIndexOf(' ');
    const cut = (lastSpace > 80 ? sub.slice(0, lastSpace) : sub).trim();
    return cut.replace(/[,;:.!?\-—]+$/, '');
  };

  const accentColor = theme?.hex || 'var(--accent, #008080)';

  return (
    <div className="flex flex-col h-full">
      {title && <h4 className="text-[12px] font-bold text-ink-muted uppercase tracking-widest mb-3">{title}</h4>}
      <div className="body-text-sm leading-relaxed">
        {!isLong ? (
          <p>{content}</p>
        ) : !expanded ? (
          <p>
            <span>{getTruncatedSnippet(content, THRESHOLD)}...</span>
            <button 
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex items-center justify-center ml-1.5 p-1 rounded-none align-middle transition-colors cursor-pointer focus:outline-none"
              style={{ color: accentColor }}
              title="Expand text"
              aria-label="Expand text"
            >
              <ChevronDown size={14} className="stroke-[2.5]" />
            </button>
          </p>
        ) : (
          <p>
            <span>{content}</span>
            <button 
              type="button"
              onClick={() => setExpanded(false)}
              className="inline-flex items-center justify-center ml-1.5 p-1 rounded-none align-middle transition-colors cursor-pointer focus:outline-none"
              style={{ color: accentColor }}
              title="Collapse text"
              aria-label="Collapse text"
            >
              <ChevronUp size={14} className="stroke-[2.5]" />
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

function renderFormattedInline(inlineStr: string): React.ReactNode {
  if (!inlineStr || typeof inlineStr !== 'string') return null;

  // Replace internal Airtable link markdown [Text](https://airtable.com/...) with just Text
  const sanitized = inlineStr.replace(/\[([^\]]+)\]\(https:\/\/airtable\.com[^)]*\)/g, '$1');

  // Tokenize markdown links: [Text](url) and bold **bold**
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIdx = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(sanitized)) !== null) {
    if (match.index > lastIdx) {
      const textChunk = sanitized.substring(lastIdx, match.index);
      parts.push(...renderBoldItalic(textChunk, `text-${lastIdx}`));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a 
        key={`link-${match.index}`} 
        href={linkUrl} 
        target="_blank" 
        rel="noreferrer"
        className="text-accent underline underline-offset-3 hover:text-ink font-medium transition-colors inline-flex items-center gap-0.5"
      >
        {linkText}
        <ArrowUpRight size={13} className="inline ml-0.5 opacity-80 shrink-0" />
      </a>
    );
    lastIdx = linkRegex.lastIndex;
    if (match.index === linkRegex.lastIndex) {
      linkRegex.lastIndex++;
    }
  }

  if (lastIdx < sanitized.length) {
    parts.push(...renderBoldItalic(sanitized.substring(lastIdx), `text-${lastIdx}`));
  }

  return parts;
}

function renderBoldItalic(text: string, keyPrefix: string): React.ReactNode[] {
  // Simple bold parser for **text**
  const boldParts = text.split(/\*\*([^*]+)\*\*/g);
  if (boldParts.length === 1) return [text];

  return boldParts.map((chunk, i) => {
    if (i % 2 === 1) {
      return <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-ink">{chunk}</strong>;
    }
    return chunk;
  });
}

function RichTextRenderer({ text, textClass }: { text: string, textClass: string }) {
  if (!text) return null;

  // Clean raw text from internal Airtable URL artifacts and non-breaking spaces
  const cleaned = text
    .replace(/\[([^\]]+)\]\(https:\/\/airtable\.com[^)]*\)/g, '$1')
    .replace(/\u00A0/g, ' ')
    .trim();

  const rawLines = cleaned.split(/\r?\n/);
  
  type Block = { type: 'paragraph'; content: string } | { type: 'list'; items: string[] };
  const blocks: Block[] = [];
  let currentList: string[] | null = null;

  rawLines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (currentList) {
        blocks.push({ type: 'list', items: currentList });
        currentList = null;
      }
      return;
    }

    const bulletMatch = trimmed.match(/^(?:[-*+•—–·◦⁃]|\d+[\.\)])\s*(.*)/);
    if (bulletMatch) {
      if (!currentList) currentList = [];
      const itemContent = bulletMatch[1].replace(/^(?:[-*+•—–·◦⁃]|\d+[\.\)])\s*/, '').trim();
      currentList.push(itemContent);
    } else {
      if (currentList) {
        blocks.push({ type: 'list', items: currentList });
        currentList = null;
      }
      blocks.push({ type: 'paragraph', content: trimmed });
    }
  });

  if (currentList) {
    blocks.push({ type: 'list', items: currentList });
  }

  return (
    <div className="space-y-4">
      {blocks.map((block, bIdx) => {
        if (block.type === 'list') {
          return (
            <div key={bIdx} className="my-3 space-y-3 pl-0.5">
              {block.items.map((item, iIdx) => (
                <div key={iIdx} className="flex items-start gap-3">
                  <div className="w-4 h-4 mt-[5px] shrink-0 flex items-center justify-center text-accent">
                    <CheckCircle2 size={15} />
                  </div>
                  <div className={`flex-1 ${textClass} text-ink/90`}>
                    {renderFormattedInline(item)}
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return (
          <p key={bIdx} className={`${textClass}`}>
            {renderFormattedInline(block.content)}
          </p>
        );
      })}
    </div>
  );
}

function ExpandableBox({ title, content, link, theme }: { title: string, content: string, link?: string, theme?: ActionTheme }) {
  const [expanded, setExpanded] = useState(false);
  if (!content) return null;
  
  const accentColor = theme?.hex || '#3B877E';
  const bgColor = theme?.bgSubtle || '#EEF5F3';
  const borderColor = theme?.borderSubtle || 'rgba(59, 135, 126, 0.2)';
  
  return (
    <div 
      className="text-ink p-6 border shadow-2xs rounded-none"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        borderLeftWidth: 4,
        borderLeftColor: accentColor
      }}
    >
      <div 
        className="flex items-start justify-between cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <h6 
          className="font-heading text-[17px] font-semibold flex items-center gap-3 pr-4 transition-colors"
          style={{ color: theme?.darkHex || accentColor }}
        >
          <Lightbulb size={20} style={{ color: accentColor }} className="shrink-0" />
          {title}
        </h6>
        <div 
          className={`shrink-0 rounded-none transition-transform duration-300 mt-0.5 ${expanded ? 'rotate-180' : ''}`}
          style={{ color: accentColor }}
        >
          <ChevronDown size={18} />
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-5 border-t border-line mt-5">
              <div className="mb-4">
                <RichTextRenderer text={content} textClass="body-text-sm leading-[1.8]" />
              </div>
              {link && (
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-paper border text-[12px] font-bold uppercase tracking-wider hover:text-white transition-colors shadow-2xs rounded-none"
                  style={{
                    borderColor: borderColor,
                    color: accentColor
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = accentColor;
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '';
                    e.currentTarget.style.color = accentColor;
                  }}
                >
                  Learn More
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConceptBoxCard({ box, theme }: { box: any, theme?: ActionTheme }) {
  const [expanded, setExpanded] = useState(false);
  if (!box) return null;

  const contentText = box.fullText || box.excerpt || box.content || '';
  const accentColor = theme?.hex || '#3B877E';
  const bgColor = theme?.bgSubtle || '#EEF5F3';
  const borderColor = theme?.borderSubtle || 'rgba(59, 135, 126, 0.25)';

  return (
    <div 
      className="w-full bg-paper border shadow-2xs rounded-none p-6 md:p-7 transition-all my-3"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start justify-between gap-3 text-left focus:outline-none group cursor-pointer"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Lightbulb size={22} style={{ color: accentColor }} className="shrink-0 transition-transform group-hover:scale-110" />
          <h4 
            className="font-heading font-semibold text-[17px] md:text-[18px] leading-snug"
            style={{ color: theme?.darkHex || accentColor }}
          >
            {box.title}
          </h4>
        </div>
        <div 
          className={`p-1.5 rounded-none transition-all shrink-0 ${expanded ? 'rotate-180' : ''}`}
          style={{ color: accentColor }}
        >
          <ChevronDown size={18} />
        </div>
      </button>

      <AnimatePresence>
        {expanded && contentText && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-5 mt-4 border-t border-line space-y-4">
              <RichTextRenderer text={contentText} textClass="body-text-sm leading-[1.8]" />
              
              {box.link && (
                <div className="pt-2">
                  <a
                    href={box.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-paper border text-[12px] font-bold uppercase tracking-wider hover:text-white transition-colors shadow-2xs rounded-none"
                    style={{
                      borderColor: borderColor,
                      color: accentColor
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = accentColor;
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '';
                      e.currentTarget.style.color = accentColor;
                    }}
                  >
                    Learn More & Resources
                    <ExternalLink size={13} />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SmartClampedText({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const THRESHOLD = 210;
  const isLong = Boolean(text && text.length > THRESHOLD);

  if (!text) return null;

  if (!isLong) {
    return (
      <p className="body-text-sm leading-[1.7]">
        {text}
      </p>
    );
  }

  // Find a natural word boundary near THRESHOLD
  const getTruncatedSnippet = (str: string, maxLen: number) => {
    const sub = str.slice(0, maxLen);
    const lastSpace = sub.lastIndexOf(' ');
    const cut = (lastSpace > 80 ? sub.slice(0, lastSpace) : sub).trim();
    return cut.replace(/[,;:.!?\-—]+$/, '');
  };

  const truncated = getTruncatedSnippet(text, THRESHOLD);

  return (
    <p className="body-text-sm leading-[1.7] transition-all">
      {!isExpanded ? (
        <>
          <span>{truncated}...</span>
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="inline-flex items-center justify-center ml-1.5 p-0.5 rounded text-accent/75 hover:text-accent hover:bg-accent/10 align-middle transition-colors cursor-pointer focus:outline-none"
            title="Expand guidance"
            aria-label="Expand guidance"
          >
            <ChevronDown size={14} className="stroke-[2.5]" />
          </button>
        </>
      ) : (
        <>
          <span>{text}</span>
          <button
            type="button"
            onClick={() => setIsExpanded(false)}
            className="inline-flex items-center justify-center ml-1.5 p-0.5 rounded text-accent/75 hover:text-accent hover:bg-accent/10 align-middle transition-colors cursor-pointer focus:outline-none"
            title="Collapse guidance"
            aria-label="Collapse guidance"
          >
            <ChevronUp size={14} className="stroke-[2.5]" />
          </button>
        </>
      )}
    </p>
  );
}

function getCleanStep(title?: string, content?: string) {
  const t = (title || '').trim();
  const c = (content || '').trim();

  if (!c) return { text: t };
  if (!t) return { text: c };

  const normalize = (s: string) => s.trim().replace(/\s+/g, ' ').replace(/[.\s]+$/, '').toLowerCase();
  const normT = normalize(t);
  const normC = normalize(c);

  // Exact or casing/whitespace match
  if (normT === normC) {
    return { text: c.length >= t.length ? c : t };
  }

  // Truncated title or prefix match
  if (t.endsWith('...') || normC.startsWith(normT.replace(/\.{3}$/, ''))) {
    return { text: c };
  }

  // Content starts with or contains title
  if (normC.startsWith(normT) || normC.includes(normT)) {
    return { text: c };
  }

  // Title contains content
  if (normT.includes(normC)) {
    return { text: t };
  }

  // If title and content are distinct, combine into a single uniform continuous format (no separate bold titles)
  const cleanTitle = t.replace(/[:.]\s*$/, '');
  return { text: `${cleanTitle}: ${c}` };
}

function GuidanceList({ items, theme }: { items: any[], theme?: ActionTheme }) {
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const firstItem = items[0] || {};
  const firstClean = getCleanStep(
    typeof firstItem === 'string' ? firstItem : firstItem.title, 
    typeof firstItem === 'string' ? firstItem : firstItem.content
  );
  const isPreamble = items.length > 1 && (
    firstClean.text.toLowerCase().includes('following') ||
    firstClean.text.toLowerCase().includes('iterative') ||
    firstClean.text.toLowerCase().includes('process that') ||
    firstClean.text.length < 120
  );

  const preambleText = isPreamble ? firstClean.text : null;
  const stepItems = isPreamble ? items.slice(1) : items;

  const callouts: any[] = [];
  const cleanPoints = stepItems.map(p => {
    if (!p) return null;
    if (typeof p === 'string') return { title: '', content: p };
    if (p.callout) {
      callouts.push(p.callout);
      const { callout, ...rest } = p;
      return rest;
    }
    return p;
  }).filter(Boolean) as any[];

  return (
    <div className="space-y-6">
      {preambleText && (
        <p className="body-text-sm leading-relaxed pb-1">
          {preambleText}
        </p>
      )}
      
      <div className="space-y-4">
        {cleanPoints.map((item, idx) => {
          const { text } = getCleanStep(item.title, item.content);
          if (!text) return null;

          return (
            <div 
              key={idx} 
              className="flex gap-4 items-start p-4 md:p-5 rounded-none bg-paper border border-line/80 transition-colors shadow-2xs group"
              onMouseEnter={(e) => {
                if (theme) e.currentTarget.style.borderColor = theme.borderMedium;
              }}
              onMouseLeave={(e) => {
                if (theme) e.currentTarget.style.borderColor = '';
              }}
            >
              <div 
                className="flex items-center justify-center w-7 h-7 shrink-0 rounded-none text-[12px] font-bold mt-0.5"
                style={theme ? {
                  backgroundColor: theme.bgLight,
                  borderColor: theme.borderSubtle,
                  borderWidth: 1,
                  color: theme.darkHex
                } : {}}
              >
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <SmartClampedText text={text} />
              </div>
            </div>
          );
        })}
      </div>

      {callouts.length > 0 && (
        <div className="mt-10 space-y-4 pt-6 border-t border-line">
          {callouts.map((c, i) => (
            <ExpandableBox key={i} title={c.title} content={c.content} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
}

function PathwayCard({ 
  pathway, 
  onSelectExample,
  initialTab = 'overview',
  theme,
  actionId,
  onNavigateToCountry
}: { 
  pathway: any; 
  onSelectExample: (ex: any) => void;
  initialTab?: 'overview' | 'guidance';
  theme?: ActionTheme;
  actionId?: number;
  onNavigateToCountry?: (countryId: string, actionId?: number) => void;
}) {
  const [activeTab, setActiveTab] = useState<'overview' | 'guidance'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, pathway]);

  if (!pathway) return null;

  const isAction5 = Number(actionId) === 5;
  const rawExamples = pathway.illustrativeExamples || [];
  const displayExamples = isAction5 ? enhanceAction5Examples(pathway.title, rawExamples) : rawExamples;

  const exampleConceptBoxes = (pathway.conceptBoxes || []).filter((b: any) => 
    !b.section || b.section.toLowerCase().includes('example') || b.section.toLowerCase().includes('illustrative')
  );

  const guidanceConceptBoxes = (pathway.conceptBoxes || []).filter((b: any) => 
    b.section && (b.section.toLowerCase().includes('guidance') || b.section.toLowerCase().includes('implementation'))
  );

  const overviewConceptBoxes = (pathway.conceptBoxes || []).filter((b: any) => 
    b.section && b.section.toLowerCase().includes('overview')
  );

  const resources = pathway.resources || [];

  const renderResourceCard = (example: any, i: number) => {
    const isTool = String(example.type || '').toLowerCase().includes('tool') ||
      /tool|toolkit|calculator|matrix|framework|simulator|portal|index|model|guide/i.test(example.title || '');
    const connInfo = getAction5Connection(example.title, example.type);
    const directConn = example.connectionLine || (connInfo ? `${connInfo.prefix} ${connInfo.text}` : '');
    
    let connPrefix = isTool ? 'When to use this:' : 'Why see this:';
    let connBody = '';
    if (directConn) {
      if (directConn.startsWith('When to use this:')) {
        connPrefix = 'When to use this:';
        connBody = directConn.replace(/^When to use this:\s*/i, '');
      } else if (directConn.startsWith('Why see this:')) {
        connPrefix = 'Why see this:';
        connBody = directConn.replace(/^Why see this:\s*/i, '');
      } else {
        connBody = directConn;
      }
    } else {
      // Fallback lorem ipsum placeholder on frontend as requested
      connPrefix = isTool ? 'When to use this:' : 'Why see this:';
      connBody = isTool 
        ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
        : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';
    }
    const finalConnLine = `${connPrefix} ${connBody}`;

    return (
      <button 
        key={i}
        type="button"
        onClick={() => onSelectExample({
          ...example,
          connectionLine: finalConnLine,
          isTool
        })}
        className="group p-4 sm:p-5 bg-paper border border-line text-left hover:shadow-sm transition-all duration-200 h-full flex flex-col focus:outline-none relative overflow-hidden rounded-none cursor-pointer"
        onMouseEnter={(e) => {
          if (theme) {
            e.currentTarget.style.borderColor = theme.borderMedium;
            e.currentTarget.style.backgroundColor = theme.bgSubtle;
          }
        }}
        onMouseLeave={(e) => {
          if (theme) {
            e.currentTarget.style.borderColor = '';
            e.currentTarget.style.backgroundColor = '';
          }
        }}
      >
        <div 
          className="absolute top-0 left-0 w-1 h-full scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-200"
          style={{ backgroundColor: theme ? theme.hex : undefined }}
        />
        
        {/* Tag Badge: Tool vs Illustrative Example (Both have identical theme colors) */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span 
            className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-none"
            style={{
              backgroundColor: theme ? theme.bgMedium : '#E8F3F1',
              color: theme ? theme.darkHex : '#1F4E48'
            }}
          >
            {isTool ? 'Tool' : (example.type || 'Illustrative Example')}
          </span>

          <div 
            className="p-1 bg-surface border border-line text-ink-muted rounded-none transition-colors shrink-0 shadow-2xs group-hover:border-accent/40"
            style={theme ? { color: theme.hex } : {}}
          >
            <ChevronRight size={12} />
          </div>
        </div>

        <h5 
          className="font-heading font-medium text-[14.5px] sm:text-[15px] text-ink transition-colors leading-snug mb-1.5"
          onMouseEnter={(e) => {
            if (theme) e.currentTarget.style.color = theme.darkHex;
          }}
          onMouseLeave={(e) => {
            if (theme) e.currentTarget.style.color = '';
          }}
        >
          {example.title}
        </h5>

        {/* Connection Line: identical vertical border color for both "Why see this:" and "When to use this:" */}
        <div 
          className="text-[11.5px] leading-snug my-1.5 py-1 px-2.5 bg-surface border-l-2 text-ink"
          style={{ borderLeftColor: theme ? theme.hex : '#3B877E' }}
        >
          <span className="font-semibold text-ink">
            {connPrefix}{' '}
          </span>
          <span className="text-ink-muted">
            {connBody}
          </span>
        </div>

        <p className="text-ink-muted text-[12px] sm:text-[12.5px] leading-relaxed font-light line-clamp-2 mt-auto pt-1">
          {example.excerpt}
        </p>

        {example.subExamples && example.subExamples.length > 0 && (
          <div className="mt-2 pt-1.5 border-t border-line/60 flex items-center gap-1.5 text-[10.5px] font-medium text-ink-muted">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme?.hex || '#3B877E' }} />
            <span>Includes {example.subExamples.length} {example.subExamples.length === 1 ? 'case study' : 'case studies'}</span>
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="bg-surface border border-line shadow-sm relative overflow-hidden flex flex-col rounded-none">
      {/* Decorative Accent Line */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: theme ? theme.hex : undefined }}
      />

      <div className="p-6 md:p-8 bg-paper border-b border-line shrink-0">
        <h3 className="font-heading font-medium text-2xl md:text-3xl text-ink">
          {pathway.title || pathway.name}
        </h3>
      </div>

      {/* Tabs Navigation: Just Two Tabs */}
      <div className="flex border-b border-line bg-paper overflow-x-auto hide-scrollbar shrink-0">
        <button 
          type="button"
          onClick={() => setActiveTab('overview')}
          style={activeTab === 'overview' && theme ? {
            color: theme.darkHex,
            borderBottom: `2px solid ${theme.hex}`,
            backgroundColor: theme.bgLight,
          } : {}}
          className={`flex-1 py-3.5 px-6 text-[13px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors focus:outline-none cursor-pointer rounded-none
            ${activeTab === 'overview' ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-ink-muted hover:text-ink hover:bg-surface'}`}
        >
          Overview
        </button>
        <button 
          type="button"
          onClick={() => setActiveTab('guidance')}
          style={activeTab === 'guidance' && theme ? {
            color: theme.darkHex,
            borderBottom: `2px solid ${theme.hex}`,
            backgroundColor: theme.bgLight,
          } : {}}
          className={`flex-1 py-3.5 px-6 text-[13px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors focus:outline-none cursor-pointer rounded-none
            ${activeTab === 'guidance' ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-ink-muted hover:text-ink hover:bg-surface'}`}
        >
          Implementation Guidance
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 md:p-8 min-h-[350px]">
        <AnimatePresence mode="wait">
          
          {/* 1. Overview Tab */}
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pathway.whatItIs && (
                  <ExpandableText title="What it is" content={pathway.whatItIs} theme={theme} />
                )}
                {pathway.whyItIsNeeded && (
                  <ExpandableText title="Why it is needed" content={pathway.whyItIsNeeded} theme={theme} />
                )}
                {!pathway.whatItIs && pathway.overview && (
                  <ExpandableText title="Overview" content={pathway.overview} theme={theme} />
                )}
              </div>

              {pathway.keyActors && pathway.keyActors.length > 0 && (
                <KeyActors actors={pathway.keyActors} theme={theme} />
              )}

              {overviewConceptBoxes.length > 0 && (
                <div className="pt-6 border-t border-line space-y-4">
                  {overviewConceptBoxes.map((box: any, i: number) => (
                    <ConceptBoxCard key={i} box={box} theme={theme} />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* 2. Implementation Guidance Tab */}
          {activeTab === 'guidance' && (
            <motion.div
              key="guidance"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Guidance points */}
              {pathway.implementationGuidance && pathway.implementationGuidance.length > 0 && (
                <div>
                  <GuidanceList items={pathway.implementationGuidance} theme={theme} />
                </div>
              )}

              {/* Guidance concept boxes */}
              {guidanceConceptBoxes.length > 0 && (
                <div className="pt-4 border-t border-line space-y-3">
                  {guidanceConceptBoxes.map((box: any, i: number) => (
                    <ConceptBoxCard key={i} box={box} theme={theme} />
                  ))}
                </div>
              )}

              {/* Key Resources Section: Tightly packed compact cards */}
              {displayExamples && displayExamples.length > 0 && (
                <div className="pt-6 border-t border-line space-y-4">
                  <div className="flex items-center gap-2.5">
                    <h4 className="font-heading font-medium text-lg md:text-xl text-ink">
                      Key Resources
                    </h4>
                    <span 
                      className="px-2 py-0.5 text-[11px] font-bold rounded-none"
                      style={{ backgroundColor: theme?.bgMedium, color: theme?.darkHex }}
                    >
                      {displayExamples.length}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                    {displayExamples.map((example: any, i: number) => renderResourceCard(example, i))}
                  </div>

                  {exampleConceptBoxes.length > 0 && (
                    <div className="pt-4 border-t border-line space-y-3">
                      {exampleConceptBoxes.map((box: any, i: number) => (
                        <ConceptBoxCard key={i} box={box} theme={theme} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Transferability Considerations & Enabling Conditions (kept collapsed by default) */}
              {((pathway.transferability && pathway.transferability.length > 0) || 
                (pathway.enablingConditions && pathway.enablingConditions.length > 0)) && (
                <div className="pt-6 border-t border-line space-y-3">
                  {pathway.transferability && pathway.transferability.length > 0 && (
                    <CollapsibleList 
                      title={pathway.transferabilityTitle || "Transferability Considerations"} 
                      items={pathway.transferability} 
                      preamble={pathway.transferabilityPreamble}
                      theme={theme} 
                      defaultOpen={false} 
                    />
                  )}
                  {pathway.enablingConditions && pathway.enablingConditions.length > 0 && (
                    <CollapsibleList title="Enabling Conditions" items={pathway.enablingConditions} theme={theme} defaultOpen={false} />
                  )}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Dynamic Additional Resources Footer */}
      <div className="p-6 md:px-8 border-t border-line bg-surface/40 mt-auto shrink-0">
        <h4 className="text-[11px] font-bold text-ink-muted uppercase tracking-wider mb-4">
          Additional Resources
        </h4>
        
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {resources.map((res: any, idx: number) => (
              <a 
                key={idx}
                href={res.link || '#'} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-paper border border-line hover:shadow-2xs transition-all group rounded-none focus:outline-none"
                onMouseEnter={(e) => {
                  if (theme) {
                    e.currentTarget.style.borderColor = theme.borderMedium;
                    e.currentTarget.style.backgroundColor = theme.bgSubtle;
                  }
                }}
                onMouseLeave={(e) => {
                  if (theme) {
                    e.currentTarget.style.borderColor = '';
                    e.currentTarget.style.backgroundColor = '';
                  }
                }}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {res.type && (
                      <span 
                        className="text-[9.5px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-none"
                        style={{
                          backgroundColor: theme ? theme.bgLight : 'rgba(0,128,128,0.1)',
                          color: theme ? theme.darkHex : 'var(--accent)'
                        }}
                      >
                        {res.type}
                      </span>
                    )}
                    {res.publisher && (
                      <span className="text-[11px] font-medium text-ink-muted truncate">
                        {res.publisher}
                      </span>
                    )}
                  </div>
                  <h5 
                    className="text-[13px] font-medium text-ink transition-colors leading-snug truncate mt-1"
                    onMouseEnter={(e) => {
                      if (theme) e.currentTarget.style.color = theme.darkHex;
                    }}
                    onMouseLeave={(e) => {
                      if (theme) e.currentTarget.style.color = '';
                    }}
                  >
                    {res.title}
                  </h5>
                </div>
                <ArrowUpRight 
                  size={14} 
                  className="text-ink-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" 
                  style={{ color: theme ? theme.hex : undefined }}
                />
              </a>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <a 
              href="https://www.climatefinancelab.org" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-between p-3 bg-paper border border-line hover:shadow-2xs transition-all group rounded-none focus:outline-none"
              onMouseEnter={(e) => {
                if (theme) {
                  e.currentTarget.style.borderColor = theme.borderMedium;
                  e.currentTarget.style.backgroundColor = theme.bgSubtle;
                }
              }}
              onMouseLeave={(e) => {
                if (theme) {
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.backgroundColor = '';
                }
              }}
            >
              <div className="min-w-0 flex-1">
                <span 
                  className="text-[9.5px] font-bold uppercase tracking-wider block"
                  style={{ color: theme ? theme.darkHex : 'var(--accent)' }}
                >
                  Framework
                </span>
                <span 
                  className="text-[13px] font-medium text-ink transition-colors truncate block mt-0.5"
                  onMouseEnter={(e) => {
                    if (theme) e.currentTarget.style.color = theme.darkHex;
                  }}
                  onMouseLeave={(e) => {
                    if (theme) e.currentTarget.style.color = '';
                  }}
                >
                  CCFLA Multilevel Climate Governance Library
                </span>
              </div>
              <ArrowUpRight 
                size={14} 
                className="text-ink-muted group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-1" 
                style={{ color: theme ? theme.hex : undefined }}
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

const ACTION_CHAMP_ALIGNMENT: Record<number, { label: string; componentId: string; description: string }> = {
  1: { 
    label: "Supports CHAMP Roadmap 3.1", 
    componentId: "3.1", 
    description: "Integrate subnational priorities into national climate finance strategies and investment plans" 
  },
  2: { 
    label: "Supports CHAMP Roadmap 3.3", 
    componentId: "3.3", 
    description: "Advocate for reform of finance institutions and climate funds" 
  },
  3: { 
    label: "Supports CHAMP Roadmap 3.1", 
    componentId: "3.1", 
    description: "Integrate subnational priorities into national climate finance strategies and investment plans" 
  },
  4: { 
    label: "Supports CHAMP Roadmap 3.1 & 3.2", 
    componentId: "3.1, 3.2", 
    description: "Integrate subnational priorities (3.1) & Coordinated project preparation (3.2)" 
  },
  5: { 
    label: "Supports CHAMP Roadmap 3.3", 
    componentId: "3.3", 
    description: "Advocate for reform of finance institutions and climate funds" 
  },
  6: { 
    label: "Supports CHAMP Roadmap 3.3", 
    componentId: "3.3", 
    description: "Advocate for reform of finance institutions and climate funds" 
  },
};

export function StepView({ 
  step, 
  onBack, 
  onNext, 
  onPrev, 
  isFirst, 
  isLast,
  initialDeepLink,
  onClearDeepLink,
  onNavigateToCountry,
  onOpenRoadmap
}: { 
  step: any; 
  onBack?: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  initialDeepLink?: any;
  onClearDeepLink?: () => void;
  onNavigateToCountry?: (countryId: string, actionId?: number) => void;
  onOpenRoadmap?: (componentId?: string) => void;
}) {
  const [isSystemsLogicOpen, setIsSystemsLogicOpen] = useState(false);
  const [activePathwayIndex, setActivePathwayIndex] = useState(0);
  const [selectedExample, setSelectedExample] = useState<any | null>(null);
  const [pathwayTab, setPathwayTab] = useState<'overview' | 'guidance'>('overview');

  const actionTheme = getActionTheme(step?.id);

  // Consume and initialize deep-link target exactly once
  useEffect(() => {
    if (initialDeepLink) {
      setActivePathwayIndex(initialDeepLink.pathwayIndex || 0);
      if (initialDeepLink.example) {
        setPathwayTab('guidance');
        setSelectedExample(initialDeepLink.example);
      } else {
        setPathwayTab('overview');
        setSelectedExample(null);
      }
      onClearDeepLink?.();
    }
  }, [initialDeepLink, onClearDeepLink]);

  // Reset pathway view when step ID changes
  useEffect(() => {
    if (!initialDeepLink) {
      setActivePathwayIndex(0);
      setPathwayTab('overview');
      setSelectedExample(null);
      setIsSystemsLogicOpen(false);
    }
  }, [step?.id]);

  const handleCloseModal = () => {
    setSelectedExample(null);
    onClearDeepLink?.();
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedExample) {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedExample]);

  if (!step) return null;

  const hasLogic = Boolean(step.systemsLogic);
  const pathways = step.pathways || [];

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Header Navigation */}
      <div className="mb-10">
        <button 
          onClick={onPrev}
          className="inline-flex items-center text-sm font-medium text-ink-muted hover:text-ink transition-colors mb-8 group focus:outline-none cursor-pointer"
        >
          <ChevronRight size={16} className="rotate-180 mr-1 transition-transform group-hover:-translate-x-1" />
          {isFirst ? 'Back to Overview' : 'Previous Action'}
        </button>
        
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <span 
            className="font-bold tracking-[0.15em] uppercase text-xs px-3 py-1 rounded-none"
            style={{
              backgroundColor: actionTheme.bgLight,
              borderColor: actionTheme.borderSubtle,
              borderWidth: 1,
              color: actionTheme.darkHex
            }}
          >
            Action {step.id}
          </span>

          {(() => {
            const alignment = ACTION_CHAMP_ALIGNMENT[Number(step.id)];
            if (!alignment) return null;
            return (
              <button
                type="button"
                onClick={() => onOpenRoadmap?.(alignment.componentId)}
                title={`${alignment.label} • ${alignment.description} (Click to open CHAMP Implementation Roadmap)`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 border transition-all rounded-none cursor-pointer group shadow-2xs hover:shadow-xs"
                style={{
                  backgroundColor: 'var(--color-surface, #FFFFFF)',
                  borderColor: 'var(--color-line, #E2E8F0)',
                  color: 'var(--color-ink-muted, #475569)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = actionTheme.borderMedium;
                  e.currentTarget.style.color = actionTheme.darkHex;
                  e.currentTarget.style.backgroundColor = actionTheme.bgLight;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-line, #E2E8F0)';
                  e.currentTarget.style.color = 'var(--color-ink-muted, #475569)';
                  e.currentTarget.style.backgroundColor = 'var(--color-surface, #FFFFFF)';
                }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-none shrink-0"
                  style={{ backgroundColor: actionTheme.hex }}
                />
                <span>{alignment.label}</span>
                <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            );
          })()}
        </div>
        
        <h1 className="title-h1 mb-6">{step.title}</h1>

        {step.description && (
          <p className="body-text leading-relaxed">{step.description}</p>
        )}
      </div>

      {/* Main Section: Implementation Pathways */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="title-h2">
              Implementation Pathways
            </h2>
            <p className="body-text-sm mt-1">
              Select a pathway to view detailed overview, key resources, and implementation guidance.
            </p>
          </div>
        </div>

        {/* Pathway Selector Grid */}
        {pathways.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {pathways.map((p: any, idx: number) => {
              const isSelected = activePathwayIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActivePathwayIndex(idx);
                    setPathwayTab('overview');
                  }}
                  style={isSelected ? {
                    borderColor: actionTheme.hex,
                    backgroundColor: actionTheme.bgSubtle,
                    boxShadow: `0 0 0 1px ${actionTheme.borderSubtle}`
                  } : {}}
                  className={`text-left p-5 border transition-all duration-200 rounded-none flex flex-col justify-between focus:outline-none group cursor-pointer ${
                    isSelected
                      ? 'shadow-xs'
                      : 'border-line bg-surface hover:bg-paper hover:shadow-xs'
                  }`}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = actionTheme.borderMedium;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '';
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span 
                      className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-none ${isSelected ? 'text-white' : 'bg-line/40 text-ink-muted'}`}
                      style={isSelected ? { backgroundColor: actionTheme.hex } : {}}
                    >
                      Pathway 0{idx + 1}
                    </span>
                  </div>

                  <div>
                    <h4 
                      className={`font-heading text-[15.5px] leading-snug font-medium transition-colors mb-3 ${isSelected ? 'font-semibold' : 'text-ink'}`}
                      style={isSelected ? { color: actionTheme.darkHex } : {}}
                    >
                      {p.title || p.name}
                    </h4>

                    {(() => {
                      const keyCount = p.illustrativeExamples?.length || 0;
                      if (keyCount === 0) return null;

                      return (
                        <div className="pt-2.5 border-t border-line/40 text-[11.5px]">
                          <span className="text-ink-muted font-medium">
                            <span className="font-semibold text-ink">{keyCount}</span> {keyCount === 1 ? 'Key Resource' : 'Key Resources'}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Systems Logic Section */}
        {hasLogic && (
          <div className="mb-8">
            <div 
              className="bg-surface border border-line rounded-none overflow-hidden transition-all duration-200 shadow-2xs group/logic"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = actionTheme.borderMedium;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '';
              }}
            >
              <button
                onClick={() => setIsSystemsLogicOpen(!isSystemsLogicOpen)}
                className="w-full flex items-center justify-between p-4 md:px-6 text-left focus:outline-none cursor-pointer group transition-colors hover:bg-paper/50 rounded-none"
                aria-expanded={isSystemsLogicOpen}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 min-w-0">
                    <span className="font-heading text-[15.5px] font-semibold text-ink transition-colors">
                      Systems Logic
                    </span>
                    <span className="text-[13px] text-ink-muted font-light truncate">
                      How these implementation pathways connect together
                    </span>
                  </div>
                </div>

                <div className="flex items-center shrink-0 ml-4">
                  <div 
                    className={`w-7 h-7 rounded-none bg-paper border border-line flex items-center justify-center text-ink-muted transition-all duration-200 ${isSystemsLogicOpen ? 'rotate-180' : ''}`}
                    style={isSystemsLogicOpen ? {
                      backgroundColor: actionTheme.bgLight,
                      color: actionTheme.hex,
                      borderColor: actionTheme.borderSubtle
                    } : {}}
                  >
                    <ChevronDown size={14} />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isSystemsLogicOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden border-t border-line bg-paper/40"
                  >
                    <div className="p-6 md:p-8">
                      <div 
                        className="border-l-2 pl-5 md:pl-6 py-1"
                        style={{ borderColor: actionTheme.hex }}
                      >
                        <p className="body-text-sm leading-[1.8]">
                          {step.systemsLogic}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Active Pathway Details Card */}
        {pathways.length > 0 && (() => {
          const safeActiveIndex = Math.max(0, Math.min(activePathwayIndex, pathways.length - 1));
          const currentPathway = pathways[safeActiveIndex] || pathways[0];
          if (!currentPathway) return null;

          return (
            <AnimatePresence mode="wait">
              <motion.div
                key={safeActiveIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <PathwayCard 
                  pathway={currentPathway} 
                  onSelectExample={setSelectedExample} 
                  initialTab={pathwayTab}
                  theme={actionTheme}
                  actionId={Number(step.id)}
                  onNavigateToCountry={onNavigateToCountry}
                />
              </motion.div>
            </AnimatePresence>
          );
        })()}
      </div>

      {/* Illustrative Example Modal */}
      <AnimatePresence>
        {selectedExample && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-line shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col rounded-none overflow-hidden"
            >
              {/* Modal Header with subtle top accent line */}
              <div 
                className="w-full h-1"
                style={{ backgroundColor: actionTheme.hex }}
              />
              <div className="p-6 md:px-10 md:py-7 border-b border-line flex items-start justify-between bg-paper shrink-0">
                <div className="flex-1 pr-6">
                  {selectedExample.type && (
                    <div className="mb-2">
                      <span 
                        className="inline-flex items-center px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider rounded-none"
                        style={{
                          backgroundColor: actionTheme.bgMedium,
                          color: actionTheme.darkHex
                        }}
                      >
                        {String(selectedExample.type || '').toLowerCase().includes('tool') ? 'Tool' : selectedExample.type}
                      </span>
                    </div>
                  )}
                  <h3 className="font-heading text-xl md:text-2xl font-semibold text-ink leading-snug">
                    {selectedExample.title}
                  </h3>
                </div>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 bg-surface border border-line hover:bg-line/50 transition-colors shrink-0 rounded-none focus:outline-none cursor-pointer"
                  style={{ color: actionTheme.darkHex }}
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
                {/* Connection Line */}
                {(() => {
                  const connInfo = getAction5Connection(selectedExample.title, selectedExample.type);
                  const fullConn = selectedExample.connectionLine || (connInfo ? `${connInfo.prefix} ${connInfo.text}` : '');
                  const isTool = String(selectedExample.type || '').toLowerCase().includes('tool') || 
                    /tool|toolkit|calculator|matrix|framework|simulator|portal|index|model|guide/i.test(selectedExample.title || '') ||
                    Boolean(selectedExample.isTool);
                  let prefix = isTool ? 'When to use this:' : 'Why see this:';
                  let body = '';
                  if (fullConn) {
                    if (fullConn.startsWith('When to use this:')) {
                      prefix = 'When to use this:';
                      body = fullConn.replace(/^When to use this:\s*/i, '');
                    } else if (fullConn.startsWith('Why see this:')) {
                      prefix = 'Why see this:';
                      body = fullConn.replace(/^Why see this:\s*/i, '');
                    } else {
                      body = fullConn;
                    }
                  } else {
                    prefix = isTool ? 'When to use this:' : 'Why see this:';
                    body = isTool
                      ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
                      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.';
                  }

                  return (
                    <div 
                      className="mb-6 p-4 bg-paper border-l-2 text-ink text-[14px] leading-relaxed shadow-2xs"
                      style={{ borderLeftColor: actionTheme.hex }}
                    >
                      <span className="font-semibold text-ink">
                        {prefix}{' '}
                      </span>
                      <span className="text-ink-muted">
                        {body}
                      </span>
                    </div>
                  );
                })()}

                <div className="mb-6">
                  <RichTextRenderer text={selectedExample.fullText || selectedExample.content || selectedExample.excerpt} textClass="body-text-sm leading-[1.8]" />
                </div>
                {selectedExample.link && (
                  <div className="mb-6">
                    <a 
                      href={selectedExample.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-paper border border-line text-[13px] font-bold uppercase tracking-wider text-ink transition-colors rounded-none"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = actionTheme.hex;
                        e.currentTarget.style.color = actionTheme.darkHex;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '';
                        e.currentTarget.style.color = '';
                      }}
                    >
                      Know More
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}

                {/* Sub-Examples */}
                {selectedExample.subExamples && selectedExample.subExamples.length > 0 && (
                  <div className="mt-8 space-y-4 pt-6 border-t border-line">
                    <h5 className="text-[12px] font-bold text-ink-muted uppercase tracking-widest mb-3">Associated Highlights & Case Notes</h5>
                    {selectedExample.subExamples.map((subEx: any, i: number) => (
                      <ExpandableBox 
                        key={i} 
                        title={subEx.title} 
                        content={subEx.fullText || subEx.excerpt || subEx.content} 
                        link={subEx.link}
                        theme={actionTheme}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Footer */}
      <div className="mt-20 pt-10 border-t border-line flex items-center justify-between">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-paper border border-line font-bold text-[13px] uppercase tracking-wider text-ink hover:bg-surface hover:shadow-sm transition-all focus:outline-none rounded-none cursor-pointer"
        >
          <ChevronRight size={16} className="rotate-180" />
          {isFirst ? 'Overview' : 'Previous Action'}
        </button>

        {!isLast && onNext && (
          <button
            onClick={onNext}
            style={{ backgroundColor: actionTheme.hex }}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-white font-bold text-[13px] uppercase tracking-wider shadow-md hover:brightness-110 hover:shadow-lg transition-all focus:outline-none rounded-none cursor-pointer ml-auto"
          >
            Next Action
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default StepView;

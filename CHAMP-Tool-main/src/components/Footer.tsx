import React from 'react';
import { ExternalLink, Globe, Landmark, Layers, FileText } from 'lucide-react';
import { HomePagePartnership, defaultHomePageContent } from '../services/airtableService';

interface FooterProps {
  partnership?: HomePagePartnership;
  onNavigateHome?: () => void;
  onNavigateToAction?: (actionId: number) => void;
}

function renderFormattedText(text: string) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="text-ink font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Footer({ 
  partnership = defaultHomePageContent.partnership,
  onNavigateHome,
  onNavigateToAction
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-paper border-t border-line text-ink mt-auto">
      {/* Top Joint Contribution & Partner Showcase */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Col 1: Joint Contribution Info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface border border-line text-[11px] font-bold uppercase tracking-wider text-ink-muted rounded-sm">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              Strategic Partnership
            </div>

            <h3 className="font-heading font-bold text-2xl md:text-3xl text-ink leading-tight">
              {partnership.title || "A Joint Contribution to CHAMP"}
            </h3>

            <p className="body-text-sm leading-relaxed max-w-lg">
              {renderFormattedText(
                partnership.description || 
                "This toolkit is a strategic partnership between CCFLA and Viable Cities. A key goal of this toolkit is to showcase impactful multilevel governance initiatives championed in Sweden and globally."
              )}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
              <span className="font-medium text-ink">{partnership.learnMoreLabel || "In partnership with:"}</span>
              <a 
                href={partnership.partner1Url || "https://citiesclimatefinance.org"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline hover:opacity-80 transition-opacity"
              >
                {partnership.partner1Name || "CCFLA"}
                <ExternalLink size={11} />
              </a>
              <span className="text-line">•</span>
              <a 
                href={partnership.partner2Url || "https://viablecities.se"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-accent hover:underline hover:opacity-80 transition-opacity"
              >
                {partnership.partner2Name || "Viable Cities"}
                <ExternalLink size={11} />
              </a>
            </div>
          </div>

          {/* Col 2: Partner & Supported By Logos */}
          <div className="lg:col-span-4 bg-surface p-6 md:p-8 border border-line rounded-lg shadow-2xs space-y-6">
            <h4 className="text-[11px] font-bold text-ink-muted uppercase tracking-widest border-b border-line pb-2.5">
              Partners & Support
            </h4>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-2">
              {partnership.partner1LogoUrl && (
                <a 
                  href={partnership.partner1Url || "https://citiesclimatefinance.org"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center items-center hover:opacity-80 transition-opacity"
                  title={partnership.partner1Name || "Cities Climate Finance Leadership Alliance (CCFLA)"}
                >
                  <img 
                    src={partnership.partner1LogoUrl} 
                    alt={partnership.partner1Name || "CCFLA"} 
                    className="max-h-24 md:max-h-28 w-auto object-contain mix-blend-multiply" 
                    referrerPolicy="no-referrer"
                  />
                </a>
              )}
              
              {partnership.partner1LogoUrl && partnership.partner2LogoUrl && (
                <div className="hidden sm:block w-px h-16 bg-line shrink-0" />
              )}

              {partnership.partner2LogoUrl && (
                <a 
                  href={partnership.partner2Url || "https://viablecities.se"}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex justify-center items-center hover:opacity-80 transition-opacity"
                  title={partnership.partner2Name || "Viable Cities"}
                >
                  <img 
                    src={partnership.partner2LogoUrl} 
                    alt={partnership.partner2Name || "Viable Cities"} 
                    className="max-h-12 md:max-h-14 w-auto object-contain mix-blend-multiply" 
                    referrerPolicy="no-referrer"
                  />
                </a>
              )}
            </div>

            {(partnership.supportedByLogoUrl || partnership.supportedByName) && (
              <div className="pt-4 border-t border-line flex items-center justify-between gap-4">
                <span className="text-ink-muted text-[11px] uppercase tracking-wider font-semibold">
                  {partnership.supportedByLabel || "Supported by"}
                </span>
                <div className="flex items-center gap-2.5">
                  {partnership.supportedByLogoUrl && (
                    <img 
                      src={partnership.supportedByLogoUrl} 
                      alt={partnership.supportedByName || "Sweden"} 
                      className="h-5 w-auto object-contain rounded-xs shadow-2xs" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <span className="text-xs font-semibold text-ink">
                    {partnership.supportedByName || "Sweden"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Col 3: Key Links & Resources */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h4 className="text-[11px] font-bold text-ink-muted uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                <Globe size={13} className="text-accent" />
                Organizations
              </h4>
              <ul className="space-y-2.5 text-[13.5px]">
                <li>
                  <a 
                    href={partnership.partner1Url || "https://citiesclimatefinance.org"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-ink-muted hover:text-ink transition-colors"
                  >
                    <span>{partnership.partner1Name ? `${partnership.partner1Name} (Cities Climate Finance Alliance)` : "Cities Climate Finance Alliance"}</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                  </a>
                </li>
                <li>
                  <a 
                    href={partnership.partner2Url || "https://viablecities.se"} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-ink-muted hover:text-ink transition-colors"
                  >
                    <span>{partnership.partner2Name ? `${partnership.partner2Name} Sweden` : "Viable Cities Sweden"}</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold text-ink-muted uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                <FileText size={13} className="text-accent" />
                Initiatives
              </h4>
              <ul className="space-y-2.5 text-[13.5px]">
                <li>
                  <a 
                    href="https://cop28.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-ink-muted hover:text-ink transition-colors"
                  >
                    <span>CHAMP Coalition</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                  </a>
                </li>
                <li>
                  <a 
                    href="https://viablecities.se/klimatkontrakt-2030" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-ink-muted hover:text-ink transition-colors"
                  >
                    <span>Climate City Contract 2030</span>
                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-accent" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Disclaimer Bar */}
      <div className="border-t border-line bg-surface/80">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>© {currentYear} <strong>{partnership.partner1Name || "CCFLA"}</strong> & <strong>{partnership.partner2Name || "Viable Cities"}</strong>.</span>
            <span className="hidden sm:inline text-line">•</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11.5px]">
            <span>CHAMP Multilevel Governance Toolkit</span>
            <span className="text-line">•</span>
            <button 
              onClick={onNavigateHome}
              className="text-accent hover:underline cursor-pointer"
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

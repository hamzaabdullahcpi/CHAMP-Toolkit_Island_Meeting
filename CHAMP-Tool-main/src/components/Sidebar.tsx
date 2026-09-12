import { motion } from "motion/react";
import { 
  Home, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Compass
} from "lucide-react";
import { useState } from "react";
import { CountryJourneyData } from "../types/countryJourney";
import { defaultCountryJourneys } from "../data/countryJourneysData";

interface SidebarProps {
  currentStep: number | string;
  setCurrentStep: (step: number | string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
  countryJourneys?: CountryJourneyData[];
}

export default function Sidebar({ 
  currentStep, 
  setCurrentStep, 
  isOpen, 
  toggleSidebar,
  countryJourneys = defaultCountryJourneys
}: SidebarProps) {
  const [coreActionsOpen, setCoreActionsOpen] = useState(true);
  const [countryJourneysOpen, setCountryJourneysOpen] = useState(true);

  const navItemsGeneral: { id: number | string, label: string }[] = [
    { id: 0, label: "Home" },
    { id: 'dashboard', label: "Dashboard" },
  ];

  const navItemsCoreActions: { id: number | string, label: string }[] = [
    { id: 1, label: "1. Shared Commitments" },
    { id: 2, label: "2. Enabling Environments" },
    { id: 3, label: "3. Governance and Coordination" },
    { id: 4, label: "4. Investment Planning" },
    { id: 5, label: "5. Finance and Implementation" },
    { id: 6, label: "6. Learning and Scale" },
  ];

  const navItemsCountryJourneys: { id: number | string, label: string }[] = [
    { id: 'journeys', label: "Overview" },
    ...countryJourneys.map(j => ({
      id: j.countryId,
      label: j.countryName
    }))
  ];

  const handleNavClick = (id: number | string) => {
    setCurrentStep(id);
  };

  const renderNavItems = (items: { id: number | string, label: string }[]) => {
    return items.map((item) => {
      const isActive = currentStep === item.id;
      return (
        <button
          key={item.id}
          onClick={() => handleNavClick(item.id)}
          className={`group w-full flex items-center justify-between px-6 py-2.5 text-sm transition-all duration-200 border-l-2 ${
            isActive
              ? "bg-[#E5E7EB] border-[#ED8439] text-ink font-semibold"
              : "border-transparent text-ink-muted hover:bg-[#E5E7EB]/50 hover:border-[#ED8439]/50 hover:text-ink font-medium"
          }`}
        >
          <span className="text-left tracking-tight">{item.label}</span>
        </button>
      );
    });
  };

  return (
    <div 
      className={`w-72 h-screen bg-surface border-r border-line flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0 shadow-2xl md:shadow-lg' : '-translate-x-full shadow-none'
      } overflow-hidden`}
    >
      <div className="p-6 border-b border-line flex justify-between items-center shrink-0">
        <div>
          <h1 className="font-display font-bold text-[28px] text-ink leading-[1.2] tracking-tight">
            CHAMP Toolkit
          </h1>
          <p className="text-[10px] text-[#ED8439] tracking-[0.1em] mt-1">
            FOR NATIONAL GOVERNMENTS, CITIES AND FRIENDS OF CHAMP
          </p>
        </div>
        <button 
          onClick={toggleSidebar}
          className="p-1.5 text-ink-muted hover:text-ink hover:bg-paper transition-colors rounded-sm cursor-pointer"
          aria-label="Close Sidebar"
        >
          <X size={16} className="stroke-[1.5]" />
        </button>
      </div>

      <nav className="flex-1 py-6 flex flex-col overflow-y-auto custom-scrollbar">
        <div className="mb-4">
          {renderNavItems(navItemsGeneral)}
        </div>

        <div className="mb-2">
          <button 
            onClick={() => setCoreActionsOpen(!coreActionsOpen)}
            className="w-full flex items-center justify-between px-6 py-2 text-xs font-bold text-ink-muted uppercase tracking-wider mb-2 hover:text-ink transition-colors cursor-pointer"
          >
            <span>Actions</span>
            {coreActionsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          <motion.div 
            initial={false}
            animate={{ height: coreActionsOpen ? 'auto' : 0, opacity: coreActionsOpen ? 1 : 0 }}
            className="overflow-hidden"
          >
            {renderNavItems(navItemsCoreActions)}
          </motion.div>
        </div>

        <div>
          <button 
            onClick={() => setCountryJourneysOpen(!countryJourneysOpen)}
            className="w-full flex items-center justify-between px-6 py-2 text-xs font-bold text-ink-muted uppercase tracking-wider mb-2 hover:text-ink transition-colors cursor-pointer"
          >
            <span>Country Journeys</span>
            {countryJourneysOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          <motion.div 
            initial={false}
            animate={{ height: countryJourneysOpen ? 'auto' : 0, opacity: countryJourneysOpen ? 1 : 0 }}
            className="overflow-hidden"
          >
            {renderNavItems(navItemsCountryJourneys)}
          </motion.div>
        </div>
      </nav>
    </div>
  );
}

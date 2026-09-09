import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import LandingPage from "./components/LandingPage";
import StepView from "./components/StepView";
import MapDashboard from "./components/MapDashboard";
import CountryJourneysOverview from "./components/CountryJourneysOverview";
import CountryJourney from "./components/CountryJourney";
import ChampRoadmapModal from "./components/ChampRoadmapModal";
import ErrorBoundary from "./components/ErrorBoundary";
import { actionsData, landingPageData } from "./data/content";
import { defaultCountryJourneys } from "./data/countryJourneysData";
import { CountryJourneyData } from "./types/countryJourney";
import { 
  fetchAirtableAllContent, 
  defaultHomePageContent, 
  HomePageContent,
  CountryJourneysOverviewContent,
  defaultCountryJourneysOverviewContent
} from "./services/airtableService";
import { RoadmapPillar, defaultChampRoadmapData } from "./data/champRoadmapData";
import { ChampPledge, defaultChampPledgesData } from "./data/champPledgesData";
import { Menu } from "lucide-react";

export default function App() {
  const [currentStep, setCurrentStep] = useState<number | string>(0);
  const [deepLinkTarget, setDeepLinkTarget] = useState<any>(null);
  const [countryJourneyTarget, setCountryJourneyTarget] = useState<{ countryId: string; actionId?: number } | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isRoadmapOpen, setIsRoadmapOpen] = useState(false);
  const [roadmapComponentId, setRoadmapComponentId] = useState<string | undefined>(undefined);

  const handleOpenRoadmap = (componentId?: string) => {
    setRoadmapComponentId(componentId);
    setIsRoadmapOpen(true);
  };
  const [liveActionsData, setLiveActionsData] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem("champ_actions_cache");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return actionsData;
  });
  const [liveHomePageData, setLiveHomePageData] = useState<HomePageContent>(() => {
    try {
      const saved = localStorage.getItem("champ_home_page_cache");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultHomePageContent;
  });
  const [liveCountryJourneys, setLiveCountryJourneys] = useState<CountryJourneyData[]>(() => {
    try {
      const saved = localStorage.getItem("champ_country_journeys_cache");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultCountryJourneys;
  });
  const [liveCountryJourneysOverview, setLiveCountryJourneysOverview] = useState<CountryJourneysOverviewContent>(() => {
    try {
      const saved = localStorage.getItem("champ_country_journeys_overview_cache");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultCountryJourneysOverviewContent;
  });
  const [liveRoadmapPillars, setLiveRoadmapPillars] = useState<RoadmapPillar[]>(() => {
    try {
      const saved = localStorage.getItem("champ_roadmap_cache");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultChampRoadmapData;
  });
  const [liveChampPledges, setLiveChampPledges] = useState<ChampPledge[]>(() => {
    try {
      const saved = localStorage.getItem("champ_pledges_cache");
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultChampPledgesData;
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let isMounted = true;
    const loadContent = async () => {
      try {
        const { actions, homePage, countryJourneys, countryJourneysOverview, roadmapPillars, champPledges } = await fetchAirtableAllContent();
        if (isMounted) {
          if (actions && actions.length > 0) {
            setLiveActionsData(actions);
            try { localStorage.setItem("champ_actions_cache", JSON.stringify(actions)); } catch (e) {}
          }
          if (homePage) {
            setLiveHomePageData(homePage);
            try { localStorage.setItem("champ_home_page_cache", JSON.stringify(homePage)); } catch (e) {}
          }
          if (countryJourneys) {
            setLiveCountryJourneys(countryJourneys);
            try { localStorage.setItem("champ_country_journeys_cache", JSON.stringify(countryJourneys)); } catch (e) {}
          }
          if (countryJourneysOverview) {
            setLiveCountryJourneysOverview(countryJourneysOverview);
            try { localStorage.setItem("champ_country_journeys_overview_cache", JSON.stringify(countryJourneysOverview)); } catch (e) {}
          }
          if (roadmapPillars && roadmapPillars.length > 0) {
            setLiveRoadmapPillars(roadmapPillars);
            try { localStorage.setItem("champ_roadmap_cache", JSON.stringify(roadmapPillars)); } catch (e) {}
          }
          if (champPledges && champPledges.length > 0) {
            setLiveChampPledges(champPledges);
            try { localStorage.setItem("champ_pledges_cache", JSON.stringify(champPledges)); } catch (e) {}
          }
        }
      } catch (err) {
        console.error("Failed to load content, using local fallback", err);
      } finally {
        if (isMounted) {
          setIsLoadingData(false);
        }
      }
    };
    loadContent();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    // If navigating directly to a targeted action card in a country journey, do not reset scroll to top
    if (countryJourneyTarget) return;
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0 });
  }, [currentStep, countryJourneyTarget]);

  // Check if currentStep matches a country journey
  const matchedCountry = typeof currentStep === 'string' 
    ? liveCountryJourneys.find(c => c.countryId === currentStep.toLowerCase()) 
    : undefined;

  return (
    <div className="min-h-screen bg-paper flex font-sans selection:bg-accent selection:text-surface">
      <Sidebar 
        currentStep={currentStep} 
        setCurrentStep={setCurrentStep} 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        countryJourneys={liveCountryJourneys}
      />
      
      <main 
        ref={mainRef} 
        className={`flex-1 min-h-screen overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? 'ml-0 md:ml-72' : 'ml-0'
        }`}
      >
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-6 left-6 z-50 p-2.5 bg-surface shadow-sm border border-line text-ink hover:text-accent hover:bg-paper transition-colors rounded-none cursor-pointer"
            aria-label="Open Sidebar"
          >
            <Menu size={20} className="stroke-[1.5]" />
          </button>
        )}

        <div className={currentStep === 0 ? "w-full pb-24" : "px-6 md:px-12 lg:px-20 pt-8 pb-24 max-w-7xl mx-auto"}>
          <ErrorBoundary>
            {currentStep === 0 ? (
              <LandingPage 
                onStart={() => setCurrentStep(1)} 
                onIntro={() => setCurrentStep(1)} 
                actionsData={liveActionsData}
                homePageData={liveHomePageData}
                roadmapPillars={liveRoadmapPillars}
                champPledges={liveChampPledges}
                onNavigateToStep={(id, pathwayIdx, example) => {
                    setCurrentStep(id);
                    if (pathwayIdx !== undefined) setDeepLinkTarget({ pathwayIndex: pathwayIdx, example });
                    else setDeepLinkTarget(null);
                  }}
                onOpenRoadmap={handleOpenRoadmap}
              />
            ) : currentStep === 'dashboard' ? (
              <MapDashboard 
                stats={landingPageData.dashboard} 
                onNavigateToStep={(id) => setCurrentStep(id as number)}
              />
            ) : currentStep === 'journeys' ? (
              <CountryJourneysOverview 
                countryJourneys={liveCountryJourneys}
                overviewContent={liveCountryJourneysOverview}
                onSelectCountry={(countryId) => setCurrentStep(countryId)}
                onNavigateToCoreAction={(actionId) => setCurrentStep(actionId)}
              />
            ) : matchedCountry ? (
              <CountryJourney 
                countryData={matchedCountry}
                targetActionId={countryJourneyTarget?.countryId === matchedCountry.countryId ? countryJourneyTarget.actionId : undefined}
                onBackToJourneys={() => {
                  setCountryJourneyTarget(null);
                  setCurrentStep('journeys');
                }}
                onNavigateToCoreAction={(actionId) => {
                  setCountryJourneyTarget(null);
                  setDeepLinkTarget(null);
                  setCurrentStep(actionId);
                }}
              />
            ) : (
              <StepView 
                step={liveActionsData.find(s => Number(s.id) === Number(currentStep)) || liveActionsData[0]} 
                initialDeepLink={deepLinkTarget}
                onClearDeepLink={() => setDeepLinkTarget(null)}
                onNext={typeof currentStep === 'number' && currentStep < 6 ? () => { setDeepLinkTarget(null); setCurrentStep(currentStep + 1); } : undefined}
                onPrev={() => { 
                  setDeepLinkTarget(null); 
                  if (typeof currentStep === 'number') {
                    setCurrentStep(currentStep > 1 ? currentStep - 1 : 0);
                  } else {
                    setCurrentStep(0);
                  }
                }}
                isFirst={currentStep === 1 || Number(currentStep) === 1}
                isLast={currentStep === 6 || Number(currentStep) === 6}
                onNavigateToCountry={(countryId, actionId) => {
                  setCountryJourneyTarget({ countryId, actionId: actionId ? Number(actionId) : undefined });
                  setCurrentStep(countryId);
                }}
                onOpenRoadmap={handleOpenRoadmap}
              />
            )}
          </ErrorBoundary>
        </div>
      </main>

      {/* CHAMP Implementation Roadmap Explainer Modal */}
      <ChampRoadmapModal 
        isOpen={isRoadmapOpen}
        onClose={() => setIsRoadmapOpen(false)}
        onNavigateToAction={(actionId) => {
          setDeepLinkTarget(null);
          setCountryJourneyTarget(null);
          setCurrentStep(actionId);
          setIsRoadmapOpen(false);
        }}
        highlightedComponent={roadmapComponentId}
        roadmapPillars={liveRoadmapPillars}
      />
    </div>
  );
}

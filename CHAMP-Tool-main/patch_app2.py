import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

target = """export default function App() {
  const [currentStep, setCurrentStep] = useState<number | string>(0);
  const [deepLinkTarget, setDeepLinkTarget] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);"""

replacement = """export default function App() {
  const [currentStep, setCurrentStep] = useState<number | string>(0);
  const [deepLinkTarget, setDeepLinkTarget] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [liveActionsData, setLiveActionsData] = useState<any[]>(actionsData);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const fetchAirtableData = async () => {
      try {
        const response = await fetch('/api/content');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.formattedActions) {
            setLiveActionsData(data.formattedActions);
          }
        }
      } catch (err) {
        console.error("Failed to fetch Airtable data, using local fallback", err);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchAirtableData();
  }, []);"""

content = content.replace(target, replacement)

content = content.replace("step={actionsData.find(s => s.id === currentStep)}", "step={liveActionsData.find(s => s.id === currentStep)}")

with open('src/App.tsx', 'w') as f:
    f.write(content)

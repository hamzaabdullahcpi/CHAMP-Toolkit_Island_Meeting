import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

# Add React useEffect to the imports if not present
if 'useEffect' not in content:
    content = content.replace("import React, { useState, useEffect }", "import React, { useState, useEffect }") # Already has useState, probably
    
# Replace:
# export default function App() {
#   const [currentStep, setCurrentStep] = useState<number | string>('landing');

target = """export default function App() {
  const [currentStep, setCurrentStep] = useState<number | string>('landing');"""

replacement = """export default function App() {
  const [currentStep, setCurrentStep] = useState<number | string>('landing');
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

# Replace StepView usage:
# step={actionsData.find(s => s.id === currentStep)}
content = content.replace("step={actionsData.find(s => s.id === currentStep)}", "step={liveActionsData.find(s => s.id === currentStep)}")

with open('src/App.tsx', 'w') as f:
    f.write(content)

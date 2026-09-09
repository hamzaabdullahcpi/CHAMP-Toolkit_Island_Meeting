import re

with open("src/components/LandingPage.tsx", "r") as f:
    content = f.read()

content = content.replace(
    "onNavigateToStep?: (stepId: number) => void;",
    "onNavigateToStep?: (stepId: number, pathwayIdx?: number, example?: any) => void;"
)

with open("src/components/LandingPage.tsx", "w") as f:
    f.write(content)


with open("src/components/StepView.tsx", "r") as f:
    content = f.read()

if "initialDeepLink?: any;" not in content:
    content = content.replace(
        "isLast?: boolean;\n}) {",
        "isLast?: boolean;\n  initialDeepLink?: any;\n}) {"
    )
    
    # We also need to use initialDeepLink to set the state in StepView.
    # Currently StepView has:
    # const [topLevelTab, setTopLevelTab] = useState<'logic' | 'pathways'>('logic');
    # const [activePathwayIndex, setActivePathwayIndex] = useState(0);
    # const [selectedExample, setSelectedExample] = useState<any | null>(null);
    # useEffect(() => { ... setTopLevelTab(step?.systemsLogic ? 'logic' : 'pathways'); setActivePathwayIndex(0); ... }, [step])
    
    content = content.replace(
        """useEffect(() => {
    // Reset state when navigating between steps
    setTopLevelTab(step?.systemsLogic ? 'logic' : 'pathways');
    setActivePathwayIndex(0);
    setSelectedExample(null);
  }, [step]);""",
        """useEffect(() => {
    if (initialDeepLink) {
      setTopLevelTab('pathways');
      setActivePathwayIndex(initialDeepLink.pathwayIndex || 0);
      setSelectedExample(initialDeepLink.example || null);
    } else {
      setTopLevelTab(step?.systemsLogic ? 'logic' : 'pathways');
      setActivePathwayIndex(0);
      setSelectedExample(null);
    }
  }, [step, initialDeepLink]);"""
    )
    
    with open("src/components/StepView.tsx", "w") as f:
        f.write(content)

import re

with open('src/components/MindMapGraphic.tsx', 'r') as f:
    content = f.read()

# We need to change:
# import React, { useState } from 'react';
# to import React, { useState, useEffect } from 'react';

content = content.replace("import React, { useState } from 'react';", "import React, { useState, useEffect } from 'react';")

# We need to change:
# import { actionsData } from '../data/content';
# to import { actionsData as fallbackActionsData } from '../data/content';
content = content.replace("import { actionsData } from '../data/content';", "import { actionsData as fallbackActionsData } from '../data/content';")


# We need to change:
#   const actions = actionsData;
# to:
#   const [actions, setActions] = useState(fallbackActionsData);
#   const [isLoading, setIsLoading] = useState(true);
#   useEffect(() => {
#     fetch('/api/content')
#       .then(res => {
#         if (!res.ok) throw new Error('Not connected');
#         return res.json();
#       })
#       .then(data => {
#         if (data.success && data.formattedActions) {
#           setActions(data.formattedActions);
#         }
#       })
#       .catch(err => {
#         console.log("Airtable not connected, using static data fallback.");
#       })
#       .finally(() => setIsLoading(false));
#   }, []);

replacement = """  const [actions, setActions] = useState<any[]>(fallbackActionsData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (!res.ok) throw new Error('Not connected');
        return res.json();
      })
      .then(data => {
        if (data.success && data.formattedActions && data.formattedActions.length > 0) {
          setActions(data.formattedActions);
        }
      })
      .catch(err => {
        console.log("Airtable not connected, using static data fallback.");
      })
      .finally(() => setIsLoading(false));
  }, []);
"""

content = content.replace("  const actions = actionsData;", replacement)

with open('src/components/MindMapGraphic.tsx', 'w') as f:
    f.write(content)
print("Rewrote MindMapGraphic")

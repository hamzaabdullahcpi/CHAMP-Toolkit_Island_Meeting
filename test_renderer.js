const text = "First bullet\n-second bullet\n-hamza";
const lines = text.split('\n');
for (const line of lines) {
  const trimmed = line.trim();
  const bulletMatch = trimmed.match(/^(?:[-*+•—–·◦⁃]|\d+\.)\s*(.*)/);
  console.log({ trimmed, isBullet: !!bulletMatch, content: bulletMatch ? bulletMatch[1] : null });
}

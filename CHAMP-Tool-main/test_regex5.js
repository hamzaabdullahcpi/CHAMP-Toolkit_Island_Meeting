const str = "- hamza";
const regex = /^(?:[-*+•—–·◦⁃]|\d+\.)\s*/;
console.log(str.replace(regex, '').trim());

const str = "1. hamza";
const regex = /^(?:[-*+•—–·◦⁃]|\\d+\\.)\\s*/;
console.log(str.replace(regex, '').trim());

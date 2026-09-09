const regex = /^(?:[-*+•—–·◦⁃]|\d+\.)\s*(.*)/;
console.log(regex.exec("-hamza"));
console.log(regex.exec("- hamza"));

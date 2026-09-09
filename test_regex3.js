const regex = /^(?:[-*+•—–·◦⁃]|\d+\.)\s+(.*)/;
console.log(regex.test("- Hello"));
console.log(regex.test("+ Hello"));
console.log(regex.test("1. Hello"));
console.log(regex.test("• Hello"));

const regex = /^[-*•—–·◦⁃]\s+(.*)/;
console.log(regex.test("- Hello"));
console.log(regex.test("* Hello"));
console.log(regex.test("• Hello"));
console.log(regex.test("— Hello"));
console.log(regex.test("– Hello"));

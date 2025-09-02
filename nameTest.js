const fs = require('fs');
const path = require('path');

function extractTestCasesByTag(testFilesDir, module) {
    const testFiles = fs.readdirSync(testFilesDir);

    const testCases = [];

    testFiles.forEach((file) => {
        const filePath = path.join(testFilesDir, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (!isDirectory) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const regex = /test\('(.*?)'|test\.describe\.serial\(['"](.*?)['"]\s*,\s*.*\)/g;
            let match;
            while ((match = regex.exec(fileContent)) !== null) {
                const testCase = match[1] || match[2]; 
                if (testCase && testCase.includes(module)) {
                  testCases.push(testCase);
                }
            }
        }
    });

    return testCases;
}
const modules = [''];
const tag = process.argv[2];
let allTestCases = [];
modules.forEach((module) => {
    const testFilesDir = path.join(__dirname, 'e2e', '.templates', module);
    const testCases = extractTestCasesByTag(testFilesDir, tag);
    allTestCases.push(...testCases);
});

const jsonFilePath = `listNameTest/${tag}-test-cases.json`;
fs.writeFileSync(jsonFilePath, JSON.stringify(allTestCases, null, 2));
console.log(`All test cases for ${tag} have been extracted from all test files and saved to ${jsonFilePath}.`);
console.log('Total cases: ', allTestCases.length);

// COMANDO PARA EJECUTAR ÉSTE ARCHIVO
// node nameTest.js "@tag"

// EJEMPLO:
// node nameTest.js "@payments"
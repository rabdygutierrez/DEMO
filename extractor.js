const fs = require('fs');
const path = require('path');

function extractTestCasesByCompany(company) {
    const testFilesDir = path.join(__dirname, 'e2e', '.templates');
    const testFiles = fs.readdirSync(testFilesDir);

    const testCases = [];

    testFiles.forEach((file) => {
        const filePath = path.join(testFilesDir, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (!isDirectory) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const regex = /test\('(.*?)'/g;
            let match;

            while ((match = regex.exec(fileContent)) !== null) {
                const testCase = match[1];
                if (testCase.includes(company)) {
                    testCases.push(testCase);
                }
            }
        }
    });

    return testCases;
}

const company = process.argv[2];

const testCases = extractTestCasesByCompany(company);
const jsonFilePath = `${company}-test-cases.json`;

fs.writeFileSync(jsonFilePath, JSON.stringify(testCases, null, 2));

console.log(`Test cases for ${company} have been extracted from all test files and saved to ${jsonFilePath}.`);

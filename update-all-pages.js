// update-all-pages.js
// Script to update all code.html files with responsive header/footer from index.html
// and ensure mobile responsiveness

const fs = require('fs');
const path = require('path');

// Read index.html to extract header and footer
const indexPath = path.join(__dirname, 'index.html');
const indexContent = fs.readFileSync(indexPath, 'utf8');

// Extract header (from <!-- Navigation --> to end of </header>)
const headerMatch = indexContent.match(/(<!-- Navigation -->[\s\S]*?<\/header>)/);
const header = headerMatch ? headerMatch[1] : null;

// Extract footer (from <!-- Footer --> to end of </footer>)
const footerMatch = indexContent.match(/(<!-- Footer -->[\s\S]*?<\/footer>)/);
const footer = footerMatch ? footerMatch[1] : null;

// Extract head content (everything in <head> tag)
const headMatch = indexContent.match(/<head>([\s\S]*?)<\/head>/);
const headContent = headMatch ? headMatch[1] : null;

// Extract body classes
const bodyClassMatch = indexContent.match(/<body class="([^"]*)"/);
const bodyClasses = bodyClassMatch ? bodyClassMatch[1] : '';

if (!header || !footer || !headContent) {
    console.error('Could not extract header, footer, or head from index.html');
    process.exit(1);
}

console.log('✓ Extracted header, footer, and head from index.html');

// Find all code.html files recursively
function findCodeHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            findCodeHtmlFiles(filePath, fileList);
        } else if (file === 'code.html' && filePath !== path.join(__dirname, 'code.html')) {
            fileList.push(filePath);
        }
    }
    
    return fileList;
}

const codeHtmlFiles = findCodeHtmlFiles(__dirname);
console.log(`✓ Found ${codeHtmlFiles.length} code.html files`);

// Function to calculate relative path for links
function getRelativePath(fromDir, toFile) {
    const relative = path.relative(fromDir, toFile);
    return relative.replace(/\\/g, '/');
}

// Process each code.html file
let successCount = 0;
let failCount = 0;

for (const filePath of codeHtmlFiles) {
    try {
        const fileDir = path.dirname(filePath);
        const indexRelativePath = getRelativePath(fileDir, indexPath);
        
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if file already has mobile-responsive viewport meta tag
        const hasViewport = content.includes('name="viewport"');
        
        // Extract existing title if present
        const existingTitleMatch = content.match(/<title>([^<]*)<\/title>/);
        const existingTitle = existingTitleMatch ? existingTitleMatch[1] : 'AmazonReconciliation';
        
        // Extract existing main content (between <main> tags or after header before footer)
        let mainContent = '';
        const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
        if (mainMatch) {
            mainContent = mainMatch[1];
        } else {
            // Try to extract content between header and footer
            const afterHeader = content.split(/<\/header>/);
            if (afterHeader.length > 1) {
                const beforeFooter = afterHeader[1].split(/<footer/);
                if (beforeFooter.length > 1) {
                    mainContent = beforeFooter[0].replace(/<\/main>[\s\S]*/g, '');
                }
            }
        }
        
        // If no main content found, try to preserve as much as possible
        if (!mainContent.trim()) {
            // Extract body content
            const bodyMatch = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
            if (bodyMatch) {
                let bodyContent = bodyMatch[1];
                // Remove existing header and footer
                bodyContent = bodyContent.replace(/<!-- Navigation -->[\s\S]*?<\/header>/, '');
                bodyContent = bodyContent.replace(/<!-- Footer -->[\s\S]*?<\/footer>/, '');
                bodyContent = bodyContent.replace(/<header[\s\S]*?<\/header>/, '');
                bodyContent = bodyContent.replace(/<footer[\s\S]*?<\/footer>/, '');
                mainContent = bodyContent.trim();
            }
        }
        
        // Build new content with responsive structure
        const newContent = `<!DOCTYPE html>

<html class="light" lang="en"><head>
${headContent.replace(/\.\//g, './').replace(/<title>.*?<\/title>/, `<title>${existingTitle}</title>`)}
</head>
<body class="${bodyClasses}">
${header}

<!-- Progress Indicator -->
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
<div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm font-medium">
<div class="flex items-center gap-2 flex-shrink-0">
<span class="text-gray-400">1</span>
<span class="text-gray-400">/</span>
<span class="text-gray-400">5</span>
</div>
<div class="flex-1 w-full sm:mx-4">
<div class="h-1 bg-gray-200 rounded-full overflow-hidden">
<div class="h-full bg-primary rounded-full w-1/5"></div>
</div>
</div>
<div class="flex items-center gap-2 flex-shrink-0 overflow-x-auto pb-1 sm:pb-0">
<span class="text-primary font-bold whitespace-nowrap">Identify Issue</span>
<span class="text-gray-400 flex-shrink-0">→</span>
<span class="text-gray-400 whitespace-nowrap hidden sm:inline">My Risk</span>
<span class="text-gray-400 flex-shrink-0 hidden sm:inline">→</span>
<span class="text-gray-400 whitespace-nowrap hidden md:inline">Evidence</span>
<span class="text-gray-400 flex-shrink-0 hidden md:inline">→</span>
<span class="text-gray-400 whitespace-nowrap hidden lg:inline">Legal Action</span>
<span class="text-gray-400 flex-shrink-0 hidden lg:inline">→</span>
<span class="text-gray-400 whitespace-nowrap hidden xl:inline">Recovery</span>
</div>
</div>
</div>

<main class="flex-grow">
${mainContent}
</main>

${footer}
</body></html>
`;

        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✓ Updated: ${path.relative(__dirname, filePath)}`);
        successCount++;
    } catch (error) {
        console.error(`✗ Failed: ${path.relative(__dirname, filePath)} - ${error.message}`);
        failCount++;
    }
}

console.log(`\n========================================`);
console.log(`Update Complete!`);
console.log(`✓ Successful: ${successCount}`);
console.log(`✗ Failed: ${failCount}`);
console.log(`========================================`);

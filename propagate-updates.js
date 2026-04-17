const fs = require('fs');
const path = require('path');

// Configuration
const ROOT_INDEX = 'index.html';

// Read root index.html to extract source fragments
const rootPath = __dirname;
const indexPath = path.join(rootPath, ROOT_INDEX);
const indexContent = fs.readFileSync(indexPath, 'utf8');

function extractFragment(content, startMarker, endMarker) {
    const startIndex = content.indexOf(startMarker);
    const endIndex = content.indexOf(endMarker, startIndex + startMarker.length);
    if (startIndex === -1 || endIndex === -1) return null;
    return content.substring(startIndex, endIndex + endMarker.length);
}

const sourceHeader = extractFragment(indexContent, '<!-- Navigation -->', '</header>');
const sourceFooter = extractFragment(indexContent, '<!-- Footer -->', '</footer>');

// Extract head content - everything between <head> and </head>
const headStart = indexContent.indexOf('<head>');
const headEnd = indexContent.indexOf('</head>');
const sourceHead = (headStart !== -1 && headEnd !== -1) ? indexContent.substring(headStart + 6, headEnd) : null;

// Extract body class
const bodyMatch = indexContent.match(/<body class="([^"]*)"/);
const bodyClasses = bodyMatch ? bodyMatch[1] : '';

if (!sourceHeader || !sourceFooter || !sourceHead) {
    console.error('Failed to extract required fragments from index.html');
    console.log('Header found:', !!sourceHeader);
    console.log('Footer found:', !!sourceFooter);
    console.log('Head found:', !!sourceHead);
    process.exit(1);
}

console.log('Successfully extracted source fragments.');

function adjustPaths(content, depth) {
    if (depth === 0) return content;
    const prefix = '../'.repeat(depth);
    
    // Replace href="./ or src="./ with href="../... or src="../...
    // Be careful with links that are already absolute or start with http
    // This regex looks for href or src followed by "./" or just a filename
    return content.replace(/(href|src)="(\.\/)?((?!http|https|#|mailto|tel)[^"]+)"/g, (match, p1, p2, p3) => {
        // If it already starts with ../, don't double it if we were smarter, 
        // but here we assume index.html has ./ or no prefix.
        return `${p1}="${prefix}${p3}"`;
    });
}

function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === '.git' || file === 'node_modules') continue;
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            // Skip source files and fragments
            if (file === 'index.html' || file === 'contact.html' || file.includes('HEADER') || file.includes('FOOTER') || file === 'header.html' || file === 'footer.html') continue;
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allFiles = findHtmlFiles(rootPath);
console.log(`Found ${allFiles.length} files to update.`);

let updatedCount = 0;

for (const filePath of allFiles) {
    const relativePath = path.relative(rootPath, filePath);
    const depth = relativePath.split(path.sep).length - 1;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract existing title
    const titleMatch = content.match(/<title>([^<]*)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'AmazonReconciliation';
    
    // Extract existing main content
    let mainContent = '';
    const mainMatch = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    if (mainMatch) {
        mainContent = mainMatch[1];
    } else {
        // Try fallback extraction
        const hEnd = content.indexOf('</header>');
        const fStart = content.indexOf('<footer');
        if (hEnd !== -1 && fStart !== -1) {
            mainContent = content.substring(hEnd + 9, fStart).trim();
        }
    }

    if (!mainContent) {
        // If still nothing, try between body tags excluding header/footer
        const bStart = content.indexOf('<body');
        const bEnd = content.indexOf('</body>');
        if (bStart !== -1 && bEnd !== -1) {
            let bodyContent = content.substring(content.indexOf('>', bStart) + 1, bEnd);
            bodyContent = bodyContent.replace(/<!-- Navigation -->[\s\S]*?<\/header>/, '');
            bodyContent = bodyContent.replace(/<!-- Footer -->[\s\S]*?<\/footer>/, '');
            bodyContent = bodyContent.replace(/<header[\s\S]*?<\/header>/, '');
            bodyContent = bodyContent.replace(/<footer[\s\S]*?<\/footer>/, '');
            mainContent = bodyContent.trim();
        }
    }

    if (!mainContent) {
        console.warn(`Could not extract main content from ${relativePath}, skipping.`);
        continue;
    }

    const adjustedHead = adjustPaths(sourceHead, depth).replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
    const adjustedHeader = adjustPaths(sourceHeader, depth);
    const adjustedFooter = adjustPaths(sourceFooter, depth);

    const newContent = `<!DOCTYPE html>
<html class="light" lang="en">
<head>
${adjustedHead}
</head>
<body class="${bodyClasses}">
${adjustedHeader}

<main class="flex flex-col items-center w-full flex-grow">
${mainContent}
</main>

${adjustedFooter}
</body>
</html>`;

    fs.writeFileSync(filePath, newContent);
    updatedCount++;
}

console.log(`Successfully updated ${updatedCount} files.`);

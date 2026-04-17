# update-all-pages.ps1
# PowerShell script to update all code.html files with responsive header/footer from index.html

$ErrorActionPreference = "Stop"

# Get the script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Read index.html
$indexPath = Join-Path $scriptDir "index.html"
$indexContent = Get-Content $indexPath -Raw -Encoding UTF8

# Extract header (from <!-- Navigation --> to end of </header>)
$headerMatch = [regex]::Match($indexContent, '(<!-- Navigation -->[\s\S]*?</header>)')
$header = $headerMatch.Success ? $headerMatch.Groups[1].Value : $null

# Extract footer (from <!-- Footer --> to end of </footer>)
$footerMatch = [regex]::Match($indexContent, '(<!-- Footer -->[\s\S]*?</footer>)')
$footer = $footerMatch.Success ? $footerMatch.Groups[1].Value : $null

# Extract head content
$headMatch = [regex]::Match($indexContent, '<head>([\s\S]*?)</head>')
$headContent = $headMatch.Success ? $headMatch.Groups[1].Value : $null

# Extract body classes
$bodyClassMatch = [regex]::Match($indexContent, '<body class="([^"]*)"')
$bodyClasses = $bodyClassMatch.Success ? $bodyClassMatch.Groups[1].Value : ""

if (-not $header -or -not $footer -or -not $headContent) {
    Write-Host "ERROR: Could not extract header, footer, or head from index.html" -ForegroundColor Red
    exit 1
}

Write-Host "✓ Extracted header, footer, and head from index.html" -ForegroundColor Green

# Find all code.html files recursively (excluding root)
$codeHtmlFiles = Get-ChildItem -Path $scriptDir -Filter "code.html" -Recurse | 
    Where-Object { $_.FullName -ne (Join-Path $scriptDir "code.html") }

Write-Host "✓ Found $($codeHtmlFiles.Count) code.html files" -ForegroundColor Green

$successCount = 0
$failCount = 0

foreach ($file in $codeHtmlFiles) {
    try {
        $filePath = $file.FullName
        $fileDir = Split-Path $filePath -Parent
        $relativePath = Resolve-Path -Path $filePath -Relative
        
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # Extract existing title
        $existingTitleMatch = [regex]::Match($content, '<title>([^<]*)</title>')
        $existingTitle = $existingTitleMatch.Success ? $existingTitleMatch.Groups[1].Value : "AmazonReconciliation"
        
        # Extract main content (between <main> tags)
        $mainMatch = [regex]::Match($content, '<main[^>]*>([\s\S]*?)</main>')
        if ($mainMatch.Success) {
            $mainContent = $mainMatch.Groups[1].Value
        } else {
            # Try to extract content after header and before footer
            $parts = $content -split '</header>', 2
            if ($parts.Count -gt 1) {
                $afterHeader = $parts[1]
                $footerParts = $afterHeader -split '<footer', 2
                if ($footerParts.Count -gt 1) {
                    $mainContent = $footerParts[0] -replace '</main>[\s\S]*', ''
                } else {
                    $mainContent = ""
                }
            } else {
                # Extract from body
                $bodyMatch = [regex]::Match($content, '<body[^>]*>([\s\S]*?)</body>')
                if ($bodyMatch.Success) {
                    $bodyContent = $bodyMatch.Groups[1].Value
                    $bodyContent = $bodyContent -replace '<!-- Navigation -->[\s\S]*?</header>', ''
                    $bodyContent = $bodyContent -replace '<!-- Footer -->[\s\S]*?</footer>', ''
                    $bodyContent = $bodyContent -replace '<header[\s\S]*?</header>', ''
                    $bodyContent = $bodyContent -replace '<footer[\s\S]*?</footer>', ''
                    $mainContent = $bodyContent.Trim()
                } else {
                    $mainContent = ""
                }
            }
        }
        
        # Create progress indicator
        $progressIndicator = @'
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
'@

        # Build new content
        $newContent = @"
<!DOCTYPE html>

<html class="light" lang="en"><head>
$($headContent -replace '<title>.*?</title>', "<title>$existingTitle</title>")
</head>
<body class="$bodyClasses">
$header

$progressIndicator

<main class="flex-grow">
$mainContent
</main>

$footer
</body></html>
"@

        [System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.UTF8Encoding]::new($false))
        Write-Host "✓ Updated: $relativePath" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host "✗ Failed: $relativePath - $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Update Complete!" -ForegroundColor Cyan
Write-Host "✓ Successful: $successCount" -ForegroundColor Green
Write-Host "✗ Failed: $failCount" -ForegroundColor Red
Write-Host "========================================" -ForegroundColor Cyan

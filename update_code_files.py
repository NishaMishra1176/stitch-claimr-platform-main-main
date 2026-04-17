#!/usr/bin/env python3
"""
Script to update all code.html files with consistent header, footer, and progress indicator from index.html
"""

import os
import re
from pathlib import Path

BASE_DIR = Path(r"C:\Users\hp\OneDrive\Documents\stitch-amazonreconciliation-platform-main-main")
INDEX_FILE = BASE_DIR / "index.html"

def read_file(path):
    """Read file content"""
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(path, content):
    """Write content to file"""
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

def extract_section(content, start_marker, end_marker, include_start=True, include_end=True):
    """Extract a section from content between markers"""
    start_idx = content.find(start_marker)
    if start_idx == -1:
        return None
    
    if not include_start:
        start_idx += len(start_marker)
    
    end_idx = content.find(end_marker, start_idx)
    if end_idx == -1:
        return None
    
    if include_end:
        end_idx += len(end_marker)
    
    return content[start_idx:end_idx]

def extract_head_section(content):
    """Extract complete head section"""
    match = re.search(r'<head>.*?</head>', content, re.DOTALL)
    if match:
        return match.group(0)
    return None

def extract_title(content):
    """Extract title from head section"""
    match = re.search(r'<title>(.*?)</title>', content, re.DOTALL)
    if match:
        return match.group(1)
    return "AmazonReconciliation"

def extract_body_class(content):
    """Extract body class attribute"""
    match = re.search(r'<body class="([^"]*)"', content)
    if match:
        return match.group(1)
    return ""

def extract_main_content(content):
    """Extract main content between <main> and </main> tags"""
    # Try to find <main> tags first
    match = re.search(r'<main[^>]*>(.*?)</main>', content, re.DOTALL)
    if match:
        return match.group(1).strip()
    
    # If no main tags, try to find content after header and before footer
    header_end = content.find('</header>')
    footer_start = content.find('<!-- Footer -->')
    
    if header_end != -1 and footer_start != -1:
        return content[header_end + len('</header>'):footer_start].strip()
    
    # Last resort: return everything between body and the last div before footer
    body_match = re.search(r'<body[^>]*>(.*)', content, re.DOTALL)
    if body_match:
        body_content = body_match.group(1)
        footer_match = re.search(r'<!-- Footer -->|<footer', body_content)
        if footer_match:
            return body_content[:footer_match.start()].strip()
    
    return content

def update_relative_paths(content, depth_adjustment=""):
    """Update relative paths in content to work from subdirectory"""
    # Replace ./ with ../ for paths that go to root-level files
    # This is needed because code.html files are in subdirectories
    
    # Don't modify paths that already start with ../
    # Replace ./index.html with ../index.html
    content = re.sub(r'href="\./index\.html"', f'href="{depth_adjustment}index.html"', content)
    content = re.sub(r'href="\./login\.html"', f'href="{depth_adjustment}login.html"', content)
    content = re.sub(r'href="\./SITEMAP\.md"', f'href="{depth_adjustment}SITEMAP.md"', content)
    
    # Replace ./ with ../ for other root-level references
    content = re.sub(r'href="\./([^/"]+)"', f'href="{depth_adjustment}\\1"', content)
    content = re.sub(r'src="\./([^/"]+)"', f'src="{depth_adjustment}\\1"', content)
    
    return content

def process_code_file(code_path, index_content):
    """Process a single code.html file"""
    try:
        # Read the code.html file
        code_content = read_file(code_path)
        
        # Extract the title from the original file
        original_title = extract_title(code_content)
        
        # Extract the main content from the original file
        main_content = extract_main_content(code_content)
        
        # Extract components from index.html
        head_section = extract_head_section(index_content)
        body_class = extract_body_class(index_content)
        
        # Extract header section (from <!-- Navigation --> to </header>)
        header_section = extract_section(
            index_content, 
            '<!-- Navigation -->', 
            '</header>',
            include_start=True,
            include_end=True
        )
        
        # Extract progress indicator section
        progress_section = extract_section(
            index_content,
            '<!-- Progress Indicator -->',
            '<!-- Panic-First Action Zone -->',
            include_start=True,
            include_end=False
        )
        
        # Extract footer section (from <!-- Footer --> to </footer>)
        footer_section = extract_section(
            index_content,
            '<!-- Footer -->',
            '</footer>',
            include_start=True,
            include_end=True
        )
        
        if not all([head_section, header_section, progress_section, footer_section]):
            return False, "Missing required sections from index.html"
        
        # Update title in head section
        updated_head = re.sub(r'<title>.*?</title>', f'<title>{original_title}</title>', head_section)
        
        # Calculate path adjustment for relative links
        # code.html is in a subdirectory, so we need to go up one level
        rel_path = code_path.relative_to(BASE_DIR)
        depth = len(rel_path.parts) - 1  # -1 because the file itself is not a directory
        
        # For most files, they're one level deep (e.g., folder/code.html)
        # So we need ../ to get back to root
        path_prefix = "../" * depth if depth > 0 else "./"
        
        # Update paths in header and footer
        updated_header = update_relative_paths(header_section, path_prefix)
        updated_footer = update_relative_paths(footer_section, path_prefix)
        updated_progress = update_relative_paths(progress_section, path_prefix)
        
        # Build the new file content
        new_content = f"""<!DOCTYPE html>
<html class="light" lang="en">
{updated_head}
<body class="{body_class}">
{updated_header}
{updated_progress}
<main class="flex-grow">
{main_content}
</main>
{updated_footer}
</body>
</html>
"""
        
        # Write the updated content
        write_file(code_path, new_content)
        
        return True, "Success"
    
    except Exception as e:
        return False, str(e)

def find_all_code_files():
    """Find all code.html files in subdirectories"""
    code_files = []
    for root, dirs, files in os.walk(BASE_DIR):
        # Skip the root directory itself
        if Path(root) == BASE_DIR:
            continue
        
        # Skip hidden directories and common non-project directories
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in ['node_modules', '__pycache__', 'venv']]
        
        if 'code.html' in files:
            code_files.append(Path(root) / 'code.html')
    
    return code_files

def main():
    """Main function to process all code.html files"""
    print("=" * 60)
    print("AmazonReconciliation Platform - code.html Updater")
    print("=" * 60)
    
    # Read index.html
    print(f"\nReading index.html from: {INDEX_FILE}")
    index_content = read_file(INDEX_FILE)
    
    # Find all code.html files
    print("\nSearching for code.html files...")
    code_files = find_all_code_files()
    print(f"Found {len(code_files)} code.html files")
    
    # Process each file
    successful = 0
    failed = 0
    failed_files = []
    
    print("\nProcessing files...")
    print("-" * 60)
    
    for i, code_path in enumerate(code_files, 1):
        rel_path = code_path.relative_to(BASE_DIR)
        print(f"[{i}/{len(code_files)}] Processing: {rel_path}", end=" ... ")
        
        success, message = process_code_file(code_path, index_content)
        
        if success:
            print("OK")
            successful += 1
        else:
            print(f"FAILED: {message}")
            failed += 1
            failed_files.append((str(rel_path), message))
    
    # Print summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Total files found: {len(code_files)}")
    print(f"Successfully updated: {successful}")
    print(f"Failed: {failed}")
    
    if failed_files:
        print("\nFailed files:")
        for file_path, error in failed_files:
            print(f"  - {file_path}: {error}")
    
    print("\n" + "=" * 60)
    print("Done!")
    print("=" * 60)

if __name__ == "__main__":
    main()

# Shared Header & Footer Implementation

## Overview
All code.html pages in the Claimr platform now use shared header and footer components for consistent navigation across the entire site.

## Files Created

### 1. `SHARED_HEADER.html`
The universal header component containing:
- Claimr logo with link to homepage
- Action-oriented navigation dropdowns:
  - **Start** - Entry points and homepage variants
  - **What Happened?** - Problem description pages
  - **Risk** - Risk assessment tools
  - **Proof** - Evidence tools
  - **Action** - Legal escalation tools
  - **Money Back** - Recovery tools
- Login button (links to `login.html`)
- "Escalate Now" CTA button

### 2. `SHARED_FOOTER.html`
The universal footer component containing:
- Claimr branding and description
- Problem categories links
- Educational content links
- Recovery process links
- Copyright and legal links

### 3. `shared-nav-loader.js`
JavaScript loader that:
- Automatically detects the page's directory depth
- Fetches and injects the shared header and footer
- Handles relative paths for nested directories
- Dispatches events after loading (`header-loaded`, `footer-loaded`)

### 4. `login.html`
A complete login page with:
- Email and password fields
- Password visibility toggle
- Remember me functionality
- Demo authentication (accepts any valid input)
- "Continue as guest" option
- Security notice
- Consistent styling with the platform design

## Implementation Pattern

Each code.html page has been updated with:

```html
<!-- In place of old header -->
<header data-shared="true"></header>

<!-- Before closing body tag -->
<footer data-shared="true"></footer>
<script src="../shared-nav-loader.js"></script>
```

## Updated Files

**Total: 99 code.html files** across all variant directories, including:

- All panic interceptor variants
- All forensic checker variants
- All legal notice generator variants
- All visual escalation journey UIs
- All dashboard and recovery pages
- All educational and guide pages

## How It Works

1. **Page Load**: When a code.html page loads, the placeholder `<header data-shared="true"></header>` exists in the DOM

2. **Script Execution**: The `shared-nav-loader.js` script:
   - Detects the directory depth of the current page
   - Calculates the correct base path to root files
   - Fetches `SHARED_HEADER.html` and `SHARED_FOOTER.html`
   - Replaces the placeholder elements with the actual content

3. **Events**: After loading, the script dispatches:
   - `header-loaded` - Fired when header is injected
   - `footer-loaded` - Fired when footer is injected

## Benefits

✅ **Consistency**: All pages now have identical navigation
✅ **Maintainability**: Update header/footer in one place
✅ **Login Integration**: Login button works across all pages
✅ **Scalability**: New pages automatically get shared navigation
✅ **Path Handling**: Works for pages at any directory depth

## Usage for New Pages

To add the shared header/footer to a new page:

1. Add placeholder elements in your HTML:
```html
<body>
    <header data-shared="true"></header>
    <!-- Your page content -->
    <footer data-shared="true"></footer>
    <script src="../shared-nav-loader.js"></script>
</body>
```

2. Adjust the script path based on your directory depth:
   - Root level: `src="shared-nav-loader.js"`
   - One level deep: `src="../shared-nav-loader.js"`
   - Two levels deep: `src="../../shared-nav-loader.js"`

## Testing

To verify the implementation:
1. Open any code.html file in a browser
2. Confirm the header displays with all dropdown menus
3. Click the Login button - should navigate to `login.html`
4. Confirm the footer appears at the bottom of the page
5. Check that all navigation links work correctly

## Future Enhancements

- Add user authentication state management
- Implement actual login/logout functionality
- Add mobile menu toggle functionality
- Include breadcrumb navigation
- Add search functionality in header

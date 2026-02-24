# Claimr - End-to-End Connected Flow Platform

## Overview
Claimr is a comprehensive legal recovery platform designed for Indian e-commerce sellers to automatically fight courier fraud, escalate disputes to nodal officers, and reclaim lost profits. This repository contains a fully interconnected platform with 99+ HTML pages that form a single, cohesive customer journey designed for maximum conversion.

## The Claimr Flow Architecture
The platform follows a strict 6-stage flow that moves users from panic to recovery:

### Stage 0: Entry & Panic Interception
- **Goal**: Capture users already experiencing loss
- **Pages**: Merged homepage, panic interceptors, financial triage
- **Key Function**: Immediate problem recognition

### Stage 1: Situation Classification (Auto-routing)
- **Goal**: Convert emotion → diagnosis
- **Pages**: Classification engines, crisis lifecycle index
- **Key Function**: Route users to appropriate forensic tools

### Stage 2: Forensic Truth Engine
- **Goal**: Prove reality ≠ courier story
- **Pages**: Forensic engines, geo validators, evidence lockers
- **Key Function**: Build irrefutable evidence

### Stage 3: Evidence Lock + SLA Countdown
- **Goal**: Make delay visible and painful
- **Pages**: SLA timers, loss calculators, risk reports
- **Key Function**: Create urgency through time pressure

### Stage 4: Escalation & Legal Force
- **Goal**: Force written closure
- **Pages**: Escalation engines, legal generators, nodal directories
- **Key Function**: Apply pressure for resolution

### Stage 5: Recovery Command Center
- **Goal**: Track money coming back
- **Pages**: Recovery dashboards, payment hubs, asset recovery
- **Key Function**: Monitor successful recovery

### Stage 6: Pattern Memory & Prevention
- **Goal**: Prevent future occurrences
- **Pages**: Pattern recognition, analytics, intelligence
- **Key Function**: Learn from cases for future prevention

## Navigation System
Every page in the platform follows the global navigation rule:
- **Top Nav**: Home → My Risk → Evidence → Legal → Recovery
- **Sticky CTA**: "Escalate Now" or "Recover ₹X" on every page
- **Context Jump**: Links to similar recovered cases

## Conversion Strategy (Dual-Track Design)
The platform implements proven conversion techniques for both tracks:

### Emergency Track (Primary)
- **Immediate Action CTAs**: "Escalate Now" on every page
- **Fast-Track Issue Selector**: Jump directly to your specific problem
- **Emergency Closure Bar**: Always visible on every page
- **Direct Routing**: No education required, immediate action

### Guided Track (Secondary)
- **Forced Decision Funnels**: Users must select their specific issue
- **Loss Visualization**: Shows money at risk in real-time
- **SLA Countdowns**: Creates urgency without reading
- **Evidence Lockers**: Preserves proof for legal proceedings
- **Legal Pressure**: Automated escalation to nodal officers

### Cross-Track Integration
- **Global Navigation**: Home → My Issue → My Risk → Evidence → Legal → Recovery
- **Sticky CTAs**: "Escalate Now" OR "Recover ₹X" always visible
- **Context Jumps**: Links to similar recovered cases
- **No Dead Ends**: Every page leads to next irreversible action

## Amazon Reconciliation Integration
Amazon reconciliation issues are handled within the same flow structure:
- Identified as "Reconciliation Hold" in Stage 1
- Processed through forensic engines in Stage 2
- Resolved through escalation in Stage 4
- Tracked in recovery dashboards in Stage 5

## File Structure
The repository contains 99+ HTML files organized by function:
- `claimr_homepage_*` - Entry points and panic interception
- `claimr_home_*` - Core platform engines (command center, escalation, forensic)
- `fake_*` - Fraud detection and verification tools
- `payment_*` - Recovery and payment tools
- `legal_*` - Legal notice generators and court filing guides
- `recovery_*` - Recovery management dashboards
- `forensic_*` - Forensic analysis tools
- `nodal_*` - Nodal officer directories
- `sla_*` - SLA tracking and evidence tools

## Deployment
The platform is designed for static hosting and works on Vercel, Netlify, or any static hosting service.

### Vercel Configuration
The `vercel.json` file configures:
- Clean URLs
- Security headers
- Root redirect to main homepage

### Global Navigation
All pages include consistent navigation elements:
- Header with global navigation
- Footer with comprehensive page index
- Sticky CTA button
- Breadcrumb navigation showing current stage

## Key Performance Indicators
The platform is designed to maximize conversion through:
- **Reduced decision points**: Users follow a clear path
- **Increased urgency**: Time-sensitive elements throughout
- **Social proof**: Recovery amounts and success stories
- **Trust indicators**: Professional design and legal framework
- **Progressive disclosure**: Information revealed contextually

## Customer Journey Mapping
Every page serves a specific purpose in the customer's recovery journey:
- Users enter in panic mode
- Are guided through diagnosis
- Evidence is built automatically
- Legal pressure is applied
- Recovery is tracked and confirmed
- Future prevention is implemented

## Technical Architecture
- Pure HTML/CSS/JS (no backend dependencies)
- Responsive design for all devices
- Progressive enhancement for accessibility
- Semantic markup for SEO
- Fast loading times
- Offline-capable where possible

## Legal Compliance
The platform operates within Indian legal frameworks:
- Consumer protection compliance
- Digital information practices
- E-commerce regulations
- Courier service agreements

## Maintenance & Updates
The modular design allows for:
- Individual page updates without affecting others
- Addition of new forensic tools
- Expansion of legal templates
- Integration with new courier services
- Enhancement of recovery algorithms

This platform represents a complete, end-to-end solution for logistics recovery that moves customers from panic to closure through a structured, conversion-optimized journey.
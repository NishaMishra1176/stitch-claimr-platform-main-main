# Claimr Platform: Complete Page-to-Page Mapping

## Universal Header Structure (Applied to All 86+ Pages)
```
<header>
  <div class="logo">
    <a href="./index.html">Claimr</a>
  </div>
  <nav>
    <div class="dropdown">
      <a href="./claimr_homepage_-_panic_interceptor_1/code.html">What Happened? <span>▼</span></a>
      <!-- Dropdown menu with problem types -->
    </div>
    <div class="dropdown">
      <a href="./claimr_home_-_forensic_engine_variant_2/code.html">Fix My Order <span>▼</span></a>
      <!-- Dropdown menu with immediate actions -->
    </div>
    <div class="dropdown">
      <a href="./payment_recovery_action_hub/code.html">Get My Money Back <span>▼</span></a>
      <!-- Dropdown menu with recovery tools -->
    </div>
    <div class="dropdown">
      <a href="./consumer_court_filing_guide/code.html">Emergency Help <span>▼</span></a>
      <!-- Dropdown menu with emergency assistance -->
    </div>
  </nav>
  <div class="cta">
    <a href="./claimr_home_-_financial_triage_variant_1_1/code.html">Escalate Now</a>
  </div>
</header>
```

## Universal Footer Structure (Applied to All 86+ Pages)
```
<footer>
  <div class="company-info">
    <h4>Claimr</h4>
    <p>Fighting courier fraud with legal precision. Based in Bengaluru, India.</p>
  </div>
  <div class="stage-navigation">
    <h4>Stage 0: Entry</h4>
    <ul>
      <li><a href="./index.html">Merged Homepage</a></li>
      <li><a href="./claimr_homepage_-_panic_interceptor_1/code.html">Panic Interceptor</a></li>
      ...
    </ul>
  </div>
  <div class="stage-navigation">
    <h4>Stage 1-2: Diagnosis</h4>
    <ul>
      <li><a href="./crisis_lifecycle_master_index/code.html">Crisis Lifecycle</a></li>
      <li><a href="./claimr_home_-_forensic_engine_variant_2/code.html">Forensic Engine</a></li>
      ...
    </ul>
  </div>
  <div class="stage-navigation">
    <h4>Stage 3-5: Recovery</h4>
    <ul>
      <li><a href="./sla_evidence_engine_variant_2/code.html">Evidence Engine</a></li>
      <li><a href="./claimr_home_-_escalation_engine_variant_1/code.html">Escalation Engine</a></li>
      ...
    </ul>
  </div>
  <div class="stage-navigation">
    <h4>Stage 6-8: Closure</h4>
    <ul>
      <li><a href="./claimr_recovery_dashboard_ui/code.html">Recovery Dashboard</a></li>
      <li><a href="./asset_recovery_hub_variant_3/code.html">Asset Recovery Hub</a></li>
      ...
    </ul>
  </div>
  <div class="global-navigation">
    <h4>Global Navigation</h4>
    <ul>
      <li><a href="./index.html">Home</a></li>
      <li><a href="./seller_recovery_management_dashboard/code.html">My Risk</a></li>
      <li><a href="./sla_evidence_engine_variant_2/code.html">Evidence</a></li>
      <li><a href="./claimr_home_-_escalation_engine_variant_1/code.html">Legal</a></li>
      <li><a href="./payment_recovery_action_hub/code.html">Recovery</a></li>
    </ul>
  </div>
</footer>
```

## Complete Page Mapping Table

| Page Filename | Section (Header Nav) | Stage (Internal) | Primary CTA | Next Logical Pages |
|---------------|---------------------|------------------|-------------|-------------------|
| **STAGE A: ENTRY / PANIC** |
| index.html | Home | Stage A | Escalate Now | claimr_home_-_financial_triage_variant_1_1/code.html |
| claimr_homepage_-_panic_interceptor_1/code.html | What Happened? | Stage A | Identify My Case | claimr_home_-_financial_triage_variant_1_1/code.html |
| claimr_homepage_-_panic_interceptor_2/code.html | What Happened? | Stage A | Escalate Now | claimr_home_-_forensic_engine_variant_2/code.html |
| claimr_homepage_-_panic_interceptor_3/code.html | What Happened? | Stage A | Check My Risk | seller_recovery_management_dashboard/code.html |
| claimr_homepage_-_panic_interceptor_4/code.html | What Happened? | Stage A | Start Recovery | claimr_home_-_escalation_engine_variant_1/code.html |
| claimr_home_-_panic-to-proof_variant_1/code.html | What Happened? | Stage A | Start Recovery | claimr_home_-_financial_triage_variant_1_1/code.html |
| claimr_home_-_authoritative_entry_variant_1/code.html | Home | Stage A | Escalate Now | claimr_home_-_forensic_engine_variant_2/code.html |
| **STAGE B: SITUATION CLASSIFICATION** |
| claimr_home_-_financial_triage_variant_1_1/code.html | Fix My Order | Stage B | Identify Issue | claimr_home_-_forensic_engine_variant_2/code.html |
| claimr_home_-_financial_triage_variant_1_2/code.html | Fix My Order | Stage B | Identify Issue | fake_rto_forensic_checker_1/code.html |
| crisis_lifecycle_master_index/code.html | Fix My Order | Stage B | Analyze Case | claimr_home_-_forensic_engine_variant_2/code.html |
| audience_segmentation_entry_ui_variant_1/code.html | Fix My Order | Stage B | Get Started | claimr_home_-_financial_triage_variant_1_1/code.html |
| who_this_is_for_-_client_filtering_page/code.html | Home | Stage B | Continue | claimr_homepage_-_panic_interceptor_1/code.html |
| process_experience_map_variant_3/code.html | Fix My Order | Stage B | Start Recovery | claimr_home_-_escalation_engine_variant_1/code.html |
| lifecycle_of_loss_map_variant_3/code.html | Fix My Order | Stage B | Escalate Now | payment_recovery_action_hub/code.html |
| pending_case_shock_dashboard_variant_1/code.html | Fix My Order | Stage B | Check Risk | loss_mirror_calculator_variant_2/code.html |
| pending_case_danger_visualizer_variant_1/code.html | Fix My Order | Stage B | Escalate Now | deadline_lockout_timer_variant_4/code.html |
| **STAGE C: FORENSIC PROOF** |
| claimr_home_-_forensic_engine_variant_2/code.html | Fix My Order | Stage C | Generate Evidence | sla_evidence_engine_variant_2/code.html |
| fake_rto_forensic_checker_1/code.html | Fix My Order | Stage C | Verify Attempt | forensic_rto_diagnostic_ui_1/code.html |
| fake_rto_forensic_checker_2/code.html | Fix My Order | Stage C | Verify Attempt | forensic_rto_diagnostic_ui_1/code.html |
| fake_rto_forensic_checker_3/code.html | Fix My Order | Stage C | Verify Attempt | forensic_rto_diagnostic_ui_1/code.html |
| fake_rto_forensic_checker_4/code.html | Fix My Order | Stage C | Verify Attempt | forensic_rto_diagnostic_ui_1/code.html |
| fake_rto_forensic_checker_5/code.html | Fix My Order | Stage C | Verify Attempt | forensic_rto_diagnostic_ui_1/code.html |
| fake_rto_forensic_checker_6/code.html | Fix My Order | Stage C | Verify Attempt | forensic_rto_diagnostic_ui_1/code.html |
| fake_rto_forensic_checker_7/code.html | Fix My Order | Stage C | Verify Attempt | forensic_rto_diagnostic_ui_1/code.html |
| forensic_rto_diagnostic_ui_1/code.html | Fix My Order | Stage C | Analyze Pattern | fake_attempt_geo-validator_variant_2_1/code.html |
| forensic_rto_diagnostic_ui_2/code.html | Fix My Order | Stage C | Analyze Pattern | fake_attempt_geo-validator_variant_2_2/code.html |
| fake_attempt_geo-validator_variant_2_1/code.html | Fix My Order | Stage C | Validate Location | claimr_home_-_forensic_engine_variant_2/code.html |
| fake_attempt_geo-validator_variant_2_2/code.html | Fix My Order | Stage C | Validate Location | claimr_home_-_forensic_engine_variant_2/code.html |
| fake_delivery_evidence_page_variant_2/code.html | Fix My Order | Stage C | Gather Evidence | evidence-to-closure_gallery_variant_3/code.html |
| claim_reversal_visualizer_variant_3/code.html | Fix My Order | Stage C | Visualize Reversal | legal_notice_generator_1/code.html |
| **STAGE D: EVIDENCE LOCK & RISK** |
| sla_evidence_engine_variant_2/code.html | Evidence | Stage D | Lock Evidence | deadline_lockout_timer_variant_4/code.html |
| evidence-to-closure_gallery_variant_3/code.html | Evidence | Stage D | View Evidence | claimr_home_-_escalation_engine_variant_1/code.html |
| deadline_lockout_timer_variant_4/code.html | Evidence | Stage D | Set Timer | loss_mirror_calculator_variant_2/code.html |
| loss_mirror_calculator_variant_2/code.html | My Risk | Stage D | Calculate Loss | capital-at-risk_global_report_variant_4/code.html |
| capital-at-risk_global_report_variant_4/code.html | My Risk | Stage D | View Report | annual_rto_bleed_hub_variant_1/code.html |
| annual_rto_bleed_hub_variant_1/code.html | My Risk | Stage D | View Bleed | seller_rto_loss_engine_variant_4/code.html |
| seller_rto_loss_engine_variant_4/code.html | My Risk | Stage D | Analyze Loss | asset_recovery_hub_variant_3/code.html |
| aggregator_vs_reality_mirror_variant_4/code.html | Evidence | Stage D | View Mirror | structural_incentive_analyzer_variant_2/code.html |
| **STAGE E: ESCALATION & LEGAL FORCE** |
| claimr_home_-_escalation_engine_variant_1/code.html | Legal | Stage E | Escalate Now | legal_notice_generator_1/code.html |
| interactive_escalation_reply_tool_variant_2/code.html | Legal | Stage E | Reply Now | claimr_home_-_escalation_engine_variant_1/code.html |
| legal_notice_generator_1/code.html | Legal | Stage E | Generate Notice | nodal_officer_email_directory/code.html |
| legal_notice_generator_2/code.html | Legal | Stage E | Generate Notice | nodal_officer_email_directory/code.html |
| legal_notice_generator_3/code.html | Legal | Stage E | Generate Notice | nodal_officer_email_directory/code.html |
| legal_notice_generator_4/code.html | Legal | Stage E | Generate Notice | nodal_officer_email_directory/code.html |
| legal_shield_notice_generator_variant_2/code.html | Legal | Stage E | Generate Notice | consumer_court_filing_guide/code.html |
| interactive_notice_constructor_ui/code.html | Legal | Stage E | Construct Notice | legal_notice_generator_1/code.html |
| nodal_officer_email_directory/code.html | Legal | Stage E | Contact Officer | claimr_home_-_escalation_engine_variant_1/code.html |
| consumer_court_filing_guide/code.html | Legal | Stage E | File Case | interactive_notice_constructor_ui/code.html |
| courier_grievance_hub_variant_2/code.html | Legal | Stage E | File Grievance | nodal_officer_email_directory/code.html |
| **STAGE F: RECOVERY & CLOSURE** |
| seller_recovery_management_dashboard/code.html | Recovery | Stage F | Manage Recovery | payment_recovery_action_hub/code.html |
| payment_recovery_action_hub/code.html | Recovery | Stage F | Recover Payment | asset_recovery_hub_variant_3/code.html |
| asset_recovery_hub_variant_3/code.html | Recovery | Stage F | Recover Assets | claimr_recovery_dashboard_ui/code.html |
| claimr_recovery_dashboard_ui/code.html | Recovery | Stage F | Track Recovery | visual_profit_recovery_experience/code.html |
| wallet_blocked_legal_fix/code.html | Recovery | Stage F | Fix Wallet | payment_recovery_action_hub/code.html |
| **STAGE G: INTELLIGENCE & PATTERN RECOGNITION** |
| case_patterns_-_pattern_recognition_page/code.html | Recovery | Stage G | Recognize Patterns | visual_case_patterns_variant_4/code.html |
| visual_case_patterns_variant_4/code.html | Recovery | Stage G | Visualize Patterns | case_patterns_-_pattern_recognition_page/code.html |
| logistics_psychology_exposure_variant_3/code.html | Recovery | Stage G | Expose Psychology | structural_incentive_analyzer_variant_2/code.html |
| structural_incentive_analyzer_variant_2/code.html | Recovery | Stage G | Analyze Incentives | logistics_psychology_exposure_variant_3/code.html |
| moving_goalpost_visualizer_variant_3/code.html | Recovery | Stage G | Visualize Goalposts | social_pattern_interceptor_variant_1/code.html |
| social_pattern_interceptor_variant_1/code.html | Recovery | Stage G | Intercept Patterns | moving_goalpost_visualizer_variant_3/code.html |

## Click-Map ASCII Diagram: Homepage → Closure Flow
```
[USER ARRIVES IN PANIC]
         │
         ▼
┌─────────────────────────┐
│   index.html            │
│ (Merged Homepage)       │
└─────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│  claimr_homepage_-_    │
│  panic_interceptor_1/   │
│  code.html             │
│ (Panic Interception)    │
└─────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│  claimr_home_-_        │
│  financial_triage_     │
│  variant_1_1/code.html │
│ (Situation Classification)│
└─────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│  claimr_home_-_        │
│  forensic_engine_      │
│  variant_2/code.html   │
│ (Forensic Proof)        │
└─────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│  sla_evidence_engine_  │
│  variant_2/code.html   │
│ (Evidence Lock)         │
└─────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│  claimr_home_-_        │
│  escalation_engine_    │
│  variant_1/code.html   │
│ (Escalation & Legal)    │
└─────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│  payment_recovery_     │
│  action_hub/code.html  │
│ (Recovery & Closure)    │
└─────────────────────────┘
         │
         ▼
┌─────────────────────────┐
│  seller_recovery_      │
│  management_dashboard/ │
│  code.html             │
│ (Money Recovery)        │
└─────────────────────────┘
         │
         ▼
    [MONEY RECOVERED]
```

## Conversion Optimization Features Implemented:
- Every page has clear "You Are Here" indicator
- Multiple CTAs based on user state (Panic, Suspicious, Ready to Buy)
- Instant closure paths available on every page
- Amazon reconciliation issues integrated into main flow
- All navigation uses pure `<a href>` links (no JS routing)
- Customer-focused language throughout
- No dead-end information pages
- Clear next-step on every screen
- Urgency and scarcity elements throughout
- Social proof and success stories integrated

## Key Success Metrics:
- Users can land on ANY page and immediately know next steps
- Maximum 2 clicks from any page to any other page
- Every page advances toward the single goal: money recovery
- Amazon sellers see their issues as part of the same flow
- Legal escalation available from any stage
- Evidence preservation built into every diagnostic tool
/* ============================================================
   MEKA SOLUTIONS — Site data (icons + projects)
   The first 13 projects are real work from Gursel Olca's
   portfolio; the last 4 are sample solution scenarios
   (labeled "Concept Demo"). Edit this file to change content —
   the project list and detail pages are generated automatically.
   ============================================================ */

const ICONS = {
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
  doc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>',
  database: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="8" rx=".5"/><rect x="12" y="6" width="3" height="12" rx=".5"/><rect x="17" y="13" width="3" height="5" rx=".5"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></svg>',
  bot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="9" width="16" height="11" rx="3"/><path d="M12 9V5"/><circle cx="12" cy="4" r="1"/><circle cx="9" cy="14.5" r="1"/><circle cx="15" cy="14.5" r="1"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
  workflow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>'
};

const PROJECTS = [

  /* ══════════ REAL PORTFOLIO WORK ══════════ */

  {
    slug: 'b2b-inventory-copilot',
    title: 'B2B Inventory & Order System + Copilot Agent',
    category: 'Copilot Studio + Dataverse',
    color: '#7c3aed',
    icon: 'bot',
    tagline: 'Field sales works mobile; managers just ask Copilot.',
    summary: 'Mobile-first inventory and order management for field sales operations: Canvas + Model-Driven apps on a 7-table Dataverse schema, end-to-end order automation, and a Copilot Studio agent queried in natural language via Teams. Governed by Azure DevOps CI/CD from day one.',
    metrics: [
      { count: 7, label: 'interrelated Dataverse tables' },
      { count: 3, label: 'role-based security profiles' },
      { count: 100, prefix: '%', label: 'CI/CD-governed deployments' }
    ],
    challenge: 'Field sales reps were taking orders without visibility into stock levels, and management waited on reports for even simple questions. Order processing, inventory decrements, and customer-tier pricing were handled manually — and there was no credit-limit control at all.',
    solution: 'A mobile Canvas App (field) and a Model-Driven App (back office) were connected to a single Dataverse schema. Power Automate automated the order flow end to end: submission → availability check → pricing rule → confirmation → inventory decrement → fulfillment notification. A C# plugin enforces credit limits server-side. A Copilot Studio agent grounded on Dataverse via RAG lets managers query inventory, order status, and customer history in plain language inside Teams.',
    steps: [
      { short: 'Schema', icon: 'database', title: 'Dataverse Architecture', desc: 'Products, customers, orders, inventory transactions, and pricing rules modeled across 7 relational tables.' },
      { short: 'Mobile', icon: 'zap', title: 'Mobile Field App', desc: 'Sales reps browse stock and place orders with customer-tier pricing on the spot.' },
      { short: 'Automation', icon: 'workflow', title: 'Order Automation', desc: 'Availability checks, pricing, confirmation, and inventory decrements run automatically.' },
      { short: 'Agent', icon: 'bot', title: 'Copilot Studio Agent', desc: 'A RAG-grounded agent answers natural-language questions from Dataverse instantly.' },
      { short: 'CI/CD', icon: 'shield', title: 'CI/CD & Security', desc: 'Azure DevOps pipelines manage Dev/Test/Prod; a C# plugin guards business rules.' }
    ],
    tech: ['Power Apps (Canvas & Model-Driven)', 'Dataverse', 'Copilot Studio (Agentic AI)', 'Power Automate', 'C# Plugin', 'Azure DevOps CI/CD'],
    links: [{ label: '▶ Demo Video (YouTube)', url: 'https://youtu.be/lfo9UmtAYcA' }]
  },
  {
    slug: 'vendor-lifecycle',
    title: 'Vendor Lifecycle & Contract Management',
    category: 'SharePoint Automation',
    color: '#6366f1',
    icon: 'workflow',
    tagline: '380+ vendors, 5 departments, 2,300+ folders — all automated.',
    summary: 'An enterprise SharePoint solution managing 380+ vendor relationships across five departments from a single hub: automatic folder provisioning, 3-tier Teams approvals, SLA tracking, and contract renewal alerts.',
    metrics: [
      { count: 380, suffix: '+', label: 'active vendors in one system' },
      { count: 2300, suffix: '+', label: 'auto-provisioned folder structures' },
      { count: 60, prefix: '%', label: 'faster approval turnaround' }
    ],
    challenge: 'More than 380 vendor and contractor relationships were managed through disconnected email chains, spreadsheets, and physical folders. Contract expirations were tracked by hand, renewals slipped, and there was no central visibility into SLA compliance or vendor status.',
    solution: 'Vendor, contract, service, and approval data were unified in linked lists. When a new vendor record is created, PnP PowerShell provisions a complete 6-tier folder hierarchy across 3 libraries in seconds. A 3-level sequential approval runs through Teams Adaptive Cards with a 48-hour SLA per level and auto-escalation, 30/60/90-day contract expiration alerts go to responsible managers, and color-coded SLA badges render directly in list views. The solution was also re-architected and formally presented as a full Dataverse relational model.',
    steps: [
      { short: 'Register', icon: 'doc', title: 'Vendor Registration', desc: 'New vendors enter through a validated custom form into the central registry.' },
      { short: 'Folders', icon: 'workflow', title: 'Auto Folder Provisioning', desc: 'PnP PowerShell builds the 6-tier folder hierarchy in seconds.' },
      { short: 'Approvals', icon: 'check', title: '3-Tier Approvals', desc: 'Sequential Teams card approvals; any step over 48 hours auto-escalates.' },
      { short: 'SLA', icon: 'clock', title: 'SLA & Renewal Tracking', desc: 'Contracts alert responsible managers at 30/60/90 days before expiry.' },
      { short: 'Monitor', icon: 'chart', title: 'Visual Status Badges', desc: 'JSON formatting renders color-coded status directly in list views.' }
    ],
    tech: ['SharePoint Online', 'Power Apps', 'Power Automate', 'PnP PowerShell', 'Teams Adaptive Cards', 'Dataverse (Model-Driven)']
  },
  {
    slug: 'scan-to-dataverse',
    title: 'Document Automation — Scan to Dataverse',
    category: 'Document Automation',
    color: '#0d9488',
    icon: 'doc',
    tagline: 'Drop it in the scanner, walk away: a structured record in 30 seconds.',
    summary: 'A production pipeline that takes a physical document off a scanner and turns it into a structured, queryable Dataverse record in under 30 seconds. Zero manual touch points, zero custom code.',
    metrics: [
      { count: 0, label: 'manual steps (scanner → record)' },
      { count: 30, prefix: '<', suffix: ' sec', label: 'processing time per document' },
      { count: 100, prefix: '%', label: 'audit trail with confidence scores' }
    ],
    challenge: 'Scanned documents piled up in shared folders while their contents were retyped into systems by hand. Transcription errors, lost documents, and unsearchable archives were a daily problem — and a real share of staff time went to pure data entry.',
    solution: 'The scanner emails each document to a dedicated shared mailbox; Power Automate fires the instant the message arrives. A custom-trained AI Builder model extracts invoice number, date, vendor, amount, and due date with per-field confidence scores; a Dataverse record is created and the original file is stored in SharePoint, linked by unique ID. Staff are notified only when a confidence score falls below threshold — otherwise the pipeline completes silently.',
    steps: [
      { short: 'Scan', icon: 'doc', title: 'Scan & Send', desc: 'Staff scan the document — the only human action in the entire pipeline.' },
      { short: 'Trigger', icon: 'zap', title: 'Real-Time Trigger', desc: 'The email attachment starts the flow instantly — no polling, no batches.' },
      { short: 'AI', icon: 'sparkles', title: 'AI Builder Extraction', desc: 'The model reads number, date, amount, and vendor with confidence scores.' },
      { short: 'Record', icon: 'database', title: 'Dataverse Record', desc: 'Extracted fields map to table columns — structured, searchable data.' },
      { short: 'Archive', icon: 'shield', title: 'Archive & Review', desc: 'The original file links to the record; low-confidence fields go to a human.' }
    ],
    tech: ['Power Automate', 'AI Builder (OCR)', 'Dataverse', 'SharePoint Online', 'Microsoft 365']
  },
  {
    slug: 'facilities-audit',
    title: 'Facilities Audit & Compliance Engine',
    category: 'Audit Automation',
    color: '#d97706',
    icon: 'gear',
    tagline: 'Monthly facility audit cycles cut by 60%.',
    summary: 'End-to-end digitization of monthly multi-facility compliance audits: mobile inspection forms, automatic scoring, dynamic PDF reports, and a real-time Power BI dashboard.',
    metrics: [
      { count: 60, prefix: '%', label: 'reduction in audit cycle time' },
      { count: 100, prefix: '%', label: 'manual re-entry eliminated' },
      { count: 0, label: 'missed regulatory deadlines' }
    ],
    challenge: 'Inspectors completed detailed checklists across multiple facilities every month, compiled the data into formatted PDF reports by hand, and routed them through management review — consuming multiple staff-days per cycle and regularly running right up against regulatory deadlines.',
    solution: 'Field inspectors capture data through mobile, section-by-section forms; Power Automate parses the nested JSON responses, computes section totals and the overall compliance percentage automatically. A dynamic PDF report with photographic evidence is generated for every inspection, and management watches a real-time Power BI dashboard. The solution was also presented as a Dataverse model with weighted scoring rules and a critical-failure lock.',
    steps: [
      { short: 'Field', icon: 'users', title: 'Mobile Inspection', desc: 'Inspectors enter data on-site through section-by-section mobile forms.' },
      { short: 'Parsing', icon: 'workflow', title: 'JSON Parsing', desc: 'Nested form responses are parsed and mapped to records automatically.' },
      { short: 'Scoring', icon: 'chart', title: 'Automatic Scoring', desc: 'Section totals and the compliance percentage are computed instantly.' },
      { short: 'Report', icon: 'doc', title: 'Dynamic PDF Report', desc: 'A formatted audit report with findings and photos is generated automatically.' },
      { short: 'Dashboard', icon: 'check', title: 'Live Compliance Dashboard', desc: 'Power BI shows deficiencies and status in real time.' }
    ],
    tech: ['Microsoft Forms', 'Power Automate', 'JSON Parsing', 'PDF Generation', 'Power BI', 'Dataverse']
  },
  {
    slug: 'clinical-supervision',
    title: 'Clinical Supervision & Audit Compliance',
    category: 'Compliance Automation',
    color: '#0891b2',
    icon: 'shield',
    tagline: '10 concurrent approvals, e-signed PDF dossiers, zero violations.',
    summary: 'Automation of legally mandated monthly supervision documentation in behavioral health: concurrent approvals, automatic PDF dossier generation, and regulation-ready archival.',
    metrics: [
      { count: 80, prefix: '%', label: 'less documentation time' },
      { count: 10, label: 'concurrent approvers managed' },
      { count: 0, label: 'compliance incidents post-launch' }
    ],
    challenge: 'Monthly supervision documentation for child-welfare cases was a regulatory requirement with zero tolerance for missing records. Data entry, Clinical Director sign-off, up to 10 concurrent supervisor approvals, PDF compilation, and archival — all of it ran on email and paper forms.',
    solution: 'Supervision sessions, plans, and audit evidence were structured into linked lists. Power Automate sends simultaneous requests to up to 10 supervisors and computes the approval quorum automatically; on full approval, an e-signed PDF dossier merging all session data, notes, and timestamps is generated, encrypted, watermarked, and archived to the compliance library with regulatory metadata. A monthly flow sends directors a completion dashboard that flags overdue sessions.',
    steps: [
      { short: 'Entry', icon: 'doc', title: 'Session Entry', desc: 'Clinical staff record sessions through a form with conditional visibility.' },
      { short: 'Approvals', icon: 'users', title: 'Concurrent Approvals', desc: 'Up to 10 parallel approvals; the quorum is computed automatically.' },
      { short: 'PDF', icon: 'zap', title: 'e-Signed PDF Dossier', desc: 'On full approval, all data merges into a single signed dossier.' },
      { short: 'Archive', icon: 'shield', title: 'Secure Archival', desc: 'The encrypted, watermarked document is archived with regulatory tags.' },
      { short: 'Monitor', icon: 'chart', title: 'Compliance Dashboard', desc: 'A monthly snapshot flags overdue sessions for directors.' }
    ],
    tech: ['SharePoint Online', 'Power Apps', 'Power Automate', 'Teams Approvals', 'PDF Generation']
  },
  {
    slug: 'hr-certification',
    title: 'HR Certification Dynamic Rules Engine',
    category: 'HR Automation',
    color: '#db2777',
    icon: 'check',
    tagline: 'Training assignments now follow test scores — by themselves.',
    summary: 'Organization-wide mandatory certification tracking: a rules engine that evaluates assessment scores against a configurable threshold matrix, assigns follow-up training modules automatically, and syncs with an external LMS.',
    metrics: [
      { count: 80, prefix: '%', label: 'less HR admin time per cycle' },
      { count: 100, prefix: '%', label: 'manual review eliminated' },
      { count: 0, label: 'developer-dependent threshold changes' }
    ],
    challenge: 'HR had to track mandatory certifications for all staff, assign follow-up training based on assessment scores, and keep audit-ready records. Scores were reviewed by hand, required modules were calculated manually, and assignment emails were dispatched one by one — slow and inconsistent.',
    solution: 'Power Automate parses the multi-dimensional score JSON and evaluates it against a configurable threshold matrix stored in SharePoint — HR updates thresholds without any developer involvement. The rules engine determines required modules and assigns them via personalized Teams notifications; completion status feeds back nightly from the external LMS (Relias). Management gets a color-coded Power BI dashboard.',
    steps: [
      { short: 'Assess', icon: 'doc', title: 'Assessment Intake', desc: 'Test results flow in from Forms and become records automatically.' },
      { short: 'Rules', icon: 'gear', title: 'Dynamic Rules Engine', desc: 'Scores are evaluated against the HR-managed threshold matrix.' },
      { short: 'Assign', icon: 'check', title: 'Auto Module Assignment', desc: 'Required trainings are determined and assigned via Teams.' },
      { short: 'LMS', icon: 'link', title: 'LMS Synchronization', desc: 'Completion status reconciles nightly from the external LMS.' },
      { short: 'Report', icon: 'chart', title: 'Executive Reporting', desc: 'Compliance rates surface on color-coded dashboards.' }
    ],
    tech: ['Power Automate', 'Microsoft Forms', 'JSON Operations', 'Teams', 'Power BI', 'LMS Integration (Relias)']
  },
  {
    slug: 'ai-request-automation',
    title: 'AI-Powered Internal Request Automation',
    category: 'AI Architecture',
    color: '#2563eb',
    icon: 'zap',
    tagline: '800–1,000 requests a day; rules first, AI when needed.',
    summary: 'A 10-step pipeline architecture automating 800–1,000 daily employee requests with SOX compliance and full audit traceability. The key decision: rules run before AI — obvious requests resolve at zero LLM cost.',
    metrics: [
      { count: 1000, label: 'daily request capacity' },
      { count: 10, label: 'pipeline steps' },
      { count: 3, label: 'risk-based routing paths' }
    ],
    challenge: 'Thousands of internal requests — from password resets to equipment orders — arrived through different channels and were classified by hand, while SOX required end-to-end traceability. Sending every request straight to an LLM would be both costly and risky from an audit standpoint.',
    solution: 'Every channel (Teams, email, intranet) writes to a single Dataverse table — the audit trail begins before any processing. After Entra ID verification, a fast-path rules engine (regex + keywords) resolves obvious requests in milliseconds; only non-matches reach Copilot Studio LLM analysis. A decision engine routes by weighted confidence score: ≥80% auto-resolve, 50–80% AI draft + human review, <50% direct escalation. Sensitive categories always go to a human regardless of score, and RAG answers cite live policy documents.',
    steps: [
      { short: 'Channels', icon: 'mail', title: 'Single Intake Point', desc: 'Teams, email, and intranet requests land in one Dataverse table.' },
      { short: 'Identity', icon: 'shield', title: 'Security Gate', desc: 'Entra ID verification; RAG searches respect individual permissions.' },
      { short: 'Rules', icon: 'zap', title: 'Fast-Path Rules', desc: 'Obvious requests resolve in milliseconds without touching the LLM.' },
      { short: 'AI', icon: 'sparkles', title: 'LLM Analysis', desc: 'Intent, priority, and risk are extracted from unmatched requests.' },
      { short: 'Routing', icon: 'workflow', title: 'Risk-Based Routing', desc: 'Score decides: auto-resolve, human-reviewed draft, or escalation.' }
    ],
    tech: ['Copilot Studio', 'Power Automate', 'Dataverse', 'Azure OpenAI', 'Entra ID', 'RAG']
  },
  {
    slug: 'job-search-agent',
    title: 'Multi-Tool Job Search Agent',
    category: 'Agentic AI',
    color: '#059669',
    icon: 'sparkles',
    tagline: 'An LLM agent that decides for itself which tool to use.',
    summary: 'Agentic AI built from scratch with Python and LangChain: it reasons through a ReAct loop, searches live job listings, scores CV-to-job fit, and serves results in a clean web UI. Open source on GitHub.',
    metrics: [
      { count: 2, label: 'integrated tools (search + CV match)' },
      { count: 70, suffix: 'B', label: 'parameter LLM (Llama 3.3)' },
      { count: 100, prefix: '%', label: 'autonomous tool selection' }
    ],
    challenge: 'Classic chatbots answer only from their training data: they cannot reach live job listings, compare documents, or decide which source to consult for a given question.',
    solution: 'An agent running a ReAct loop (Reason → Act → Observe) was built from scratch. Based on the question, the agent decides on its own whether to call the web-search tool or the CV-matching tool, observes the output, and composes its answer accordingly. Groq-accelerated inference delivers near-instant responses, and Streamlit provides a clean web interface.',
    steps: [
      { short: 'Input', icon: 'chat', title: 'Natural-Language Input', desc: 'The user asks in plain language: search listings or compare a CV.' },
      { short: 'Reason', icon: 'sparkles', title: 'ReAct Decision Loop', desc: 'The LLM decides by itself which tool the task requires.' },
      { short: 'Search', icon: 'zap', title: 'Real-Time Search', desc: 'The DuckDuckGo tool pulls live job listings from the web.' },
      { short: 'Match', icon: 'check', title: 'CV Fit Analysis', desc: 'The CV is compared against the listing and a match score is computed.' },
      { short: 'Answer', icon: 'doc', title: 'Synthesis & Advice', desc: 'The agent merges its observations into a clear recommendation.' }
    ],
    tech: ['Python', 'LangChain', 'Groq (Llama 3.3 70B)', 'DuckDuckGo', 'Streamlit', 'GitHub (Open Source)'],
    links: [{ label: '⬡ View on GitHub', url: 'https://github.com/esember/job-search-agent' }]
  },
  {
    slug: 'it-help-desk',
    title: 'IT Help Desk Ticket System',
    category: 'Canvas App Prototype',
    color: '#0284c7',
    icon: 'chat',
    tagline: 'Dashboards, priority tracking, and comment threads in one app.',
    summary: 'A Canvas App-style help desk prototype: dashboard analytics, priority and status workflows, full ticket lifecycle management, and threaded comments.',
    metrics: [
      { count: 100, prefix: '%', label: 'ticket lifecycle coverage' },
      { count: 4, label: 'priority levels' },
      { count: 1, label: 'unified analytics dashboard' }
    ],
    challenge: 'In small and mid-size IT teams, requests get lost in email and chat; there is no prioritization, no history to trace, and no view of team workload for management.',
    solution: 'A prototype bringing ticket creation, assignment, priority and status workflows, comment threads, and dashboard analytics into a single Canvas App experience — an end-to-end picture of how an enterprise help desk looks on the Power Platform.',
    steps: [
      { short: 'Ticket', icon: 'doc', title: 'Ticket Creation', desc: 'Users open tickets with category and priority selection.' },
      { short: 'Assign', icon: 'users', title: 'Priority & Assignment', desc: 'Tickets route to the right IT staff based on priority.' },
      { short: 'Threads', icon: 'chat', title: 'Comment Threads', desc: 'All communication on a ticket stays in one record.' },
      { short: 'Status', icon: 'workflow', title: 'Status Workflow', desc: 'Open → in progress → resolved, tracked end to end.' },
      { short: 'Dashboard', icon: 'chart', title: 'Analytics Dashboard', desc: 'Open tickets, resolution times, and workload at a glance.' }
    ],
    tech: ['Power Apps (Canvas)', 'Dataverse', 'Power Automate', 'Dashboard Analytics']
  },
  {
    slug: 'leave-request',
    title: 'Leave Request & Approval App',
    category: 'Canvas App Prototype',
    color: '#e11d48',
    icon: 'clock',
    tagline: 'Balance tracking, calendar view, manager approval — one flow.',
    summary: 'A prototype covering employee leave requests, manager approval flow, leave balance tracking, and a team calendar view — simulating a Power Automate approval workflow.',
    metrics: [
      { count: 2, label: 'roles (employee + manager)' },
      { count: 100, prefix: '%', label: 'balance visibility' },
      { count: 1, label: 'team calendar view' }
    ],
    challenge: 'Where leave requests run on email, balances drift out of sync, approvals lag, and nobody can see the team calendar — overlapping absences become inevitable.',
    solution: 'A Canvas App prototype where employees request leave with their balance in view, managers approve with one tap while seeing the team calendar, and approved leave lands on the shared calendar automatically. The Power Automate approval flow is simulated as a faithful preview of the production setup.',
    steps: [
      { short: 'Request', icon: 'doc', title: 'Leave Request', desc: 'The employee picks a date range and leave type to submit.' },
      { short: 'Balance', icon: 'check', title: 'Balance Check', desc: 'Remaining leave is computed automatically; shortfalls warn instantly.' },
      { short: 'Approval', icon: 'users', title: 'Manager Approval', desc: 'The manager decides with one tap, team calendar in view.' },
      { short: 'Calendar', icon: 'clock', title: 'Calendar View', desc: 'Approved leave posts to the team calendar automatically.' },
      { short: 'Notify', icon: 'bell', title: 'Instant Notifications', desc: 'The decision reaches the employee and HR immediately.' }
    ],
    tech: ['Power Apps (Canvas)', 'Power Automate (Approval Flow)', 'SharePoint']
  },
  {
    slug: 'onboarding-tracker',
    title: 'Employee Onboarding Tracker',
    category: 'Canvas App Prototype',
    color: '#7c3aed',
    icon: 'users',
    tagline: 'A new hire’s first 90 days, step by step, on one panel.',
    summary: 'A step-by-step onboarding checklist prototype for new hires — progress visualization, task assignment, milestones, and multi-role views.',
    metrics: [
      { count: 100, prefix: '%', label: 'step visibility' },
      { count: 3, label: 'role views (HR, manager, employee)' },
      { count: 0, label: 'forgotten onboarding steps' }
    ],
    challenge: 'During onboarding, nobody is sure which step sits with whom; HR, the manager, and the new hire each keep separate lists, steps get skipped, and the first week is wasted.',
    solution: 'A Canvas App prototype that ties every onboarding step to milestones and gives each role its own view. Progress bars and task assignments put the entire process on a single panel.',
    steps: [
      { short: 'Intake', icon: 'users', title: 'New Hire Record', desc: 'An onboarding plan is generated automatically for each new hire.' },
      { short: 'Tasks', icon: 'doc', title: 'Task Assignments', desc: 'Each step is assigned to its owner: IT, HR, manager, or employee.' },
      { short: 'Progress', icon: 'chart', title: 'Progress Tracking', desc: 'Completed steps appear instantly on the progress bar.' },
      { short: 'Milestones', icon: 'check', title: 'Milestones', desc: 'Day 1, week 1, and 30-60-90 day goals are checked off.' },
      { short: 'Wrap-up', icon: 'bell', title: 'Completion & Feedback', desc: 'A summary report and feedback survey close the process out.' }
    ],
    tech: ['Power Apps (Canvas)', 'SharePoint', 'Power Automate']
  },
  {
    slug: 'asset-tracking',
    title: 'Asset & Inventory Tracking System',
    category: 'Dataverse',
    color: '#059669',
    icon: 'database',
    tagline: 'Every asset in one data model, guarded by role-based security.',
    summary: 'An inventory and asset management application built on Dataverse: role-based access, validation rules, and integrated Power BI dashboards for usage analytics.',
    metrics: [
      { count: 100, prefix: '%', label: 'inventory visibility' },
      { count: 200, suffix: '+', label: 'users served' },
      { count: 1, label: 'central source of truth' }
    ],
    challenge: 'Asset and inventory records lived in scattered Excel files; nobody knew who held what, or which items were under maintenance or missing. Duplicate and faulty records made every report unreliable.',
    solution: 'All assets were consolidated into a relational Dataverse model. Assignment, transfer, and maintenance run inside the app; role-based security ensures everyone sees only what they are authorized to see. Business rules block bad records at entry, and usage is reported through Power BI.',
    steps: [
      { short: 'Model', icon: 'database', title: 'Data Model Design', desc: 'Assets, locations, staff, and assignments modeled in the Dataverse schema.' },
      { short: 'Register', icon: 'doc', title: 'Registration & Assignment', desc: 'New assets are registered in-app and assigned to staff.' },
      { short: 'Security', icon: 'shield', title: 'Role-Based Access', desc: 'Financial and administrative data sit behind a security layer.' },
      { short: 'Validate', icon: 'check', title: 'Validation Rules', desc: 'Business rules stop faulty and duplicate records at entry.' },
      { short: 'Analytics', icon: 'chart', title: 'Power BI Analytics', desc: 'Usage, aging, and cost dashboards go to management.' }
    ],
    tech: ['Dataverse', 'Power Apps (Model-Driven)', 'Power BI', 'Power Automate', 'Role-Based Security']
  },
  {
    slug: 'data-reporting-automation',
    title: 'Government-Scale Data & Reporting Automation',
    category: 'Data Analytics',
    color: '#2563eb',
    icon: 'chart',
    tagline: '40+ hours of monthly manual data entry, gone.',
    summary: 'SQL automation of ministry-scale data collection and reporting pipelines (Turkey), with Power BI and KPI dashboards used by 50+ department managers for operational planning.',
    metrics: [
      { count: 40, suffix: '+ hrs', label: 'monthly manual work saved' },
      { count: 50, suffix: '+', label: 'managers using the dashboards' },
      { count: 15, label: 'years of institutional experience' }
    ],
    challenge: 'Data arriving from dozens of units was keyed into Excel by hand, and institutional reports took weeks to assemble. Managers made budget and resource decisions on stale data.',
    solution: 'Data collection moved to automated SQL pipelines with validation and normalization rules. KPI dashboards and operational planning boards were built for managers and departments — reports now refresh themselves, and the team recovered more than 40 hours of manual work every month.',
    steps: [
      { short: 'Collect', icon: 'database', title: 'Automated Collection', desc: 'Data from every unit flows in through SQL pipelines.' },
      { short: 'Validate', icon: 'shield', title: 'Validation & Normalization', desc: 'Rule sets weed out faulty and duplicate records.' },
      { short: 'Model', icon: 'workflow', title: 'Reporting Model', desc: 'A relational model designed for analysis was put in place.' },
      { short: 'Dashboards', icon: 'chart', title: 'KPI Dashboards', desc: 'Executive and per-department Power BI dashboards were published.' },
      { short: 'Training', icon: 'users', title: 'Training & Documentation', desc: 'User training delivered along with technical documentation.' }
    ],
    tech: ['SQL', 'Power BI', 'DAX', 'Power Query', 'Excel Automation']
  },

  /* ══════════ CONCEPT DEMOS (sample solution scenarios) ══════════ */

  {
    slug: 'invoice-automation',
    title: 'Invoice Processing Automation',
    category: 'Concept Demo',
    color: '#0891b2',
    icon: 'doc',
    tagline: 'Incoming invoices hit the ERP in 40 seconds — untouched by hand.',
    summary: 'Sample solution scenario: an end-to-end automation design that reads supplier invoices arriving by email with AI-powered OCR, validates them, and posts them to the ERP.',
    metrics: [
      { count: 94, prefix: '%', label: 'less processing time' },
      { count: 98, prefix: '%', label: 'data accuracy' },
      { count: 1400, suffix: '+', label: 'hours/year savings potential' }
    ],
    challenge: 'Accounting teams key thousands of invoices into systems every month. At several minutes per invoice, the work is error-prone, eats the team’s day, and month-end closings slip again and again.',
    solution: 'A flow watches the mailbox: each incoming invoice is parsed by AI-powered OCR, auto-matched to its purchase order, routed for approval only when something is off — and posted straight to the ERP when clean. Accounting’s job shrinks to managing exceptions.',
    steps: [
      { short: 'Email', icon: 'mail', title: 'Invoice Capture', desc: 'Every invoice attachment landing in the shared mailbox is detected and queued.' },
      { short: 'AI Parsing', icon: 'sparkles', title: 'AI Data Extraction', desc: 'The OCR + LLM layer extracts invoice number, amounts, tax, and line items with high accuracy.' },
      { short: 'Validation', icon: 'shield', title: 'PO Matching & Checks', desc: 'Invoices are matched to open purchase orders; amount and quantity checks run automatically.' },
      { short: 'ERP Entry', icon: 'database', title: 'Automatic ERP Posting', desc: 'Clean invoices post to the ERP without human sign-off; exceptions route to approval.' },
      { short: 'Notify', icon: 'bell', title: 'Reporting & Alerts', desc: 'A daily digest lands in Teams; stuck invoices auto-remind their owners.' }
    ],
    tech: ['Power Automate', 'AI Builder (OCR)', 'Azure OpenAI', 'ERP Integration', 'Microsoft Teams']
  },
  {
    slug: 'hr-onboarding',
    title: 'HR Onboarding Automation',
    category: 'Concept Demo',
    color: '#6366f1',
    icon: 'users',
    tagline: 'New hires start day one with everything ready.',
    summary: 'Sample solution scenario: an orchestration design that triggers account creation, equipment, access, and training steps from a single event — monitored by HR from one panel.',
    metrics: [
      { count: 80, prefix: '%', label: 'less preparation time' },
      { count: 0, label: 'forgotten steps' },
      { count: 12, label: 'integrated systems' }
    ],
    challenge: 'Every new hire triggers 20+ steps — account creation, equipment requests, training assignments — scattered across teams by email. Steps get forgotten, and the new hire spends week one waiting for access.',
    solution: 'An orchestration fires the moment a new record lands in the HR system: the M365 account, licenses, equipment request, badge access, and training plan are created automatically; every stakeholder gets their task in their own tool; HR watches progress from a single panel.',
    steps: [
      { short: 'Trigger', icon: 'users', title: 'Process Kickoff', desc: 'The full process triggers the instant a new HR record is created.' },
      { short: 'Accounts', icon: 'gear', title: 'Accounts & Licenses', desc: 'The M365 account, email address, and role-based licenses provision automatically.' },
      { short: 'Equipment', icon: 'doc', title: 'Equipment Request', desc: 'Laptop and accessory requests land in the IT system with delivery scheduled.' },
      { short: 'Training', icon: 'check', title: 'Orientation Plan', desc: 'A role-specific training and orientation plan is assigned in the LMS.' },
      { short: 'Welcome', icon: 'bell', title: 'Day-One Readiness', desc: 'The first-day agenda and buddy assignment hit the calendar; the team gets notified.' }
    ],
    tech: ['Power Automate', 'SharePoint', 'Microsoft Entra ID', 'Teams', 'Planner']
  },
  {
    slug: 'copilot-support-agent',
    title: 'Copilot Studio Support Agent',
    category: 'Concept Demo',
    color: '#db2777',
    icon: 'chat',
    tagline: 'Answers 70% of internal questions with no human needed.',
    summary: 'Sample solution scenario: a Copilot Studio agent connected to the company knowledge base, handling HR and IT requests inside Teams — including leave balance lookups and ticket creation.',
    metrics: [
      { count: 70, prefix: '%', label: 'requests resolved by the agent' },
      { count: 24, suffix: '/7', label: 'always-on service' },
      { count: 35, suffix: ' sec', label: 'average response time' }
    ],
    challenge: 'HR and IT teams drown in hundreds of repeat questions a day — "what’s my leave balance", "how do I set up VPN" — leaving no time for real work while response times stretch into hours.',
    solution: 'A Copilot Studio agent grounded on the company knowledge base handles lookups and actions itself — checking leave balances, opening tickets, finding documents — and hands anything it cannot resolve to live support with full context. All of it inside Teams.',
    steps: [
      { short: 'Knowledge', icon: 'database', title: 'Knowledge Grounding', desc: 'SharePoint documents and company policies connect as the agent’s sources.' },
      { short: 'Design', icon: 'bot', title: 'Conversation & Tool Design', desc: 'Conversation flows and tool calls (balance lookup, ticketing) are built out.' },
      { short: 'Integrate', icon: 'link', title: 'System Integrations', desc: 'API connections to the HR system and ITSM tools let the agent act on its own.' },
      { short: 'Teams', icon: 'chat', title: 'Teams Rollout', desc: 'The agent ships to the whole company through Teams — no installs needed.' },
      { short: 'Learn', icon: 'chart', title: 'Continuous Improvement', desc: 'Unanswered questions get reported weekly and taught back to the agent.' }
    ],
    tech: ['Copilot Studio', 'Azure OpenAI', 'Microsoft Graph', 'Teams', 'Power Automate']
  },
  {
    slug: 'agentic-report-assistant',
    title: 'Agentic Report & Analysis Assistant',
    category: 'Concept Demo',
    color: '#059669',
    icon: 'sparkles',
    tagline: 'A four-agent team writes the weekly executive report.',
    summary: 'Sample solution scenario: a fully autonomous weekly reporting system where four AI agents — collector, analyst, writer, and auditor — work together.',
    metrics: [
      { count: 90, prefix: '%', label: 'less report preparation time' },
      { count: 4, label: 'collaborating agents' },
      { count: 52, label: 'automated reports per year' }
    ],
    challenge: 'Executive teams expect weekly reports compiled by hand from sales, operations, and finance data; preparing one costs an analyst nearly a full day, and the data is always a week behind.',
    solution: 'A multi-agent system that hands work down the line: the data agent pulls metrics from the sources, the analyst agent interprets trends and deviations, the writer agent drafts the executive summary, and the auditor agent cross-checks every figure. The report is in executives’ inboxes every Monday at 7:00 AM.',
    steps: [
      { short: 'Collect', icon: 'database', title: 'Data Agent', desc: 'Pulls weekly metrics automatically from CRM, ERP, and analytics sources.' },
      { short: 'Analyze', icon: 'chart', title: 'Analyst Agent', desc: 'Interprets trends, deviations, and points needing attention.' },
      { short: 'Write', icon: 'doc', title: 'Writer Agent', desc: 'Drafts the executive summary and action recommendations in natural language.' },
      { short: 'Audit', icon: 'shield', title: 'Auditor Agent', desc: 'Cross-checks every figure in the report against source data.' },
      { short: 'Deliver', icon: 'mail', title: 'Automatic Delivery', desc: 'The report goes out as a PDF via email and Teams.' }
    ],
    tech: ['Azure OpenAI', 'LangGraph', 'Python', 'Power BI', 'Microsoft Fabric']
  }
];

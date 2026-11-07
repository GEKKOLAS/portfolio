// Product screenshots published in each project's public GitHub repository.
// Files are stored locally so the portfolio does not depend on GitHub at runtime.
export type RepositoryScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export const projectScreenshots: Record<string, RepositoryScreenshot[]> = {
  // GEKKOLAS/EShopLaVeleta @ bc63bef67a24bbcfb689d0e179d1c6c35ac71215
  // Source directory: docs/screenshots/
  "Vapex": [
    { src: "/projects/eshoplaveleta/home.png", alt: "Vapex: Homepage", caption: "Homepage" },
    { src: "/projects/eshoplaveleta/shop.png", alt: "Vapex: Catalog — 901 products", caption: "Catalog — 901 products" },
    { src: "/projects/eshoplaveleta/product-details.png", alt: "Vapex: Product details", caption: "Product details" },
    { src: "/projects/eshoplaveleta/cart.png", alt: "Vapex: Cart", caption: "Cart" },
    { src: "/projects/eshoplaveleta/features.png", alt: "Vapex: Features", caption: "Features" },
    { src: "/projects/eshoplaveleta/company.png", alt: "Vapex: Company page", caption: "Company page" },
    { src: "/projects/eshoplaveleta/team.png", alt: "Vapex: Team page", caption: "Team page" },
    { src: "/projects/eshoplaveleta/contact.png", alt: "Vapex: Contact page", caption: "Contact page" },
    { src: "/projects/eshoplaveleta/login.png", alt: "Vapex: Sign in", caption: "Sign in" },
    { src: "/projects/eshoplaveleta/register.png", alt: "Vapex: Register", caption: "Register" },
  ],
  // GEKKOLAS/jobhunter-os @ 8472b8b667577a8a57c9c718ce36a38c88d49260
  // Source directory: docs/screenshots/
  "JobHunter OS": [
    { src: "/projects/jobhunter-os/dashboard-light.png", alt: "JobHunter OS: Dashboard · light theme", caption: "Dashboard · light theme" },
    { src: "/projects/jobhunter-os/board-dark.png", alt: "JobHunter OS: Kanban board · dark theme", caption: "Kanban board · dark theme" },
    { src: "/projects/jobhunter-os/opportunity-light.png", alt: "JobHunter OS: Opportunity details and fit score · light theme", caption: "Opportunity details and fit score · light theme" },
    { src: "/projects/jobhunter-os/analytics-dark.png", alt: "JobHunter OS: Analytics · dark theme", caption: "Analytics · dark theme" },
    { src: "/projects/jobhunter-os/contact-dark.png", alt: "JobHunter OS: Recruiter conversations · dark theme", caption: "Recruiter conversations · dark theme" },
    { src: "/projects/jobhunter-os/follow-ups-light.png", alt: "JobHunter OS: Follow-ups · light theme", caption: "Follow-ups · light theme" },
    { src: "/projects/jobhunter-os/analytics-skills-light.png", alt: "JobHunter OS: Skills and gaps analysis · light theme", caption: "Skills and gaps analysis · light theme" },
    { src: "/projects/jobhunter-os/profile-light.png", alt: "JobHunter OS: Profile and skill evidence · light theme", caption: "Profile and skill evidence · light theme" },
    { src: "/projects/jobhunter-os/dashboard-dark.png", alt: "JobHunter OS: Dashboard · dark theme", caption: "Dashboard · dark theme" },
    { src: "/projects/jobhunter-os/board-light.png", alt: "JobHunter OS: Kanban board · light theme", caption: "Kanban board · light theme" },
    { src: "/projects/jobhunter-os/opportunity-dark.png", alt: "JobHunter OS: Opportunity details and fit score · dark theme", caption: "Opportunity details and fit score · dark theme" },
    { src: "/projects/jobhunter-os/analytics-light.png", alt: "JobHunter OS: Analytics · light theme", caption: "Analytics · light theme" },
    { src: "/projects/jobhunter-os/contact-light.png", alt: "JobHunter OS: Recruiter conversations · light theme", caption: "Recruiter conversations · light theme" },
    { src: "/projects/jobhunter-os/follow-ups-dark.png", alt: "JobHunter OS: Follow-ups · dark theme", caption: "Follow-ups · dark theme" },
    { src: "/projects/jobhunter-os/analytics-skills-dark.png", alt: "JobHunter OS: Skills and gaps analysis · dark theme", caption: "Skills and gaps analysis · dark theme" },
    { src: "/projects/jobhunter-os/profile-dark.png", alt: "JobHunter OS: Profile and skill evidence · dark theme", caption: "Profile and skill evidence · dark theme" },
    { src: "/projects/jobhunter-os/phone-dashboard-light.png", alt: "JobHunter OS: Mobile dashboard · light theme", caption: "Mobile dashboard · light theme" },
    { src: "/projects/jobhunter-os/phone-dashboard-dark.png", alt: "JobHunter OS: Mobile dashboard · dark theme", caption: "Mobile dashboard · dark theme" },
  ],
  // GEKKOLAS/atelliers @ aed2505c031eef1e8dc452c4e0da40b22cb3fe8e
  // Source directory: public/readme/
  "Atelliers": [
    { src: "/projects/atelliers/atelliers-home.png", alt: "Atelliers: Studio homepage", caption: "Studio homepage" },
  ],
  // GEKKOLAS/halcyon @ 395ff70af4a5c39a345356c6f2473683f359ff56
  // Source directory: docs/screenshots/
  "Halcyon": [
    { src: "/projects/halcyon/landing.png", alt: "Halcyon: Landing page", caption: "Landing page" },
    { src: "/projects/halcyon/call-chat.png", alt: "Halcyon: Video call with chat", caption: "Video call with chat" },
    { src: "/projects/halcyon/call-connected.png", alt: "Halcyon: Connected video call", caption: "Connected video call" },
    { src: "/projects/halcyon/room-waiting.png", alt: "Halcyon: Waiting room", caption: "Waiting room" },
    { src: "/projects/halcyon/room-manual.png", alt: "Halcyon: Manual room invitation", caption: "Manual room invitation" },
    { src: "/projects/halcyon/call-ended.png", alt: "Halcyon: Ended call", caption: "Ended call" },
    { src: "/projects/halcyon/landing-mobile.png", alt: "Halcyon: Mobile landing page", caption: "Mobile landing page" },
    { src: "/projects/halcyon/room-mobile-join.png", alt: "Halcyon: Join a room on mobile", caption: "Join a room on mobile" },
    { src: "/projects/halcyon/call-mobile.png", alt: "Halcyon: Mobile video call", caption: "Mobile video call" },
  ],
  // GEKKOLAS/smtp @ 71841b679a8413df0339acd7a0cdfadfc1a11e04
  // Source directory: docs/screenshots/
  "Mail Template Hub": [
    { src: "/projects/smtp/dashboard-light.png", alt: "Mail Template Hub: Dashboard · light theme", caption: "Dashboard · light theme" },
    { src: "/projects/smtp/dashboard-dark.png", alt: "Mail Template Hub: Dashboard · dark theme", caption: "Dashboard · dark theme" },
    { src: "/projects/smtp/template-editor-visual-light.png", alt: "Mail Template Hub: Visual email template editor · light theme", caption: "Visual email template editor · light theme" },
    { src: "/projects/smtp/template-editor-preview-dark.png", alt: "Mail Template Hub: Email template preview · dark theme", caption: "Email template preview · dark theme" },
    { src: "/projects/smtp/inbox-light.png", alt: "Mail Template Hub: Inbox · light theme", caption: "Inbox · light theme" },
    { src: "/projects/smtp/accounts-dark.png", alt: "Mail Template Hub: Connected email accounts · dark theme", caption: "Connected email accounts · dark theme" },
    { src: "/projects/smtp/templates-light.png", alt: "Mail Template Hub: Email templates · light theme", caption: "Email templates · light theme" },
    { src: "/projects/smtp/new-template-dialog-dark.png", alt: "Mail Template Hub: AI template generation · dark theme", caption: "AI template generation · dark theme" },
    { src: "/projects/smtp/login-light.png", alt: "Mail Template Hub: Sign in · light theme", caption: "Sign in · light theme" },
    { src: "/projects/smtp/history-dark.png", alt: "Mail Template Hub: Send history · dark theme", caption: "Send history · dark theme" },
    { src: "/projects/smtp/brand-light.png", alt: "Mail Template Hub: Brand kit · light theme", caption: "Brand kit · light theme" },
    { src: "/projects/smtp/analytics-dark.png", alt: "Mail Template Hub: Analytics · dark theme", caption: "Analytics · dark theme" },
  ],
  // GEKKOLAS/FleetIQ @ f970307397113cfcc85bb11fe951d67eb033dffc
  // Source directory: docs/images/screenshots/
  "FleetIQ": [
    { src: "/projects/fleetiq/dashboard.png", alt: "FleetIQ: Dashboard", caption: "Dashboard" },
    { src: "/projects/fleetiq/tracking.png", alt: "FleetIQ: Live fleet tracking", caption: "Live fleet tracking" },
    { src: "/projects/fleetiq/orders.png", alt: "FleetIQ: Order management", caption: "Order management" },
    { src: "/projects/fleetiq/planning.png", alt: "FleetIQ: Load planning", caption: "Load planning" },
    { src: "/projects/fleetiq/carriers.png", alt: "FleetIQ: Carrier registry", caption: "Carrier registry" },
    { src: "/projects/fleetiq/billing.png", alt: "FleetIQ: Invoice management", caption: "Invoice management" },
    { src: "/projects/fleetiq/landing.jpg", alt: "FleetIQ: Landing page", caption: "Landing page" },
  ],
  // GEKKOLAS/Scrapper @ ef182996ff1246134d3d943820bdc0c7f2db0596
  // Source directory: docs/images/
  "Scrape Studio": [
    { src: "/projects/scrapper/dashboard.png", alt: "Scrape Studio: Dashboard", caption: "Dashboard" },
    { src: "/projects/scrapper/products.png", alt: "Scrape Studio: Extracted product gallery", caption: "Extracted product gallery" },
    { src: "/projects/scrapper/jobs.png", alt: "Scrape Studio: Scraping job monitor", caption: "Scraping job monitor" },
  ],
  // GEKKOLAS/smb-automations- @ b3a14739d4aa9ed2b62512c9d5be81a51c564e7a
  // Source directory: docs/screenshots/
  "SMB Automation Suite": [
    { src: "/projects/smb-automations/video-lead-capture.png", alt: "SMB Automation Suite: Generated video of the lead capture workflow running", caption: "Generated workflow video · lead capture" },
    { src: "/projects/smb-automations/how-it-works.png", alt: "SMB Automation Suite: Workflow page with its explainer video", caption: "Workflow page with explainer video" },
    { src: "/projects/smb-automations/video-zapier-paths.png", alt: "SMB Automation Suite: Generated video of a Zapier Zap choosing a path", caption: "Generated video · Zapier paths" },
    { src: "/projects/smb-automations/library.png", alt: "SMB Automation Suite: Workflow library · light theme", caption: "Workflow library · light theme" },
    { src: "/projects/smb-automations/n8n-workflow.png", alt: "SMB Automation Suite: n8n lead capture workflow graph", caption: "n8n workflow graph" },
    { src: "/projects/smb-automations/zapier-workflow.png", alt: "SMB Automation Suite: Zapier quote request Zap steps", caption: "Zapier steps and paths" },
    { src: "/projects/smb-automations/library-dark.png", alt: "SMB Automation Suite: Workflow library · dark theme", caption: "Workflow library · dark theme" },
  ],
};


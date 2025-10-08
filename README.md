**Parra Harris Lawfirm Co-Parenting Plan Website — Frontend**

A modern web-based platform for Florida families to create legally compliant parenting plans through an interactive questionnaire system.
Developed by Vizx Global Solutions for a Parra Harris Law Firm, this frontend implements a dynamic, aesthetic, and responsive user interface powered by React Javascript, Tailwind CSS, and ShadCn UI.

**🚀 Project Overview**

This frontend serves as the user-facing interface of the Co-Parenting Plan platform.
It enables users to:

Build customized, Florida-compliant parenting plans through guided questionnaires.

View, sign, and download finalized legal documents.

Make secure online payments for selected service tiers.

Manage their profiles, view plan status, and interact with attorneys (for premium tiers).

**🎯 Core Features**

# 📋 Co-Parenting Plan Builder

20–30 dynamic, Florida-specific questions.

Step-by-step multi-page navigation.

Dynamic children details.

Custody preferences and schedule configuration.

Financial arrangements and communication protocol fields.

# 📄 Document Generation

Parra Harris Law Firm-compliant PDF generation.

Variable substitution from user responses.

Professional formatting for court compliance.

Document preview and download capability.

# ✍️ E-Signature Integration

Dual electronic signature (for both parents).

Signature verification and audit trail.

Email delivery of signed documents.

# 👥 User Account Management

Secure signup, login, and verification.

Password recovery.

Dashboard with plan status tracking.

Stored documents and profile management.

# 💳 Payment Integration

Multi-tier pricing system:

Parenting Plan Only – $999

Parenting Plan Plus – $2500

45-Minute Attorney Q&A – $350

Payment gateways:

Stripe

Amazon Pay

Cash Pay (optional)

Automatic receipt generation and email notifications.

# ⚖️ Attorney Dashboard (For Tier 2 and 3 Plans)

Review and edit parenting plans.

Add comments and annotations.

Direct client messaging.

Financial affidavit and child support calculators.

# 📅 Consultation Booking (Tier 3)

Schedule 45-minute Q&A sessions with attorneys.

Calendly or custom calendar integration.

Zoom API for video conferencing.

Email reminders and note delivery.

# 🧠 Admin Controls

Manage users, plans, and content.

Analytics dashboard (KPI, revenue, user engagement).

Questionnaire editor and PDF template manager.

Email and content management.

**⚙️ Setup & Installation**

# Clone Repository
git clone https://github.com/Vizx-Global/parraharrislaw_client.git

# Navigate into the project folder
cd parraharrislaw_client

# Install dependencies
npm install

# Create .env File inside the project route folder
VITE_API_BASE_URL=http://localhost:8000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_ZOOM_API_KEY=your_zoom_key
VITE_ZOOM_API_SECRET=your_zoom_secret


# Run development server
npm run dev
Design a clean, professional user dashboard for AFRISCIENCEHUB that supports profile management, service listing, communication, and a structured service booking + invoice workflow.

The dashboard must feel like an extension of the main website (not a separate admin panel).

Use brand colors:
Primary: #071D35
Accent: #ED3237

-----------------------------------
1. DASHBOARD LAYOUT
-----------------------------------

Top Navigation:
- Same as website (Home, Explore, Support, About, Contact)
- Top right: Profile avatar with dropdown:
  - My Profile
  - My Dashboard
  - Settings
  - Support Afrisciencehub
  - Logout

Left Sidebar:
- Overview
- My Profile
- My Listings
- Upload New Listing
- My Services
- Messages
- Invoices
- Notifications
- Reviews
- Verification Status
- Settings

Main Content Area:
Dynamic content based on selected section.

-----------------------------------
2. OVERVIEW PAGE
-----------------------------------

Display:

- Welcome message (e.g., “Welcome back, [Name]”)

- Summary cards:
  - Total Views
  - Total Likes
  - Total Shares
  - Active Listings
  - Pending Verification

- Recent Activity:
  - Messages
  - Invoice updates
  - Booking interactions

-----------------------------------
3. SERVICE INTERACTION FLOW
-----------------------------------

When a user clicks “Book a Service” anywhere on the platform:

Open a MODAL (not a new page)

-----------------------------------
4. BOOK SERVICE MODAL
-----------------------------------

Modal Title:
“Contact Service Provider”

Content:

Short UX Message:
“Please ensure you clearly agree on service scope, pricing, and delivery terms with the service provider before proceeding.”

Options:

1. Call Service Provider
- Action: Opens device call app
- User speaks directly with provider

2. Message Service Provider
- Action: Opens in-platform messaging dialog
- Enables chat between user and provider

Divider:

“OR”

3. Request Invoice

-----------------------------------
5. REQUEST INVOICE FLOW
-----------------------------------

If user selects “Request Invoice”:

- Send notification to service provider
- Provider receives request in dashboard (Notifications + Invoices section)

Provider Action:
- Generate invoice
- Fill:
  - Service description
  - Agreed scope
  - Cost
  - Terms

Client receives:
- Notification (in-app + optional email)
- Invoice to review

Client Actions:
- Confirm invoice
- Proceed to payment

-----------------------------------
6. POST-CALL INVOICE FLOW
-----------------------------------

If agreement is reached via call:

- Provider manually creates invoice from dashboard
- Same invoice structure as above

Client confirms and pays

-----------------------------------
7. INVOICES SECTION (DASHBOARD)
-----------------------------------

Create a dedicated “Invoices” page:

Tabs:
- Pending
- Awaiting Confirmation
- Paid
- Rejected

Each invoice card shows:
- Service name
- Provider name
- Amount
- Status
- Date

Actions:
- View Details
- Confirm & Pay
- Reject

-----------------------------------
8. MESSAGING SYSTEM
-----------------------------------

Simple chat interface:

- List of conversations
- Chat window
- Input field
- Timestamp

Keep clean and minimal

-----------------------------------
9. NOTIFICATIONS SYSTEM
-----------------------------------

Notifications should only be visible when user is logged in.

Notification types:
- New message
- Invoice received
- Invoice confirmed
- Payment updates
- Verification updates

Display:
- Notification icon (top nav)
- Dropdown preview
- Full notifications page in dashboard

Optional:
- Send email notification with link back to platform

-----------------------------------
10. MY LISTINGS
-----------------------------------

Show all uploaded listings:

Each listing card:
- Name
- Category
- Status badge:
  - Pending Verification
  - Verified

Actions:
- Edit
- Preview
- Archive

-----------------------------------
11. VERIFICATION SYSTEM
-----------------------------------

Each listing must have:

Status:
- Pending Verification
- Verified
- Rejected

If verified:
- Show verified badge on public profile

Include explanation:
“Profiles are verified after review by the AFRISCIENCEHUB team.”

-----------------------------------
12. DESIGN RULES
-----------------------------------

- Maintain clean spacing
- Use card-based layouts
- Keep UI simple and structured
- Avoid clutter
- Ensure consistency across all sections

-----------------------------------
GOAL
-----------------------------------

Create a scalable dashboard system that supports:

- Profile management
- Service listing
- Communication
- Structured service agreement via invoice
- Payment readiness

The experience should feel professional, trustworthy, and easy to use.
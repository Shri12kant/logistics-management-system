# 📘 Pragya Shipping and Logistics — Complete Project Documentation & Maintenance Guide
> **Version:** 1.0 (Production Live)  
> **Official Website:** [https://www.pragyashipping.in](https://www.pragyashipping.in)  
> **Repository:** [https://github.com/Shri12kant/logistics-management-system.git](https://github.com/Shri12kant/logistics-management-system.git) (`main` branch)  
> **Author / Developer:** Shri12kant (Pair-Programmed with Antigravity AI)  
> **Target Business:** Pragya Shipping and Logistics (Mumbai / Thane, India)  

---

## 📑 Table of Contents
1. [Project Overview & Key URLs](#1-project-overview--key-urls)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Folder Structure & Key File Locations](#3-folder-structure--key-file-locations)
4. [Domain & DNS Configuration (GoDaddy & Render)](#4-domain--dns-configuration-godaddy--render)
5. [Inquiry & Email Pipeline (Web3Forms)](#5-inquiry--email-pipeline-web3forms)
6. [Admin Portal & Management](#6-admin-portal--management)
7. [Google Search Console & SEO](#7-google-search-console--seo)
8. [Daily Operations: How to Make Changes & Deploy](#8-daily-operations-how-to-make-changes--deploy)
9. [Troubleshooting & FAQs (Future Problem Solutions)](#9-troubleshooting--faqs-future-problem-solutions)
10. [Important Credentials & Keys Summary](#10-important-credentials--keys-summary)

---

## 1. Project Overview & Key URLs

| Service / Resource | URL / Identifier | Purpose |
| :--- | :--- | :--- |
| **Official Live Domain** | `https://www.pragyashipping.in` | Main customer-facing website with SSL (HTTPS) |
| **Root Domain Redirect** | `https://pragyashipping.in` | Automatically redirects to `www.pragyashipping.in` |
| **Render Web App** | `https://pragya-shipping-web.onrender.com` | Frontend hosting server (Auto-deploy from GitHub `main`) |
| **Render Backend API** | `https://pragya-shipping-backend.onrender.com` | Express/Node.js REST API & MongoDB connection |
| **Shipment Tracking** | `https://www.pragyashipping.in/track` | Public tracking lookup for customer consignments |
| **Quote Calculator** | `https://www.pragyashipping.in/quote` | Instant freight rate estimation tool |
| **Admin Portal** | `https://www.pragyashipping.in/admin/login` | Secure management dashboard for inquiries & shipments |
| **Official Business Email** | `exp.sales@pragyashipping.in` | Receives all quote forms & customer inquiries |
| **Official Phone Number** | `+91 98671 89821` | Direct customer contact |

---

## 2. Tech Stack & Architecture

```mermaid
graph TD
    Client[Customer / Web Visitor] -->|HTTPS| CloudflareDNS[GoDaddy DNS / Render CDN]
    CloudflareDNS --> Frontend[React 19 + Vite Frontend]
    Frontend -->|Quote Request Email| Web3Forms[Web3Forms API]
    Web3Forms -->|Instant Email Notification| BusinessInbox[exp.sales@pragyashipping.in]
    Frontend -->|REST API Requests| Backend[Node.js / Express Backend on Render]
    Backend -->|Database Storage| MongoDB[MongoDB Atlas Database]
    Admin[Business Admin] -->|Login & Manage| AdminPanel[Admin Dashboard]
    AdminPanel --> Backend
```

### Frontend (`pragya-shipping`)
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (Modern CSS theme variables, dark navy `#0a1628` + safety amber `#e8a317`)
- **Routing:** React Router DOM v7
- **UI Notifications:** React Hot Toast
- **Excel Export:** SheetJS (`xlsx`) + `file-saver` (sanitized against CSV/Formula injection)
- **Icons & Visuals:** Inline SVG icons + 100% royalty-free, unbranded ultra-HD logistics photography

### Backend (`pragyashipping`)
- **Runtime:** Node.js (ES Modules)
- **Server:** Express.js
- **Database:** MongoDB Atlas with Mongoose ODM
- **Security:** JWT (JSON Web Tokens), Bcrypt password hashing, Helmet, CORS whitelist, anti-bot honeypot

---

## 3. Folder Structure & Key File Locations

```text
Pragya Shipping/
├── PROJECT_DOCUMENTATION.md       <-- This Master Documentation File
├── pragya-shipping/               <-- FRONTEND REACT APPLICATION
│   ├── public/
│   │   └── pragya-logo.png        <-- Favicon & brand icon
│   ├── src/
│   │   ├── api/
│   │   │   ├── config.js          <-- Backend API Base URL configuration
│   │   │   └── axiosInstance.js   <-- Axios interceptor with JWT tokens
│   │   ├── assets/
│   │   │   ├── pragya-logo.png    <-- Official company logo
│   │   │   ├── Hero-truck.jpg     <-- Home page container port background
│   │   │   ├── truck.jpg          <-- About Us section road transport truck
│   │   │   ├── Ship cargo.jpg     <-- Ocean cargo container vessel (Mission section)
│   │   │   ├── train-container.jpeg <-- Railway freight electric train
│   │   │   └── cargoIndia.jpg     <-- Project Cargo & heavy haul trailer
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx     <-- Header with mobile hamburger menu
│   │   │   │   ├── Footer.jsx     <-- Footer with contact details & links
│   │   │   │   └── AdminLayout.jsx<-- Admin portal layout with responsive sidebar
│   │   │   └── sections/
│   │   │       ├── Hero.jsx       <-- Landing hero with 1-click CTA buttons
│   │   │       ├── About.jsx      <-- About Us company story & certifications
│   │   │       ├── RailwayFreight.jsx <-- Rail freight & DFC corridors
│   │   │       ├── Services.jsx   <-- Road, Ocean, Customs clearance cards
│   │   │       ├── Mission.jsx    <-- Mission & Project Cargo area
│   │   │       ├── WhyChooseUs.jsx<-- 4 Core value propositions
│   │   │       ├── WorkingProcess.jsx <-- 4-Step booking process
│   │   │       └── Contact.jsx    <-- Quote Request Form + Web3Forms dispatch
│   │   ├── Pages/
│   │   │   ├── Home.jsx           <-- Master landing page
│   │   │   ├── TrackShipment.jsx  <-- Public tracking lookup page
│   │   │   ├── QuoteCalculator.jsx<-- Instant quote estimator
│   │   │   ├── AdminLogin.jsx     <-- Secure admin login
│   │   │   ├── AdminDashboard.jsx <-- Analytics & inquiry funnel
│   │   │   ├── Admin.jsx          <-- Inquiries list & Excel export
│   │   │   ├── AdminShipments.jsx <-- Create & update shipment status
│   │   │   ├── AdminRates.jsx     <-- Manage service pricing per kg/km
│   │   │   ├── AdminPayments.jsx  <-- Payment records
│   │   │   ├── AdminManagement.jsx<-- Add/remove sub-admins
│   │   │   └── AdminChangePassword.jsx <-- Reset admin password
│   │   ├── App.jsx                <-- Route definitions & ProtectedRoute guards
│   │   └── index.css              <-- Global typography, colors, animations
│   └── package.json
│
└── pragyashipping/                <-- BACKEND NODE/EXPRESS SERVER
    ├── config/
    │   └── db.js                  <-- MongoDB connection logic
    ├── controllers/               <-- Business logic for contacts, shipments, auth
    ├── models/                    <-- Mongoose Schemas (Admin, Contact, Shipment, Rate)
    ├── routes/                    <-- REST API Endpoints
    ├── server.js                  <-- Express entrypoint
    └── package.json
```

---

## 4. Domain & DNS Configuration (GoDaddy & Render)

The custom domain `pragyashipping.in` is registered on **GoDaddy** and connected to **Render** via standard DNS records:

### GoDaddy DNS Management Table

| Type | Name / Host | Value / Target | TTL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `216.24.57.1` | 1/2 Hour (Default) | Points `pragyashipping.in` to Render load balancer |
| **CNAME** | `www` | `pragya-shipping-web.onrender.com` | 1/2 Hour (Default) | Routes `www.pragyashipping.in` directly to Render frontend |
| **TXT** | `@` | *(Google verification token)* | Default | Google Search Console domain ownership verification |

### Render Custom Domain Settings
In Render Dashboard (`pragya-shipping-web`):
- `www.pragyashipping.in` is set as **Primary Domain**.
- `pragyashipping.in` automatically redirects to `www.pragyashipping.in`.
- SSL Certificates (Let's Encrypt) are auto-renewed by Render for free with 0 manual action required.

---

## 5. Inquiry & Email Pipeline (Web3Forms)

When a customer submits the **"Request a Quick Quote"** form on the website:

1. **Anti-Bot Check:** The form includes an invisible Honeypot field (`botcheck`). If automated spambots attempt to spam the form, the submission is silently dropped without sending spam emails.
2. **Input Validation:** Name (min 2 chars), Email (strict RFC regex), Subject, Service, Destination Port, and Message (min 5 chars) are verified.
3. **Database Backup:** The inquiry is automatically logged to the MongoDB database for record keeping.
4. **Instant Email Delivery:** Web3Forms dispatches an email notification with full inquiry details directly to:
   - **Recipient:** `exp.sales@pragyashipping.in`
   - **Access Key:** `59da4f5d-c41f-4383-a87c-d186b42b6627`

### How to Change the Recipient Email in Future:
If the company ever wants quote emails to go to a new or additional email address:
1. Visit [https://web3forms.com](https://web3forms.com) and enter the new email address to generate a new Access Key.
2. Open `pragya-shipping/src/components/sections/Contact.jsx`.
3. Update line 88 with the new `access_key`.
4. Run `git add .`, `git commit -m "Update email key"`, `git push origin main`.

---

## 6. Admin Portal & Management

- **Login URL:** `https://www.pragyashipping.in/admin/login`
- **Features Available in Admin Portal:**
  1. **Dashboard (`/admin/dashboard`):** Real-time count of total inquiries, new inquiries, read inquiries, and resolved cases.
  2. **Contacts (`/admin/contacts`):** View all client submissions, search by keyword/service, mark status (`NEW` / `READ` / `RESOLVED`), and export to sanitized Excel file with one click.
  3. **Shipments (`/admin/shipments`):** Create new shipment tracking numbers (e.g., `PRG100234`), update real-time transit status (`PENDING`, `PICKED_UP`, `IN_TRANSIT`, `OUT_FOR_DELIVERY`, `DELIVERED`), set ETA dates.
  4. **Rates (`/admin/rates`):** Configure base rates for Road, Ocean, Rail, Customs, and Project Cargo per ton/km.
  5. **Admin Management (`/admin/admin-management`):** Create sub-admin accounts for staff members.
  6. **Password Change (`/admin/change-password`):** Securely update the master password.

---

## 7. Google Search Console & SEO

- **Status:** Verified and actively indexed on Google Search.
- **Search Query:** Searching `pragyashipping.in` or `Pragya Shipping and Logistics` displays the official live snippet.
- **Key Meta Tags (`index.html`):**
  - Page Title: `PRAGYA SHIPPING AND LOGISTICS`
  - Meta Description: `PRAGYA SHIPPING AND LOGISTICS — reliable transportation and logistics across India.`
  - Responsive Viewport: `width=device-width, initial-scale=1.0`
  - Favicon: Official high-res branded icon `/pragya-logo.png`

---

## 8. Daily Operations: How to Make Changes & Deploy

Any code change pushed to the `main` branch on GitHub automatically triggers a zero-downtime production deployment on Render within 60-90 seconds.

### Standard Update Workflow:
```powershell
# 1. Navigate to the project directory
cd "c:\Users\hp\OneDrive\Desktop\Pragya Shipping"

# 2. Make your desired code or text edits in pragya-shipping/src/...

# 3. Test build locally to confirm no syntax errors
cd pragya-shipping
npm run build
cd ..

# 4. Commit and Push to GitHub
git add .
git commit -m "Describe your update here (e.g., update phone number or text)"
git push origin main
```
*That's it! Render detects the commit and deploys the new version automatically.*

---

## 9. Troubleshooting & FAQs (Future Problem Solutions)

### Q1: Website pehli baar kholne par 30-40 seconds leti hai load hone me, aisa kyu?
- **Karan:** Render Free Web Service 15 minute tak koi visitor na aane par server ko "Sleep / Spin-down" mode me daal deta hai. Jab koi 15 min baad pehla visitor aata hai, toh Render server ko "Wake up" karta hai jisme 30-40 seconds lagte hain.
- **Solution:** 
  1. Ek baar open hone ke baad sabhi pages super-fast khulte hain.
  2. Agar permanent 0-second instant load chahiye (bina kisi cold start ke), toh Render dashboard me jakar Backend service ko **Render Starter ($7/month)** par upgrade kiya ja sakta hai.

### Q2: Phone number ya Office Address change karna ho toh kahan karein?
- Phone number aur address **3 main files** me hain:
  1. `pragya-shipping/src/components/sections/Contact.jsx` (Lines 150-167)
  2. `pragya-shipping/src/components/layout/Footer.jsx` (Lines 32-42)
  3. `pragya-shipping/src/Pages/About.jsx` (Company details)
- Edit karke `git push origin main` kar dein.

### Q3: Website par nayi image/photo change karni ho toh kaise karein?
- Nayi photo ko `pragya-shipping/src/assets/` folder me daalein.
- Hamesha dhyan rakhein ki photo me:
  - ❌ Kisi stock site (iStock, Vecteezy) ka watermark na ho.
  - ❌ Kisi dusri transport company ka naam na ho.
- Component me import karke `npm run build` verify karein aur push karein.

### Q4: GoDaddy par Domain Renewal ki date kab aayegi?
- GoDaddy account me jakar **Billing / Subscriptions** check karein. Hamesha domain ka **Auto-Renew ON** rakhein taaki domain kabhi expire na ho.

### Q5: Admin password bhool gaye toh kya karein?
- Backend me `pragyashipping/models/Admin.js` me password Bcrypt hashed hota hai. Naya admin add karne ke liye MongoDB Atlas database me direct update ya backend register route use kar sakte hain.

---

## 10. Important Credentials & Keys Summary

| Item | Value / Location | Notes |
| :--- | :--- | :--- |
| **Domain Registrar** | GoDaddy Account | Manages DNS A & CNAME records |
| **Hosting Platform** | Render.com Dashboard | Manages Web & Backend Node services |
| **GitHub Repository** | `Shri12kant/logistics-management-system` | Source code repository |
| **Web3Forms Key** | `59da4f5d-c41f-4383-a87c-d186b42b6627` | Quotes forwarded to `exp.sales@pragyashipping.in` |
| **Render A Record IP** | `216.24.57.1` | GoDaddy A Record for root domain |
| **Render CNAME** | `pragya-shipping-web.onrender.com` | GoDaddy CNAME for `www` |

---
*End of Master Documentation — Keep this file safely in the root repository for all future maintenance.*

# CloudBlitz Landing Page (CBLP)

Welcome to the **CloudBlitz Landing Page (CBLP)** repository. This repository contains the source code for both the client-facing landing page (Frontend) and the corresponding contact/lead inquiry delivery service (Backend).

## Repository Overview

This project is organized as a monorepo containing two decoupled systems:

```
cblp/
├── backend/            # Express.js Email & CRM Lead API
│   ├── src/            # Backend source code
│   ├── .env.example    # Template for backend environment variables
│   └── package.json    # Backend dependencies & scripts
├── frontend/           # React + Vite Landing Page Application
│   ├── src/            # Frontend source code
│   ├── public/         # Static assets
│   ├── .env.example    # Template for frontend environment variables
│   └── package.json    # Frontend dependencies & scripts
├── README.md           # Project documentation (this file)
└── deployment.md       # Step-by-step local and production deployment guide
```

---

## Architecture Flow

The interaction between components is illustrated below:

```mermaid
graph TD
    User([User / Visitor]) -->|Submits Form| Frontend[React Frontend]
    Frontend -->|POSTs /api/leads| Backend[Express Backend]
    Backend -->|Validates Input| Validation{Is Valid?}
    
    Validation -->|No| RespondError[400 Bad Request]
    Validation -->|Yes| Deliver[Promise.allSettled]
    
    Deliver -->|1. Nodemailer / SMTP| Gmail[Gmail App Password]
    Deliver -->|2. HTTP POST| CRM[CloudBlitz CRM API]
    
    Gmail -->|Send Inquiry| Recipient[leads@yourcompany.com]
    CRM -->|Add Lead Record| CRMDB[(CRM Database)]
    
    Backend -->|Return 201 Response| Frontend
```

---

## Technical Stack

### [Frontend](file:///m:/Greamio_work/cblp/frontend)
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS v4 & PostCSS
- **Forms & Phone input**: [react-international-phone](https://www.npmjs.com/package/react-international-phone) for robust validation & formatting of international numbers
- **Routing**: [react-router-dom](https://reactrouter.com/)
- **Icons**: [react-icons](https://react-icons.github.io/react-icons/)

### [Backend](file:///m:/Greamio_work/cblp/backend)
- **Environment**: Node.js & Express.js
- **Email Delivery**: [nodemailer](https://nodemailer.com/) using Gmail SMTP App Passwords
- **Integration**: CloudBlitz CRM REST API
- **Input Validation**: Custom validation layers leveraging [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js) for strict telephone number parsing
- **Security**: CORS integration configured with specific origin whitelisting

---

## Quick Start (Development)

To get both servers running locally:

1. **Clone & Install Dependencies**
   ```bash
   # In root directory
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Configure Environment Variables**
   - Copy the `.env.example` files to `.env` in both folders.
   - For detailed credential configuration (CRM endpoints, Gmail App passwords), read the [deployment.md](file:///m:/Greamio_work/cblp/deployment.md) guide.

3. **Run Services**
   - **Backend**: `npm run dev` (starts on port `3001` with watch mode enabled)
   - **Frontend**: `npm run dev` (starts on port `5173` with reverse proxy mapping `/api` to port `3001`)

---

## Additional Documentation

- For detailed credentials configuration, environment variables, local execution, and production deployment instructions, please refer to the [Deployment Guide (deployment.md)](file:///m:/Greamio_work/cblp/deployment.md).

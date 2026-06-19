# Deployment Guide

This guide provides step-by-step instructions for deploying both the **CloudBlitz Landing Page (Frontend)** and the **Email & CRM Lead Service (Backend)** in local and production environments.

---

## 1. Credentials & External Services Setup

Before starting deployment, gather and configure the following credentials:

### A. Gmail SMTP App Password (Required for Email Alerts)
To allow the backend to send email notifications securely, you must use a Google App Password rather than your primary Gmail password:
1. Go to your [Google Account Console](https://myaccount.google.com/).
2. Navigate to **Security** in the left menu.
3. Under *How you sign in to Google*, ensure **2-Step Verification** is turned **ON**. (App Passwords are only available when 2-Step Verification is active).
4. Click on **2-Step Verification**, scroll to the bottom of the page, and select **App passwords**.
5. Enter a name for the app (e.g. `CloudBlitz Lead Backend`) and click **Create**.
6. Copy the generated **16-character password** (e.g., `abcd efgh ijkl mnop`). Remove spaces when pasting it into your environment file.
7. Save this code safely; you will not be able to view it again.

### B. CloudBlitz CRM API Endpoint (Required for CRM Integration)
Get the API Endpoint for the EMS CRM application. 
- Example: `https://crm-api.cloudblitz.in`
- Make sure to format it **without** a trailing slash in your configuration.

---

## 2. Local Deployment Setup

### Step 1: Clone and Install Dependencies
Install dependencies in both the `frontend` and `backend` directories.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables

#### Backend Local Config
Create a [backend/.env](file:///m:/Greamio_work/cblp/backend/.env) file from [backend/.env.example](file:///m:/Greamio_work/cblp/backend/.env.example):
```bash
cp .env.example .env
```
Open [backend/.env](file:///m:/Greamio_work/cblp/backend/.env) and configure:
```ini
PORT=3005
NODE_ENV=development

# CloudBlitz CRM URL (no trailing slash)
CRM_API_URL=https://crm-api.cloudblitz.in

# Nodemailer credentials
GMAIL_USER=inquiries@yourdomain.com
GMAIL_APP_PASSWORD=abcdefghijklmnop

# The email address that receives the notifications
INQUIRY_RECIPIENT_EMAIL=leads@yourcompany.com

# Allowed CORS origins
CORS_ORIGINS=http://localhost:5173,http://localhost:4173
```

#### Frontend Local Config
Create a [frontend/.env](file:///m:/Greamio_work/cblp/frontend/.env) file from [frontend/.env.example](file:///m:/Greamio_work/cblp/frontend/.env.example):
```bash
cp .env.example .env
```
Open [frontend/.env](file:///m:/Greamio_work/cblp/frontend/.env) and configure:
```ini
# Vite's local dev server uses a proxy configured in vite.config.js to bypass CORS.
# Keeping VITE_LEAD_API_URL blank or setting it to /api/leads is recommended locally.
VITE_LEAD_API_URL=/api/leads
```

### Step 3: Run the Applications Locally
To launch both services:

1. **Start the Backend server** (in `backend/` directory):
   ```bash
   npm run dev
   ```
   *Expected output:* Server running on port `3005` in development mode.

2. **Start the Frontend development server** (in `frontend/` directory):
   ```bash
   npm run dev
   ```
   *Expected output:* Vite server listening on `http://localhost:5173`. Any requests to `/api/*` will automatically proxy to `http://localhost:3005/api/*`.

---

## 3. Production Deployment Setup

In production, the frontend and backend should be deployed to hosting platforms (e.g., Vercel, Netlify, Render, AWS, or a VPS).

### A. Deploying the Backend (API Service)

The backend is a Node.js/Express application. You can host it on platforms like **Render**, **Railway**, **Heroku**, or a **VPS** (using PM2).

#### Options 1: Cloud Platforms (Render, Railway, Heroku)
1. Link your git repository to the platform.
2. Set the root directory of the application/service to `backend`.
3. Set the **Build Command** to:
   ```bash
   npm install
   ```
4. Set the **Start Command** to:
   ```bash
   npm start
   ```
5. Add the following **Environment Variables** in the platform's settings dashboard:
   - `PORT`: Set by the host or default (e.g., `8080`)
   - `NODE_ENV`: `production`
   - `CRM_API_URL`: `https://crm-api.cloudblitz.in`
   - `GMAIL_USER`: `inquiries@yourdomain.com`
   - `GMAIL_APP_PASSWORD`: `[Your 16-Char Google App Password]`
   - `INQUIRY_RECIPIENT_EMAIL`: `leads@yourcompany.com`
   - `CORS_ORIGINS`: `https://yourdomain.com` (Your live frontend URL, comma-separated if multiple)

#### Option 2: Linux VPS Deployment (using PM2)
1. SSH into your server, pull the repository, and go to the `backend` folder.
2. Install production dependencies:
   ```bash
   npm ci --only=production
   ```
3. Set up the `.env` file as specified in the backend local configuration, but with production credentials and CORS origins.
4. Start the app with PM2 to keep it running continuously:
   ```bash
   npm install -g pm2
   pm2 start src/index.js --name "cblp-backend"
   pm2 save
   pm2 startup
   ```
5. Set up an Nginx reverse proxy to forward traffic to `http://localhost:3005` (or whatever `PORT` you configured).

---

### B. Deploying the Frontend (Static Website)

The frontend is a static React application built using Vite.

#### Step 1: Define Environment Variables
When deploying the frontend, you must point the form submission API to the live production backend URL.
Configure your hosting platform's environment variables to include:
- `VITE_LEAD_API_URL`: `https://api.yourdomain.com/api/leads` (Replace with your actual backend production URL)

> [!NOTE]
> Vite embeds environment variables *at build time*. If you change this variable, you must trigger a rebuild of the frontend.

#### Step 2: Build the Frontend
To compile the site into static HTML/JS/CSS assets:
```bash
cd frontend
npm run build
```
This generates the optimized static files in the [frontend/dist](file:///m:/Greamio_work/cblp/frontend/dist) directory.

#### Step 3: Host Static Files
You can host the generated `dist` folder on static site hosts such as:
- **Vercel** / **Netlify** / **GitHub Pages** / **Cloudflare Pages**
  - Set the root directory/framework preset to **Vite**.
  - Build command: `npm run build`
  - Output directory: `dist`
- **Apache** / **Nginx** or shared hosting (e.g. **Hostinger**, **GoDaddy**)
  - Upload the contents of the `frontend/dist` directory to your web server root (e.g., `public_html` or `/var/www/html`).
  - Make sure to configure the server to fallback to `index.html` for single-page routing (SPA).

---

## 4. Verification Check

To ensure that your production setup is functioning properly, run these checks:
1. Verify the frontend is loading and assets are resolved.
2. Check the backend health by visiting the health route:
   `https://api.yourdomain.com/api/leads/health` (or `https://api.yourdomain.com/api/health`)
3. Fill out a form on the frontend and submit it. Verify:
   - A success message is displayed on the UI.
   - An inquiry notification email is received at the `INQUIRY_RECIPIENT_EMAIL` inbox.
   - The lead successfully appears in the CRM database dashboard.

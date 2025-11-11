# Blossom Doodles — Vercel Pattern A Starter (Static frontend + Serverless API)

This project is a **mobile-first static frontend** served from `/public` and **serverless API** endpoints under `/api` (Vercel serverless functions).
It connects to MongoDB Atlas and uses Resend for email delivery.

## Quick local run (with Vercel CLI)
1. Install dependencies
```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in the values (do NOT commit `.env`)
```bash
cp .env.example .env
# edit .env and put your MONGODB_URI and RESEND_API_KEY
```

3. Seed the database (optional)
```bash
# ensure MONGODB_URI is set in your environment
npm run seed
```

4. Run locally with Vercel dev (recommended)
```bash
# install vercel globally if you don't have it
npm install -g vercel
vercel dev
```

This will serve static files from `/public` and map `/api/*.js` to local serverless endpoints.

## Deploy to Vercel (step-by-step)

1. Create a GitHub repository and push this project to GitHub.
2. Log into https://vercel.com and click **New Project → Import Git Repository**.
3. Select your BlossomDoodles repo. Vercel will detect a static project with serverless functions.
4. **Before you deploy**, add Environment Variables (Project Settings → Environment Variables):
   - `MONGODB_URI` = your MongoDB Atlas connection string (the one with access to the 'doodles' DB)
   - `RESEND_API_KEY` = your Resend API key
   - `EMAIL_TO` = ang_scargill@yahoo.co.uk
5. Click **Deploy**. After the build, Vercel will give your project a `*.vercel.app` domain.

## Pointing your domain blossomdoodles.co.uk to Vercel (recommended: Vercel nameservers)
1. In Vercel Dashboard → Project → Domains → Add domain `blossomdoodles.co.uk`.
2. Vercel will show two nameservers (eg. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`).
3. In your domain registrar's DNS settings, change the **Nameservers** to the two Vercel nameservers.
4. Wait for DNS propagation (minutes to a few hours). Back in Vercel, click **Verify** if requested.
5. Vercel will provision an SSL certificate automatically.

## How the API works
- `GET /api/puppies` — returns JSON array of available puppies from the `doodles.Puppy` collection.
- `POST /api/contact` — accepts JSON `{ name, email, message }` and sends an email via Resend.

## D: Step-by-step Vercel UI actions (textual guide)

### Add Environment Variables
1. Open Vercel dashboard and select your project.
2. Click **Settings** → **Environment Variables**.
3. Click **Add** and enter the variable key (e.g., `MONGODB_URI`) and its value. Set the Environment to **Production** (and Preview if desired).
4. Repeat for `RESEND_API_KEY` and `EMAIL_TO`.
5. Click **Save**.

### Add Domain to Project (and configure DNS)
1. In Project dashboard, click **Domains** → **Add** and enter `blossomdoodles.co.uk`.
2. Choose **Configure DNS** → you will be shown two options: switch nameservers to Vercel (recommended) or add records at your registrar.
3. If switching nameservers, copy the two Vercel nameservers and update them in your domain registrar's control panel (where you bought the domain).
4. If adding records instead, copy the A/CNAME records Vercel shows and paste them into the DNS management panel at your registrar.

### Verify deployment & logs
1. After deploy, open **Deployments** in the project dashboard to view recent deploys and logs.
2. Click a deployment to see build logs and serverless function logs (useful for debugging contact errors).

If you'd like annotated screenshots for any Vercel steps, tell me which steps and I will create them.

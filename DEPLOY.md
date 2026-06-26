# Deploy Portfolio

Stack:
- **Frontend:** Vercel (`client/`)
- **Backend:** Railway (`server/`)
- **Database:** Neon PostgreSQL (already configured locally)

## 1. Push to GitHub

```powershell
cd "C:\Users\amans\OneDrive\Desktop\Old Files\WEB DEV\WEB DEV\PROJECTS\Portfolio"
git init
git add .
git commit -m "Prepare portfolio for production deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

Create the GitHub repo first at [github.com/new](https://github.com/new).

## 2. Deploy backend (Railway)

1. Go to [railway.app](https://railway.app) and create a new project.
2. **Deploy from GitHub repo** and select your repo.
3. Add a service and set **Root Directory** to `server`.
4. Add environment variables in Railway:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Your Neon connection string |
| `CLIENT_ORIGIN` | `https://YOUR-VERCEL-URL.vercel.app` (update after step 3) |

5. Deploy and copy the public URL (e.g. `https://portfolio-api.up.railway.app`).
6. Test: open `https://YOUR-RAILWAY-URL/api/health` — should return `{"status":"ok",...}`.

### Resume PDF (optional for now)

Place your CV at:

`server/assets/resume/Aman_Sigroha_Resume.pdf`

Then redeploy Railway.

## 3. Deploy frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) → **Add New Project** → import GitHub repo.
2. Set **Root Directory** to `client`.
3. Framework preset: **Vite** (auto-detected).
4. Add environment variable:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | Your Railway URL (no trailing slash) |

5. Deploy and copy your live URL (e.g. `https://portfolio-xyz.vercel.app`).

## 4. Connect frontend + backend

1. In **Railway**, update `CLIENT_ORIGIN` to your exact Vercel URL.
2. Redeploy Railway (or it may auto-redeploy on env change).
3. Visit your Vercel site and test:
   - Projects / Skills load from API
   - Contact form submits
   - Download CV (after PDF is added)

## 5. Custom domain (optional)

- **Vercel:** Project → Settings → Domains
- **Railway:** Service → Settings → Networking → Custom Domain
- Update `CLIENT_ORIGIN` and `VITE_API_URL` if URLs change.

## Local production preview

```powershell
cd client
$env:VITE_API_URL="http://localhost:3001"
npm run build
npm run preview
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| API calls fail on live site | Check `VITE_API_URL` in Vercel matches Railway URL |
| CORS errors | Set `CLIENT_ORIGIN` in Railway to exact Vercel URL (https, no trailing slash) |
| 404 on page refresh | `vercel.json` SPA rewrite is included in `client/` |
| Contact form 500 | Verify `DATABASE_URL` in Railway and Neon is reachable |
| CV download 404 | Add PDF to `server/assets/resume/` and redeploy |

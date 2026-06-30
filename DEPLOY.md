# Deploy Portfolio (Vercel — frontend + Node API)

Everything deploys to **one Vercel project**: React frontend + Express API on the same domain.

- Frontend: static build from `client/`
- Backend: serverless Express at `/api/*` via `api/index.js`
- Database: Neon PostgreSQL

Repo: [github.com/Aman-Sigroha/Portfolio](https://github.com/Aman-Sigroha/Portfolio)

---

## 1. Push latest code

```bash
git add .
git commit -m "Add Vercel full-stack deployment"
git push origin main
```

---

## 2. Create Vercel project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **Aman-Sigroha/Portfolio**
3. **Root Directory:** leave as `.` (repo root — not `client/`)
4. Vercel reads `vercel.json` at the root automatically

---

## 3. Environment variables (Vercel → Settings → Environment Variables)

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your **Neon pooled** connection string | Use the `-pooler` URL from Neon dashboard |
| `NODE_ENV` | `production` | |
| `CLIENT_ORIGIN` | `https://YOUR-PROJECT.vercel.app` | Your live Vercel URL (no trailing slash) |
| `ADMIN_PASSWORD_HASH` | bcrypt hash from `npm run hash-password --prefix server -- "your-password"` | Never store the plain password |
| `JWT_SECRET` | Random string, 32+ chars | e.g. `openssl rand -base64 48` |
| `ADMIN_SESSION_HOURS` | `8` | Optional — login session length |

**Do not set `VITE_API_URL`** on Vercel — the API lives on the same domain at `/api/...`, so the client uses relative paths automatically.

**Admin inbox:** `https://YOUR-PROJECT.vercel.app/admin/login` (not linked publicly from the site).

---

## 4. Deploy

Click **Deploy**. Vercel will:

1. `npm install` in `client/` and `server/`
2. Build the Vite app → `client/dist`
3. Deploy `api/index.js` as a serverless function

---

## 5. Verify

After deploy, test these URLs (replace with your domain):

- `https://YOUR-PROJECT.vercel.app` — site loads
- `https://YOUR-PROJECT.vercel.app/api/health` — `{ "status": "ok" }`
- `https://YOUR-PROJECT.vercel.app/api/projects` — project JSON
- Contact form on `/contact`
- Download CV button → `/api/resume/download`

---

## Local development (unchanged)

Terminal 1 — API:

```bash
cd server
npm run dev
```

Terminal 2 — frontend:

```bash
cd client
npm run dev
```

Vite proxies `/api` → `localhost:3001`. No `VITE_API_URL` needed locally.

### Admin inbox (local)

1. Generate a password hash:

```bash
npm run hash-password --prefix server -- "your-strong-password-here"
```

2. Add to your root `.env`:

```
ADMIN_PASSWORD_HASH=<paste hash from step 1>
JWT_SECRET=<random 32+ character string>
```

3. Restart the server, then open `http://localhost:5173/admin/login`.

---

## Resume PDF

Production CV path:

`server/assets/resume/Aman_Sigroha_Resume.pdf`

Update this file and redeploy when your resume changes.

---

## Custom domain (optional)

Vercel → Project → Settings → Domains → add your domain.

Then update `CLIENT_ORIGIN` to `https://yourdomain.com` and redeploy.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| API 404 on Vercel | Root Directory must be repo root, not `client/` |
| DB connection errors | Use Neon **pooled** connection string in `DATABASE_URL` |
| CORS errors | Set `CLIENT_ORIGIN` to exact Vercel URL |
| CV download 404 | Add PDF to `server/assets/resume/` and redeploy |
| Admin login fails | Set `ADMIN_PASSWORD_HASH` + `JWT_SECRET` on Vercel |
| Page refresh 404 | Root `vercel.json` SPA rewrite handles this |

---

## Railway (optional)

`server/railway.toml` is still there if you ever want a separate API host. For Vercel-only, you can ignore Railway.

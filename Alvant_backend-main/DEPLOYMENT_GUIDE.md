# 🚀 Complete Vercel Deployment Guide

## 📋 Table of Contents
1. [Backend Deployment](#backend-deployment)
2. [Frontend Deployment](#frontend-deployment)
3. [Connecting Frontend & Backend](#connecting-frontend--backend)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Testing](#testing)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 Backend Deployment

### Prerequisites
- [x] GitHub account
- [x] Vercel account (free tier works)
- [x] MongoDB Atlas database (free tier available)

### Step 1: Prepare Your Backend
Your backend is now **ready for deployment**! ✅

The code includes:
- ✅ Optimized for Vercel serverless functions
- ✅ MongoDB connection pooling
- ✅ CORS configuration for multiple origins
- ✅ Error handling
- ✅ Health check endpoint

### Step 2: Deploy Backend to Vercel

#### Option A: Using Vercel Dashboard (Recommended)

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Your Repository**
   - Click "Add New" → "Project"
   - Select your repository: `kishanpatel486630/divy_frontend`
   - Choose the backend folder if needed

3. **Configure Project**
   - Framework Preset: **Other**
   - Root Directory: `./` (or point to backend folder if in monorepo)
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Install Command: `npm install`

4. **Add Environment Variables**
   Click "Environment Variables" and add these:

   **REQUIRED:**
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/dbname
   ADMIN_JWT_SECRET = your_secret_key_min_32_characters
   ADMIN_EMAIL = admin@yourdomain.com
   ```

   **OPTIONAL (Recommended):**
   ```
   CORS_ORIGIN = https://your-frontend.vercel.app
   NODE_ENV = production
   EMAIL_USER = your-email@gmail.com
   EMAIL_PASS = your-gmail-app-password
   EMAIL_FROM = your-email@gmail.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (~2 minutes)
   - Your backend will be live at: `https://your-project.vercel.app`

#### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to your backend directory
cd Alvant_backend-main

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

### Step 3: Get Your Backend URL
After deployment, you'll get a URL like:
```
https://your-backend-name.vercel.app
```

**Test it immediately:**
```bash
curl https://your-backend-name.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "database": "connected",
  "connected": true
}
```

---

## 🎨 Frontend Deployment

### Step 1: Update Frontend Configuration

In your frontend project, update the API base URL:

**For React/Vite:**
```javascript
// src/config/api.js or .env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend.vercel.app';

export default API_BASE_URL;
```

**Create .env file in frontend:**
```env
VITE_API_URL=https://your-backend-name.vercel.app
```

### Step 2: Deploy Frontend to Vercel

#### Option A: Vercel Dashboard

1. **Import Frontend Repository**
   - Go to Vercel Dashboard
   - Click "Add New" → "Project"
   - Select your frontend repository

2. **Configure Build Settings**
   - Framework Preset: **Vite** (or React/Next.js)
   - Root Directory: `./` (or frontend folder)
   - Build Command: `npm run build`
   - Output Directory: `dist` (for Vite) or `build` (for CRA)
   - Install Command: `npm install`

3. **Add Environment Variables**
   ```
   VITE_API_URL = https://your-backend-name.vercel.app
   ```
   
   For Create React App:
   ```
   REACT_APP_API_URL = https://your-backend-name.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Your frontend will be live at: `https://your-frontend.vercel.app`

#### Option B: Vercel CLI

```bash
# Navigate to frontend directory
cd your-frontend-folder

# Deploy
vercel --prod
```

---

## 🔗 Connecting Frontend & Backend

### Step 1: Update Backend CORS Settings

After getting your frontend URL, update the backend environment variable:

1. Go to Vercel Dashboard → Your Backend Project
2. Settings → Environment Variables
3. Add/Update:
   ```
   CORS_ORIGIN = https://your-frontend.vercel.app
   FRONTEND_URL = https://your-frontend.vercel.app
   ```
4. Redeploy backend (Vercel → Deployments → Redeploy)

### Step 2: Update Frontend API Calls

**Example API Service (frontend):**

```javascript
// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies/auth
});

// Contact Form
export const submitContact = async (data) => {
  const response = await api.post('/api/contact', data);
  return response.data;
};

// Register Interest
export const registerInterest = async (data) => {
  const response = await api.post('/api/register', data);
  return response.data;
};

// Admin Login
export const adminLogin = async (email) => {
  const response = await api.post('/api/admin/login', { email });
  return response.data;
};

// Verify OTP
export const verifyOTP = async (email, otp) => {
  const response = await api.post('/api/admin/verify-otp', { email, otp });
  return response.data;
};

export default api;
```

---

## 🔐 Environment Variables Setup

### Backend Environment Variables (Vercel Dashboard)

Navigate to: **Vercel Dashboard → Your Backend Project → Settings → Environment Variables**

| Variable Name | Value | Required |
|---------------|-------|----------|
| `MONGODB_URI` | Your MongoDB connection string | ✅ Yes |
| `ADMIN_JWT_SECRET` | Random 32+ character string | ✅ Yes |
| `ADMIN_EMAIL` | Admin email address | ✅ Yes |
| `CORS_ORIGIN` | Frontend URL | ⚠️ Recommended |
| `EMAIL_USER` | Gmail address | ⚠️ For OTP |
| `EMAIL_PASS` | Gmail app password | ⚠️ For OTP |
| `NODE_ENV` | production | ⚠️ Recommended |

### Frontend Environment Variables

| Variable Name | Value | Required |
|---------------|-------|----------|
| `VITE_API_URL` | Backend URL | ✅ Yes |

### How to Get MongoDB URI

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster (if not exists)
3. Database Access → Add Database User
4. Network Access → Add IP Address → Allow from Anywhere (0.0.0.0/0)
5. Database → Connect → Connect Your Application
6. Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

### How to Get Gmail App Password

1. Go to [Google Account](https://myaccount.google.com)
2. Security → 2-Step Verification (enable if not enabled)
3. App Passwords → Select "Mail" and "Other"
4. Generate password
5. Use this 16-character password in `EMAIL_PASS`

---

## ✅ Testing Your Deployment

### Test Backend Endpoints

```bash
# Health Check
curl https://your-backend.vercel.app/api/health

# Root Endpoint
curl https://your-backend.vercel.app/

# Test Contact Form (POST)
curl -X POST https://your-backend.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "1234567890",
    "message": "Test message",
    "categories": ["Category1"]
  }'
```

### Test Frontend

1. Open: `https://your-frontend.vercel.app`
2. Try contact form submission
3. Check browser console for errors
4. Check Network tab for API calls

---

## 🐛 Troubleshooting

### Issue: "Database connection failed"
**Solution:**
- Verify `MONGODB_URI` in Vercel environment variables
- Check MongoDB Atlas network access (allow 0.0.0.0/0)
- Verify database user credentials
- Redeploy after adding variables

### Issue: CORS Error in Frontend
**Solution:**
- Add frontend URL to `CORS_ORIGIN` in backend
- Add `FRONTEND_URL` variable
- Ensure `withCredentials: true` in frontend axios config
- Redeploy backend after changes

### Issue: Email OTP not sending
**Solution:**
- Verify `EMAIL_USER` and `EMAIL_PASS` are set
- Use Gmail App Password (not regular password)
- Check email service in Vercel logs
- In development, OTP is logged to console

### Issue: 404 on Backend Routes
**Solution:**
- Ensure `vercel.json` exists in root
- Check routes start with `/api/`
- Verify deployment logs in Vercel dashboard

### Issue: Environment Variables Not Working
**Solution:**
- Environment variables require redeployment
- Go to Vercel → Deployments → Redeploy
- Check variable names (case-sensitive)
- Variables must not have quotes in Vercel dashboard

### Check Vercel Logs
```bash
# Install Vercel CLI
npm install -g vercel

# View logs
vercel logs <deployment-url>
```

Or in Vercel Dashboard:
**Projects → Your Project → Deployments → Click Deployment → View Function Logs**

---

## 📝 Post-Deployment Checklist

Backend:
- [ ] MongoDB connected successfully
- [ ] `/api/health` returns connected status
- [ ] Environment variables configured
- [ ] CORS allows frontend domain
- [ ] Email sending works (test admin login)

Frontend:
- [ ] Site loads successfully
- [ ] API calls reach backend
- [ ] No CORS errors in console
- [ ] Forms submit successfully
- [ ] Environment variables set

---

## 🔄 Continuous Deployment

### Automatic Deployments
Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update: description"
git push origin main
```

Vercel will:
1. Detect the push
2. Build and deploy automatically
3. Send you an email when done

### Preview Deployments
Every pull request gets a preview URL automatically!

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables
3. Test endpoints individually
4. Check MongoDB connection
5. Review browser console errors

---

## 🎉 You're Done!

Your full-stack application is now live on Vercel!

**Backend:** `https://your-backend.vercel.app`
**Frontend:** `https://your-frontend.vercel.app`

Remember to:
- Keep your `.env` files private (never commit them)
- Use strong passwords and secrets
- Monitor your MongoDB usage
- Check Vercel analytics

Happy coding! 🚀

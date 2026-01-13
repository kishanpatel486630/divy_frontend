"# Alvant Backend API

🚀 **Production-ready Express.js backend for Alvant, optimized for Vercel deployment**

## ✨ Features

- ✅ RESTful API with Express.js
- ✅ MongoDB with connection pooling
- ✅ Admin authentication with JWT & OTP
- ✅ Contact form & registration handling
- ✅ Email notifications with Nodemailer
- ✅ CORS configured for multiple origins
- ✅ Vercel serverless optimization
- ✅ Health check endpoints
- ✅ Comprehensive error handling

## 🚀 Quick Deploy to Vercel

### One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kishanpatel486630/divy_frontend)

### Manual Deployment

1. **Clone & Install**
   ```bash
   git clone https://github.com/kishanpatel486630/divy_frontend.git
   cd Alvant_backend-main
   npm install
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

3. **Configure Environment Variables** (in Vercel Dashboard)
   - `MONGODB_URI` - Your MongoDB connection string ✅ Required
   - `ADMIN_JWT_SECRET` - JWT secret key ✅ Required
   - `ADMIN_EMAIL` - Admin email address ✅ Required
   - `CORS_ORIGIN` - Your frontend URL
   - `EMAIL_USER` - Gmail address for OTP
   - `EMAIL_PASS` - Gmail app password

4. **Done!** 🎉
   Your API is live at: `https://your-project.vercel.app`

## 📚 Complete Documentation

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for:
- Detailed deployment steps
- Frontend connection guide
- Environment variables setup
- Troubleshooting tips
- Testing instructions

## 📡 API Endpoints

### Public Endpoints
- `GET /` - API information
- `GET /api/health` - Health check

### Contact & Registration
- `POST /api/contact` - Submit contact form
- `POST /api/register` - Register interest

### Admin Authentication
- `POST /api/admin/login` - Request OTP
- `POST /api/admin/verify-otp` - Verify OTP & get token
- `GET /api/admin/submissions` - Get all submissions (protected)
- `GET /api/admin/register-interests` - Get registrations (protected)

## 🛠️ Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   ```bash
   cp .env.example .env
   # Edit .env with your values
   ```

3. **Run locally**
   ```bash
   npm start
   # or with nodemon
   npm run dev
   ```

4. **Test API**
   ```bash
   curl http://localhost:5000/api/health
   ```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ Yes |
| `ADMIN_JWT_SECRET` | Secret for JWT tokens | ✅ Yes |
| `ADMIN_EMAIL` | Admin email for login | ✅ Yes |
| `CORS_ORIGIN` | Frontend URL | Recommended |
| `EMAIL_USER` | Gmail for sending OTP | For OTP |
| `EMAIL_PASS` | Gmail app password | For OTP |
| `NODE_ENV` | Environment (production/development) | Optional |

## 📁 Project Structure

```
Alvant_backend-main/
├── app.js                 # Main application entry
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies
├── config/
│   └── database.js       # MongoDB connection
├── middleware/
│   └── auth.js           # JWT authentication
├── models/
│   ├── Admin.js          # Admin model
│   ├── Contact.js        # Contact form model
│   └── RegisterInterest.js # Registration model
├── routes/
│   ├── admin.js          # Admin routes
│   ├── contact.js        # Contact routes
│   └── register.js       # Registration routes
├── scripts/
│   ├── manageAdmins.js   # Admin management
│   └── seedAdmin.js      # Seed admin user
└── utils/
    └── email.js          # Email service
```

## 🧪 Testing

### Test Health Endpoint
```bash
curl https://your-backend.vercel.app/api/health
```

### Test Contact Form
```bash
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

## 🔗 Connect Frontend

In your frontend project:

```javascript
// .env
VITE_API_URL=https://your-backend.vercel.app

// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const submitContact = (data) => api.post('/api/contact', data);
```

## 🐛 Troubleshooting

### Database Connection Failed
- Verify `MONGODB_URI` in environment variables
- Allow all IPs (0.0.0.0/0) in MongoDB Atlas
- Redeploy after adding variables

### CORS Errors
- Add frontend URL to `CORS_ORIGIN`
- Include `withCredentials: true` in frontend
- Redeploy backend

### Email Not Sending
- Use Gmail App Password (not regular password)
- Enable 2-Step Verification in Google Account
- Check Vercel function logs

## 📞 Support

- Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- Review Vercel deployment logs
- Test endpoints individually

## 📄 License

MIT License

---

**Made with ❤️ for Alvant**" 

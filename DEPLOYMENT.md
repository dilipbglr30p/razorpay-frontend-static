# 🚀 Frontend Deployment Guide

## ✅ Configuration Checklist

### 1. Backend URL (app.js)
```javascript
const backendURL = "https://razorpay-supabase-backend-production.up.railway.app";
```
✅ Configured

### 2. CSP Headers (vercel.json)
- ✅ `default-src 'self' https://checkout.razorpay.com https://api.razorpay.com`
- ✅ `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com`
- ✅ `style-src 'self' 'unsafe-inline'`
- ✅ `frame-src https://checkout.razorpay.com https://api.razorpay.com`
- ✅ `connect-src 'self' https://razorpay-supabase-backend-production.up.railway.app https://api.razorpay.com`

---

## 📦 Deploy to Vercel

### Step 1: Commit and Push
```bash
cd frontend
git add .
git commit -m "Point to Railway backend + CSP ready"
git push
```

### Step 2: Deploy on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your Git repository
3. Set **Root Directory** = `frontend/`
4. Click **Deploy**

### Step 3: Access Your Site
```
https://razorpay-frontend-static.vercel.app
```

---

## 🧪 Testing Commands

### 1. Health Check
```bash
curl -i https://razorpay-supabase-backend-production.up.railway.app/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-19T16:04:12.785Z"
}
```

### 2. CORS Preflight Test
```bash
curl -i -X OPTIONS \
  -H "Origin: https://razorpay-frontend-static.vercel.app" \
  -H "Access-Control-Request-Method: POST" \
  -H "Access-Control-Request-Headers: content-type" \
  https://razorpay-supabase-backend-production.up.railway.app/create-order
```

**Expected Headers:**
```
Access-Control-Allow-Origin: https://razorpay-frontend-static.vercel.app
Access-Control-Allow-Methods: GET,POST,OPTIONS
Access-Control-Allow-Headers: Content-Type,Authorization
Access-Control-Allow-Credentials: true
```

### 3. Create Order Test
```bash
curl -i -X POST \
  -H "Origin: https://razorpay-frontend-static.vercel.app" \
  -H "Content-Type: application/json" \
  https://razorpay-supabase-backend-production.up.railway.app/create-order
```

**Expected Response:**
```json
{
  "id": "order_XXXXXX",
  "amount": 50000,
  "currency": "INR",
  ...
}
```

---

## 🎯 Live E2E Test

### Steps:
1. Open: `https://razorpay-frontend-static.vercel.app`
2. Open DevTools → **Network** tab
3. Click **Pay ₹500**

### Expected Network Activity:
```
OPTIONS /create-order → 204 No Content
POST /create-order → 200 OK (JSON order payload)
```

### Railway Logs Should Show:
```
🧾 Creating order...
✅ Order created: order_XXXXXX
```

### Razorpay Checkout:
- Modal should open with payment form
- Use test card: `4111 1111 1111 1111`

---

## 🪝 Configure Razorpay Webhook

### In Razorpay Dashboard → Settings → Webhooks:

**Webhook URL:**
```
https://razorpay-supabase-backend-production.up.railway.app/webhook
```

**Secret:**
```
(same as RAZORPAY_WEBHOOK_SECRET in Railway environment variables)
```

**Events to Subscribe:**
- ✅ `payment.authorized`
- ✅ `payment.captured`
- ✅ `payment.failed`

### After Payment Test:

**Railway Logs Will Show:**
```
✅ Webhook verified: payment.captured
💰 Payment captured: pay_XXXXXX
```

---

## 🔧 Troubleshooting

### Issue: CORS Error
- Verify Railway backend is running: `curl https://...railway.app/health`
- Check CORS origin matches exactly: `https://razorpay-frontend-static.vercel.app`

### Issue: CSP Error
- Check browser console for CSP violations
- Verify `vercel.json` is in the frontend root directory

### Issue: Payment Not Creating
- Check DevTools Network tab for failed requests
- Verify Razorpay credentials are set in Railway environment variables
- Check Railway logs for error messages

---

## 🎉 Success Criteria

✅ Health endpoint returns 200 with timestamp
✅ OPTIONS preflight returns proper CORS headers
✅ POST /create-order returns Razorpay order object
✅ Razorpay checkout modal opens on frontend
✅ Payment test completes successfully
✅ Webhook receives payment confirmation

---

**Your deployment is complete!** 🚀


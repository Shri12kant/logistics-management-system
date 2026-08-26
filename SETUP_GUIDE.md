# Pragya Shipping - Setup Guide

## Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- MySQL 8+
- Maven (`mvn` or `mvnw.cmd`)

### 1. Database
```sql
CREATE DATABASE IF NOT EXISTS pragya_shipping;
```

### 2. Backend
```powershell
cd pragyashipping
mvn spring-boot:run
```
API: http://localhost:8080

Set these as environment variables (Windows User env or PowerShell session):

```
DB_PASSWORD=your_mysql_password
JWT_SECRET_KEY=at_least_32_character_secret
CORS_ORIGINS=http://localhost:5173,http://localhost:5174
RAZORPAY_KEY_ID=rzp_test_xxxx
RAZORPAY_KEY_SECRET=xxxxxxxx
```

Spring Boot reads **OS environment variables**, not a `.env` file unless you export them first.

PowerShell example:
```powershell
$env:RAZORPAY_KEY_ID="rzp_test_xxxx"
$env:RAZORPAY_KEY_SECRET="xxxxxxxx"
mvn spring-boot:run
```

### 3. Frontend
```powershell
cd pragya-shipping
npm install
npm run dev
```
Site: http://localhost:5173 (or 5174)

Optional `pragya-shipping/.env`:
```
VITE_API_URL=http://localhost:8080
```

## Admin

Default (only if no admin exists yet):
- Email: `admin@pragyashipping.com`
- Password: `Pragya@Admin2026!Secure`

Change immediately: **Admin → Password**

JWT lasts **8 hours**. Login again if expired.

## Payments (Razorpay)

1. Create account at https://dashboard.razorpay.com
2. Use **Test** keys first
3. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
4. Restart backend
5. Pay from `/quote` or Admin → Shipments → Collect
6. History: Admin → Payments

Live keys only after Razorpay KYC. Test keys never go to production.

## Production

- New JWT secret, new DB password, new admin password
- `CORS_ORIGINS` = live website URL
- Frontend `VITE_API_URL` = live API URL
- Razorpay **live** keys
- Hosting account on mama’s email

```powershell
cd pragyashipping
mvn clean package
java -jar target/pragyashipping-0.0.1-SNAPSHOT.jar
```

```powershell
cd pragya-shipping
npm run build
```
Deploy `dist/`.

## Common issues

| Problem | Fix |
|---------|-----|
| DB connection failed | MySQL running + `DB_PASSWORD` |
| Port 8080 in use | Stop old backend |
| JWT expired | Login again |
| CORS error | Add frontend URL to `CORS_ORIGINS` |
| Pay button error | Razorpay keys not set / backend not restarted |
| Login fails after update | Restart backend, login again (token format `{ token }`) |

## Security

- Never commit `.env` or secrets
- Admin passwords are not returned in APIs
- Public tracking does not show customer phone/email
- Change default admin password after first login

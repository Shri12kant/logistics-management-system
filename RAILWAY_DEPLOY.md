Railway quick guide (backend + MySQL)

1) Create a new project on Railway.
2) Add a MySQL plugin (this will provision a database). Note the connection URL/user/password.
3) Add a new Service (GitHub) and connect your repo; set root to `pragyashipping` for the backend service and build command `mvn -DskipTests package` and start command `java -jar target/pragyashipping-0.0.1-SNAPSHOT.jar`.
4) Set Environment Variables in Railway (under Service > Variables):
   - `DB_PASSWORD` or `SPRING_DATASOURCE_PASSWORD` (as per your config)
   - `JWT_SECRET_KEY`
   - `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`
   - `APP_CORS_ALLOWED_ORIGINS` (set your frontend domain)
5) Deploy and check logs; Railway provides a public URL for the service.

Frontend on Vercel:
- Connect the `pragya-shipping` folder as the Vercel project, set `Build Command` to `npm run build` and `Output Directory` to `dist`. Set env var `VITE_API_URL` to your backend Railway/Render URL.

Notes:
- For automatic deploy from GitHub, add required secrets (Railway does OAuth/Git integration). For Render, use `RENDER_API_KEY` + service IDs as configured in the GitHub Actions.

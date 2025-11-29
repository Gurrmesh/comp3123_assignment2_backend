# Backend - comp3123 Assignment

This backend application provides RESTful APIs for user and employee management. It is built with Node.js, Express, and MongoDB (Mongoose). The app supports image uploads for employee profile pictures and basic JWT-based login (token is optional).

## Features
- Signup & Login (user)
- CRUD operations for Employees
- Search employees by department or position
- Image upload for employee profile pictures
- Validation with `express-validator`

## Endpoints (prefix: `/api/v1`)
- User: POST `/api/v1/user/signup` - Signup new user
- User: POST `/api/v1/user/login` - Login and receive a JWT token
- Employees: GET `/api/v1/emp/employees` - List employees
- Employees: GET `/api/v1/emp/employees/:id` - Get by id
- Employees: POST `/api/v1/emp/employees` - Create (with multipart/form-data `profile_picture`)
- Employees: PUT `/api/v1/emp/employees/:id` - Update (support `profile_picture` upload)
- Employees: DELETE `/api/v1/emp/employees?eid=<id>` - Delete
- Employees: GET `/api/v1/emp/employees/search?position=<p>&department=<d>` - Search by position or department

## Requirements
- Node 18+ (note: Dockerfile uses node:18)
- MongoDB instance (local or cloud)

## Setup (local)
1. Copy `.env.example` to `.env` and fill values (do NOT commit .env to the repo):
```powershell
cp .env.example .env
# Edit .env
```
2. Install dependencies:
```powershell
npm install
```
3. Run in development (with nodemon):
```powershell
npm run dev
```
4. Run production:
```powershell
npm start
```

## Docker
Build and run:
```powershell
docker build -t comp3123-backend .
docker run -p 3000:3000 --env-file .env --name comp3123-backend comp3123-backend
```

When used with docker-compose, you can orchestrate it with a frontend and MongoDB.

## Important Notes
- Do **not** commit your real `.env` (contains secrets). Use `.env.example` to show required env variables.
- Add `uploads` to `.gitignore` to avoid committing uploaded images. For persistent storage consider using S3 or similar.
- Ensure `MONGO_URI` points to your MongoDB instance.
 - If you accidentally pushed sensitive data (for example `.env` with credentials), consider rotating the credentials immediately and remove them from git history using standard tools. One approach to stop tracking sensitive files locally and remove them from future commits:
```powershell
# Stop tracking and remove .env and uploads from repository (local only - will not delete local files)
git rm --cached .env
git rm -r --cached uploads
git commit -m "Remove sensitive files from git tracking"
git push origin main
```
If the keys were already pushed to GitHub, remove them and rotate secrets (e.g., MongoDB user password) and use the BFG or `git filter-branch` to purge them from history if required.

## How to push to GitHub (short steps)
1. Create a repository on GitHub (e.g., `comp3123-101471817_backend_assignment2`).
2. Initialize git locally and push to the remote:
```powershell
git init
git add .
git commit -m "Initial commit - Backend API for assignment"
git branch -M main
git remote add origin https://github.com/<your-account>/<repo-name>.git
git push -u origin main
```
3. Follow GitHub instructions to add remotes, create a repo, or enable GitHub Actions if you wish.

## Postman Tests
- Test the APIs using the endpoints above; attach `jwt_token` in Authorization header `Bearer <token>` if used.

## Contact
If you need help with deployment or connecting the frontend, reach out with specific errors and I can help troubleshoot.

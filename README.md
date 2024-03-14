# LMS-backend
MOOC based Learning Management System for UNNEStizen course activities

## Development
Here the step to run the project locally
1. Clone the project
   ```bash
   git clone https://github.com/UNNESTech-UNNES/LMS-backend.git
   ```
3. Change directory to the project
   ```bash
   cd LMS-backend
   ```
5. Install dependencies
   ```bash
   npm install
   ```
7. Check your credentials on `.env.development`. Make sure you have the correct credentials for your PostgreSQL database. Or create `.env.local` so that it doesn't get tracked by git.
8. Create DB if not exists
   ```bash
   npm run db:create
   ```
10. Run migrations
    ```bash
    npm run migrate
    ```
12. Run seeders
    ```bash
    npm run seed
    ```
14. Run the app
    ```bash
    npm run dev
    ```

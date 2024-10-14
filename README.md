# Repo-Track 📊

**Repo-Track** is a GitHub-inspired app that allows users to explore popular repositories, view profiles, and track liked profiles. It integrates GitHub OAuth for user authentication, allowing users to log in via GitHub and interact with repositories and profiles. Built with the MERN stack (MongoDB, Express, React, Node.js), Repo-Track provides a clean and intuitive UI for developers.

## Features 🚀

- 🔑 **GitHub OAuth Authentication**: Log in using GitHub credentials.
- 👤 **Profile Viewing**: View GitHub profiles and repositories of users.
- 🔍 **Repository Search**: Explore popular repositories by programming language.
- ❤️ **Profile Liking**: Like other users' profiles and see who liked yours.
- 📱 **Responsive Design**: Optimized for various devices.
- 🌐 **Open-Source**: Free and open for contributions.

## Tech Stack 🛠️

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express, Passport.js (GitHub OAuth)
- **Database**: MongoDB
- **Authentication**: Passport.js with GitHub OAuth strategy
- **API**: GitHub REST API for fetching repositories and profiles

## Installation & Setup 💻

To get started with Repo-Track, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mhdZhHan/repo-track.git
   cd repo-track
   ```
2. **Install dependencies and build the app**:
   ```bash
   npm run build
   ```
3. **Set up environment variables**:
   ```env
   GITHUB_API_KEY=<your_github_api_key>
   MONGO_URI=<your_mongodb_uri>
   GITHUB_CLIENT_ID=<your_github_client_id>
   GITHUB_CLIENT_SECRET=<your_github_client_secret>
   CLIENT_BASE_URL=<http://localhost:3000>
   PORT=<500>
   ```
4. **Run the application**:
   ```env
   npm run start
   ```

Your app should now be running on `http://localhost:5000`.

## API Endpoints 🌐

**Authentication Routes**:
- 🔐 `/api/auth/github`: Initiate GitHub OAuth login.
- 🔄 `/api/auth/github/callback`: GitHub OAuth callback.

**User Routes**:
- 👤 `/api/users/profile/:username`: Get the profile and repositories of a GitHub user.
- ❤️ `/api/users/likes`: Get the list of users who liked the authenticated user's profile.
- 👍 `/api/users/like/:username`: Like another user's profile

**Explore Routes**:
- 🌟 `/api/explore/repos/:language`: Get popular repositories by programming language.

## Scripts 📜
- `npm run dev`: Start the app in development mode (both server and client).
- `npm run build`: Build the React app for production.
- `npm run start`: Start the server for production.


# CineStream – Netflix-Style Streaming App

CineStream is a Netflix-inspired streaming platform built with **React** and powered by **Supabase** for authentication, database, and realtime features.  
It includes interactive features like movie browsing, personalized profiles, and **CineCircle – Group Watch with Real-Time Sync + Chat**.  

---

##  Live Demo
🔗 [View Deployed Project](#)  
Link: https://cinestream-app.vercel.app/home(#)

---

##  Features
-  **User Authentication** with Supabase (Sign up, Login, Logout)  
-  **Profile Avatars** selection at signup  
- **Dynamic Movie Banners** (Auto-playing previews)  
-  **Categories** like Trending, Top Rated, and Originals (powered by TMDb API)  
-  **Modal Previews** for movie details  
-  **CineCircle – Group Watch**  
  - Real-time video sync  
  - Integrated chat panel for group interaction  
-  Fully **responsive UI** (desktop, tablet, mobile)  

---

##  Tech Stack
**Frontend:** React (CRA), TailwindCSS, Framer Motion, Recharts  
**Backend:** Supabase (Auth, Database, Realtime)  
**API:** TMDb (The Movie Database)  
**Hosting:** Vercel *(recommended)*  

---

##  Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/cinestream.git
cd cinestream

2. Install dependencies
   npm install

3. Set up Environment Variables

Create a .env file in the project root and add:
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key

4. Run the project locally
npm start

5. Build for production
npm run build

Known Issues / Limitations

Video player is currently YouTube trailer based (not full movies).

Group Watch feature requires stable internet for real-time sync.

Deployment may need CORS settings if using custom backend APIs.

✨ Future Improvements

✅ AI-powered movie recommendations

✅ Watchlist & Favorites

✅ Multi-language subtitles

✅ Mobile app version (React Native)

 Contributing:

Contributions, issues, and feature requests are welcome!
Feel free to open a pull request.

License:

This project is licensed under the MIT License.

# Task Master - To-Do List SPA

A beautiful, responsive Single Page Application (SPA) for managing your tasks with image attachments. Built with vanilla JavaScript and Supabase for a modern, serverless architecture.

![Task Master](https://img.shields.io/badge/Status-Active-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 📝 **Create, Read, Update, Delete** tasks
- 🖼️ **Image Attachments** - Attach images to your tasks
- 💾 **Persistent Storage** - All data stored in Supabase (PostgreSQL + Storage)
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations
- 📱 **Responsive** - Works seamlessly on desktop and mobile
- ⚡ **Fast** - Client-side rendering with direct Supabase connection
- 🔒 **Secure** - Row Level Security (RLS) policies enabled

## 🚀 Live Demo

[View Live Demo](#) *(Add your GitHub Pages URL here)*

## 🛠️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Backend**: Supabase (PostgreSQL Database + Storage)
- **Hosting**: GitHub Pages / Vercel / Netlify (Static)
- **Server**: Express.js (for local development only)

## 📦 Installation

### Prerequisites

- Node.js 14+ and npm
- A Supabase account ([Sign up for free](https://supabase.com))

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a new project in [Supabase Dashboard](https://app.supabase.com)
   - Update `public/config.js` with your Supabase credentials:
     ```javascript
     const SUPABASE_URL = 'your-project-url';
     const SUPABASE_ANON_KEY = 'your-anon-key';
     ```

4. **Set up the database**
   - Run the SQL schema (found in `supabase_schema.sql`)
   - Create an `images` storage bucket (public)

5. **Run locally**
   ```bash
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
.
├── public/
│   ├── index.html      # Main HTML file
│   ├── styles.css      # Styling with animations
│   ├── app.js          # Application logic
│   └── config.js       # Supabase configuration
├── server.js           # Static file server (local dev only)
├── package.json        # Dependencies
└── README.md
```

## 🎯 Usage

1. **Add a task**: Type your task and press Enter or click the + button
2. **Add with image**: Click the image button (🖼️), select a file, then add your task
3. **Complete a task**: Click on the task text to mark as complete
4. **Delete a task**: Hover over a task and click the delete icon

## 🌐 Deploying to GitHub Pages

Since this is a pure SPA, you can deploy it to GitHub Pages:

1. **Build for production** (if needed)
   ```bash
   # No build step needed - it's vanilla JS!
   ```

2. **Deploy to GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages
   - Select source: `main` branch and `/` (root)
   - Your app will be available at `https://<username>.github.io/<repo-name>/`

> **Note**: The Express server is only for local development. GitHub Pages serves static files directly.

## 🔐 Security Note

The `SUPABASE_ANON_KEY` in `config.js` is safe to expose publicly as it only allows operations permitted by your Row Level Security (RLS) policies. Never commit your service role key!

## 📝 License

MIT License - feel free to use this project for learning or personal use.

## 🙏 Acknowledgments

- Built with [Supabase](https://supabase.com)
- Icons from [Feather Icons](https://feathericons.com)
- Font: [Inter](https://fonts.google.com/specimen/Inter)

---

Made with ❤️ by [Your Name]

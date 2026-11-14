# Ruhul Ameen — 3D Cinematic Portfolio & Creative Engineering

A high-performance, animation-rich personal portfolio built for **Ruhul Ameen**, a multi-disciplinary creative developer, high-retention video editor, 3D thumbnail designer, and technical SEO engineer based in **Lucknow, India**.

---

## ⚡ Tech Stack

- **Framework**: Next.js 15+ (App Router) with TypeScript & Static Site Generation (SSG)
- **Styling**: Tailwind CSS with cinematic dark & clean light mode tokens
- **3D Graphics**: Three.js + React Three Fiber (`@react-three/fiber`) + `@react-three/drei`
- **Animation**: Framer Motion, GSAP (ScrollTrigger), Lenis smooth scrolling
- **Audio Feedback**: Web Audio API synthesized cues (off by default with nav toggle)
- **Data Architecture**: Single source of truth in `/src/content/projects.ts` + `/src/lib/drive.ts`

---

## 🚀 Getting Started

### 1. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live experience.

### 2. Production Build
```bash
npm run build
npm run start
```

---

## 📁 Content Management (Single File Configuration)

All projects across all 5 domains are managed from:
**`src/content/projects.ts`**

Each entry follows the strict 3-part proof of work architecture:
```typescript
{
  id: 'unique-id',
  slug: 'project-slug',
  category: 'video' | 'thumbnail' | 'web' | 'seo' | 'ai',
  title: 'Project Title',
  thumbnail: 'Drive share link or Image URL',
  videoUrl: 'Drive video link or preview URL',
  link: 'https://live-client-site.com',
  problem: 'Exact bottleneck faced by client...',
  action: 'Engineering and design steps taken...',
  result: 'Quantified outcome (+68% conversion, etc.)...',
  tools: ['Next.js', 'Premiere Pro', ...],
  featured: true,
  anatomy: {
    hook: '...',
    edit: '...',
    thumbnail: '...',
    result: '...'
  }
}
```

---

## ☁️ Google Drive Assets

The `/src/lib/drive.ts` helper automatically transforms standard Google Drive links into:
- **Embeddable Video Player**: `https://drive.google.com/file/d/{ID}/preview`
- **High-Resolution Poster Images**: `https://drive.google.com/thumbnail?id={ID}&sz=w1200`

---

## 🌐 Deploying to Vercel

1. Push this repository to GitHub or GitLab:
   ```bash
   git init
   git add .
   git commit -m "Production release of Ruhul Ameen portfolio"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
2. Navigate to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository. Vercel automatically detects Next.js settings.
4. Click **Deploy**. Your site will build and deploy globally in under 90 seconds.

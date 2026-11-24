import type { Metadata } from 'next';
import { Inter, Syne } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { CustomCursor } from '@/components/cursor/CustomCursor';
import { JsonLd } from '@/components/seo/JsonLd';

import { Preloader } from '@/components/ui/Preloader';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ruhulameen.com'),
  title: {
    default: 'Ruhul Ameen — Social Media Manager, Video Editor & Frontend Developer',
    template: '%s | Ruhul Ameen',
  },
  description:
    'Portfolio of Ruhul Ameen, a multidisciplinary creative developer, high-retention video editor, 3D thumbnail designer, and technical SEO engineer based in Lucknow, India.',
  keywords: [
    'Ruhul Ameen',
    'Video Editor Lucknow',
    'Creative Developer India',
    'Thumbnail Designer',
    'Next.js Developer',
    'Technical SEO Specialist',
    'AI Tools Builder',
  ],
  authors: [{ name: 'Ruhul Ameen' }],
  creator: 'Ruhul Ameen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ruhulameen.com',
    title: 'Ruhul Ameen — Creative Developer & Video Editor',
    description:
      'High-retention storytelling, 3D web applications, high-CTR thumbnail psychology, and automated AI pipelines.',
    siteName: 'Ruhul Ameen Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ruhul Ameen — Creative Developer & Video Editor',
    description:
      'Proven results across video editing, 3D web apps, thumbnails, SEO, and AI workflows.',
    creator: '@ruhulameen',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} ${syne.variable}`}>
      <body className="antialiased selection:bg-[var(--accent,#E5262B)] selection:text-white bg-[#0A0A0B] text-white">
        <Preloader />
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScroll />
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from 'next';
import './globals.css';
import { TopNavigation } from '@/components/navigation/TopNavigation';
import { QuickJumpBar } from '@/components/navigation/QuickJumpBar';
import { TraditionalCvModal } from '@/components/overlays/TraditionalCvModal';
import { profileData } from '@space/portfolio-content';

export const metadata: Metadata = {
  title: `${profileData.name} | ${profileData.title}`,
  description: `${profileData.title} based in ${profileData.location}. Specializing in Java (Spring Boot), C# (ASP.NET Core), Next.js, and distributed microservices. Explore the universe of my engineering journey.`,
  keywords: [
    'Nguyen Bao Duy',
    'Fullstack Engineer',
    'Backend Engineer',
    'Software Engineer',
    'Java',
    'Spring Boot',
    'C#',
    'ASP.NET Core',
    'Next.js',
    'PostgreSQL',
    'SQL Server',
    '3D Portfolio',
    'Vietnam Software Engineer',
  ],
  authors: [{ name: profileData.name, url: profileData.portfolioUrl }],
  creator: profileData.name,
  metadataBase: new URL(profileData.portfolioUrl),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profileData.portfolioUrl,
    title: `${profileData.name} - ${profileData.title}`,
    description: profileData.summary,
    siteName: `${profileData.name} - 3D Developer Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profileData.name} | ${profileData.title}`,
    description: profileData.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: '#030712',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#030712] text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-cyan-500 focus:text-slate-950 focus:rounded-lg focus:font-semibold focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Global Navigation HUD */}
        <header className="fixed top-0 left-0 right-0 z-40">
          <TopNavigation />
        </header>

        {/* Main Content Area */}
        <main id="main-content" className="relative min-h-screen">
          {children}
        </main>

        {/* Bottom Orbit Navigation HUD */}
        <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none no-print">
          <QuickJumpBar />
        </div>

        {/* Traditional CV Overlay Modal (available anywhere) */}
        <TraditionalCvModal />
      </body>
    </html>
  );
}


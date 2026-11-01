import About from '@/components/about';
import ContactSection from '@/components/ContactSection';
import Features from '@/components/feature';
import Hero from '@/components/hero';
import MenuSection from '@/components/menu_section';
import TestimonialsSection from '@/components/Testimonials';
import type { Metadata } from 'next';

// ==========================================
// SEO METADATA
// ==========================================
export const metadata: Metadata = {
  title: 'Aura Bistro | Authentic Mediterranean & Modern Cuisine',
  description: 'Experience handcrafted artisanal dishes made with locally sourced organic ingredients. Reserve your table at Aura Bistro today.',
  keywords: ['restaurant', 'fine dining', 'bistro', 'mediterranean food', 'artisan cuisine'],
  openGraph: {
    title: 'Aura Bistro | Authentic Mediterranean & Modern Cuisine',
    description: 'Handcrafted artisanal dishes made with locally sourced organic ingredients.',
    type: 'website',
  },
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans antialiased selection:bg-amber-500 selection:text-neutral-950">

      {/* ------------------------------------------ */}
      {/* HEADER & NAVIGATION                        */}
      {/* ------------------------------------------ */}

      {/* ------------------------------------------ */}
      {/* HERO SECTION                               */}
      {/* ------------------------------------------ */}
      <Hero />
      {/* ------------------------------------------ */}
      {/* ABOUT SECTION                              */}
      {/* ------------------------------------------ */}
      <About />
      {/* ------------------------------------------ */}
      {/* FEATURES / WHY CHOOSE US                   */}
      {/* ------------------------------------------ */}
      <Features />
      {/* ------------------------------------------ */}
      {/* MENU SECTION                               */}
      {/* ------------------------------------------ */}
      <MenuSection />
      {/* ------------------------------------------ */}
      {/* TESTIMONIALS SECTION                       */}
      {/* ------------------------------------------ */}
      <TestimonialsSection />
      {/* ------------------------------------------ */}
      {/* CONTACT / LOCATION SECTION                 */}
      {/* ------------------------------------------ */}
      <ContactSection />
      {/* ------------------------------------------ */}
      {/* FOOTER                                     */}
      {/* ------------------------------------------ */}

    </div>
  );
}
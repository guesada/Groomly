import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Users, 
  BarChart3, 
  MessageCircle, 
  Star, 
  Bot,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Play
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';
import { AuthRedirect } from '@/components/AuthRedirect';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AuthRedirect />
      <Navbar />
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <CTA />
      <Footer />
    </div>
  );
};
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
import { Stats } from '@/components/Stats';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
};
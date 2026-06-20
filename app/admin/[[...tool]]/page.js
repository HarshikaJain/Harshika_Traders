'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../sanity.config'; // Ensure this path points to your sanity.config.ts

export default function StudioPage() {
  return <NextStudio config={config} />;
}
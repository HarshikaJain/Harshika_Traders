'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config' // This points straight to your sanity.config.js file

export default function StudioPage() {
  return <NextStudio config={config} />
}
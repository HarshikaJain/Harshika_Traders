import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes'; // This now points to your array

export default defineConfig({
  name: 'default',
  title: 'Harshika Traders',
  projectId: 'jcpsiivn', 
  dataset: 'production',
  basePath: '/admin', 
  schema: {
    types: schemaTypes, // This is now correctly receiving an array
  },
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2024-03-11' }),
  ],
});
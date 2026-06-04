import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision'; // Update this line
import {schemaTypes} from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Harshika Traders',
  projectId: 'jcpsiivn', 
  dataset: 'production',
  basePath: '/admin', 
  schema,
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: '2024-03-11' }),
  ],
});
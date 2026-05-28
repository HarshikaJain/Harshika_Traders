import { defineConfig } from 'sanity'; // Add this line right at the top
import { structureTool } from 'sanity/structure';
import { visionTool } from 'sanity/vision';
import { schema } from './sanity/schemaTypes'; // Verify your exact path match

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
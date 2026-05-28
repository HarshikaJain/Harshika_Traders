export default defineConfig({
  name: 'default',
  title: 'Harshika Traders',
  projectId: 'jcpsiivn', // Change this back to your true Project ID
  dataset: 'production',
  basePath: '/admin', 
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
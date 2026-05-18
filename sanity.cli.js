import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({ 
  api: { 
    projectId: 'jcpsiivn', // Your active project ID from the dashboard
    dataset: 'production' 
  } 
})
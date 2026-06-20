import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Harshika Traders',
  projectId: 'jcpsiivn',
  dataset: 'production',
  basePath: '/admin',
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Add this specific item for your Checkout Settings
            S.listItem()
              .title('Checkout Settings')
              .id('checkoutSettings')
              .child(
                S.document()
                  .schemaType('checkoutSettings')
                  .documentId('checkoutSettings') // Forces this to be the only instance
              ),
            // Add all other document types automatically
            ...S.documentTypeListItems().filter(
              (listItem) => !['checkoutSettings'].includes(listItem.getId())
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: '2024-03-11' }),
  ],
});
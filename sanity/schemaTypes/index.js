import product from './product'; // Your existing untouchable product schema
import banner from './banner';   // Add this line safely

export const schemaTypes = {
  types: [product, banner],
};
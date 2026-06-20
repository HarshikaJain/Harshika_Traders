import product from './product'; // Your existing untouchable product schema
import banner from './banner';   
import achievement from './achievement'; // Import the new achievement schema

export const schemaTypes = {
  types: [product, banner, achievement],
};
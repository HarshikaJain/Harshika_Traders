import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: "ovsFMwZlx", // Updated to match your active production project ID
  dataset: "production",
  apiVersion: "2024-03-11",
  useCdn: false, // Set to false to pull the latest un-cached changes instantly
  token: "skY0xxL5hw7V17m6X1GUwR2xxw4nnblOykzshkCbDAqeNBO9fORHX5WStjEk1nCfjpNHi7JcdnHmNC2gxqPeqgWsbDjY1TmYpj7ypea1dBQfR8DL4Euo2OTPAsPawyK6BRxUXp2t9LS1aG9tX6SSExrcb66Wm4PkJcvK2KkkNOxbQSUPYq6i",
});
// Next.js API route example
import type { NextApiRequest, NextApiResponse } from 'next';

// Define the response data type
type Data = {
  name: string
};

// The handler function for the API route
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Respond with a JSON object
  res.status(200).json({ name: 'John Doe' });
}

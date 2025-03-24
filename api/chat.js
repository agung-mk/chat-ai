import ayesoul from '../ayesoul';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, type } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    const response = await ayesoul.request(query, {
      follow: false,
      type: type || 'chat'
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ 
      status: false, 
      code: 500, 
      result: { 
        error: 'Internal server error' 
      } 
    });
  }
} 
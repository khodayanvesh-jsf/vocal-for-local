// api/orders.js
export default function handler(req, res) {
  // Allow cross-origin requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const { customerName, items, totalAmount } = req.body;
    
    // Process test order logic here
    const simulatedOrderId = 'VFL-' + Math.floor(1000 + Math.random() * 9000);
    
    return res.status(200).json({
      success: true,
      orderId: simulatedOrderId,
      message: 'Trial Order successfully captured on serverless backend!',
      details: { customerName, totalAmount, receivedAt: new Date().toISOString() }
    });
  }

  // Fallback GET request to test if API is alive
  return res.status(200).json({
    status: 'Active',
    message: 'VocalForLocal Trial API is working properly.'
  });
}

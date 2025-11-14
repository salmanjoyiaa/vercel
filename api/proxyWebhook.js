const path = require('path');

// Path to the actual handler inside the subfolder
const implPath = path.join(__dirname, '..', 'property-ai-chatbot', 'api', 'proxyWebhook.js');

let handler;
try {
  handler = require(implPath);
} catch (err) {
  // Export a helpful error handler if the real handler can't be loaded
  module.exports = async (req, res) => {
    console.error('Failed to load proxied handler:', err && err.stack ? err.stack : err);
    res.status(500).json({ error: 'Proxy handler load failed', detail: String(err) });
  };
  return;
}

// Re-export the actual handler (works when that module does `module.exports = async (req,res)=>{}`)
module.exports = handler;

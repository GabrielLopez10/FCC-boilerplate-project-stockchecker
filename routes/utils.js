const crypto = require('crypto');

// Function to anonymize an IP address
function anonymizeIP(ip) {
    // Create a SHA-1 hash of the IP address
  const hash = crypto.createHash('sha1').update(ip).digest('hex');
  return hash;
}

module.exports = { anonymizeIP };
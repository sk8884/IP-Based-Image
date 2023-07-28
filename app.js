const express = require('express');
const request = require('request');

const app = express();
const PORT = 3000;

// Function to get the client's IP address from the request object
function getClientIP(req) {
  return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

// Route to get the image URL based on the client's IP address
app.get('/get-image-url', (req, res) => {
  const clientIP = getClientIP(req);
  const imageURL = decideImageURL(clientIP); // Implement your logic here to determine the image URL

  // Return the image URL to the client
  res.send({ imageURL });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Function to decide the image URL based on the client's IP address
function decideImageURL(clientIP) {
  // Here, you can implement your logic to determine which image URL to show based on the client's IP address.
  // For example:
  if (clientIP.startsWith('192.168')) {
    return 'http://example.com/local-image.jpg';
  } else if (clientIP.startsWith('10.')) {
    return 'http://example.com/internal-image.jpg';
  } else {
    return 'http://example.com/default-image.jpg';
  }
}

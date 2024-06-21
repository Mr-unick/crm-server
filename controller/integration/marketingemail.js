 const htmlcontent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4CAF50;
      color: #ffffff;
      text-align: center;
      padding: 20px;
    }
    .header img {
      max-width: 100px;
    }
    .content {
      padding: 20px;
    }
    .content h1 {
      color: #333333;
    }
    .content p {
      color: #666666;
      line-height: 1.5;
    }
    .content .btn {
      display: inline-block;
      padding: 10px 20px;
      margin-top: 20px;
      background-color: #4CAF50;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      background-color: #f4f4f4;
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #666666;
    }
    .footer a {
      color: #4CAF50;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg" alt="Company Logo">
      <h1>Special Offer Just for You!</h1>
    </div>
    <div class="content">
      <h1>Hello, Valued Customer!</h1>
      <p>We are excited to bring you an exclusive offer that you can't resist. For a limited time only, enjoy a special discount on our best-selling products.</p>
      <p>Don't miss out on this opportunity to get premium quality at unbeatable prices. Click the button below to shop now!</p>
      <a href="https://example.com" class="btn">Shop Now</a>
    </div>
    <div class="footer">
      <p>Thank you for being a part of our community. We appreciate your support!</p>
      <p><a href="https://example.com/unsubscribe">Unsubscribe</a> from our mailing list.</p>
    </div>
  </div>
</body>
</html>
`;

 module.exports={htmlcontent}
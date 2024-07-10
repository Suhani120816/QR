import React, { useState } from 'react';
import QRCode from 'qrcode';

const QrCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');

  const generateQrCode = async () => {
    if (!url) {
      setError('Enter The Url');
      setTimeout(() => setError(''), 5000);
      return;
    }
    try {
      const qrCodeUrl = await QRCode.toDataURL(url);
      setQrCode(qrCodeUrl);
    } catch (err) {
      setError('Failed to generate QR Code');
      setTimeout(() => setError(''), 5000);
    }
  };

  const clearQrCode = () => {
    setUrl('');
    setQrCode('');
  };

  return (
    <div className="App">
      <div className="qr-code-generator">
        <h1>
          <img src="/logo.png" alt="Logo" className="logo" />
           Your Qr Generator
        </h1>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
        />
        <div className="button-group">
          <button onClick={generateQrCode}>Generate</button>
          <button onClick={clearQrCode}>Clear</button>
        </div>
        {error && <p className="alert">{error}</p>}
        {qrCode && (
          <div>
            <img src={qrCode} alt="qr-code" className="qr-code" />
            <div className="download-button">
              <a download="qrCode.png" href={qrCode}>
                Download
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrCodeGenerator;


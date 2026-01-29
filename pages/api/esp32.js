// pages/api/esp32.js
// Health check for ESP32 connection

export default async function handler(req, res) {
  try {
    const esp32Ip = process.env.NEXT_PUBLIC_ESP32_IP || 'http://192.168.4.1';
    const esp32Port = process.env.NEXT_PUBLIC_ESP32_PORT || '80';
    
    const response = await fetch(`${esp32Ip}:${esp32Port}/`, {
      method: 'GET',
      timeout: 3000,
    });

    if (response.ok) {
      res.status(200).json({
        connected: true,
        esp32Ip: esp32Ip,
        message: 'ESP32 is online',
      });
    } else {
      res.status(503).json({
        connected: false,
        message: 'ESP32 responded but with error status',
      });
    }
  } catch (error) {
    console.error('ESP32 health check failed:', error);
    res.status(503).json({
      connected: false,
      error: error.message || 'Cannot reach ESP32',
    });
  }
}

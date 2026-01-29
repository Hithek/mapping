// pages/api/plants.js
// Fetch plant data from ESP32

export default async function handler(req, res) {
  try {
    const esp32Ip = process.env.NEXT_PUBLIC_ESP32_IP || 'http://192.168.4.1';
    const esp32Port = process.env.NEXT_PUBLIC_ESP32_PORT || '80';
    
    const response = await fetch(`${esp32Ip}:${esp32Port}/data`, {
      method: 'GET',
      timeout: 5000,
    });

    if (!response.ok) {
      throw new Error(`ESP32 responded with status: ${response.status}`);
    }

    const plants = await response.json();
    res.status(200).json({
      success: true,
      plantCount: plants.length,
      plants: plants,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching from ESP32:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch plant data from ESP32',
    });
  }
}

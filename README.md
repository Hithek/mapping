# ESP32 Field Mapper - Vercel Deployment

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure ESP32 Connection:**
   Create `.env.local` in the root:
   ```
   NEXT_PUBLIC_ESP32_IP=http://192.168.4.1
   NEXT_PUBLIC_ESP32_PORT=80
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```

4. **Deploy to Vercel:**
   ```bash
   vercel
   ```

## Features

- **Real-time field mapping** from ESP32
- **Plant quality visualization** (green = good, red = bad)
- **API routes** to communicate with ESP32
- **Responsive dashboard**
- **Plant data storage & retrieval**

## ESP32 Configuration

Ensure your ESP32 is running in AP mode with:
- SSID: `ESP32_Field_Map`
- Password: `12345678`
- IP: `192.168.4.1`

## API Endpoints

- `GET /api/plants` - Fetch all plants from ESP32
- `POST /api/plants/reset` - Reset plant data
- `GET /api/esp32/health` - Check ESP32 connection

## Project Structure

```
mapping/
├── pages/
│   ├── index.js           # Main dashboard
│   ├── api/
│   │   ├── plants.js      # Plant data endpoints
│   │   └── esp32.js       # ESP32 health check
│   └── _app.js            # Next.js app wrapper
├── components/
│   └── FieldMap.js        # Canvas visualization
├── styles/
│   └── globals.css        # Global styles
├── .env.local             # Environment variables
├── package.json
├── vercel.json
└── next.config.js
```

// components/FieldMap.js
import { useEffect, useRef, useState } from 'react';

export default function FieldMap({ plants }) {
  const canvasRef = useRef(null);
  const [esp32Status, setEsp32Status] = useState('checking...');

  const GRID_SIZE = 40;
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 600;

  useEffect(() => {
    // Check ESP32 connection
    fetch('/api/esp32')
      .then(res => res.json())
      .then(data => {
        setEsp32Status(data.connected ? '🟢 Connected' : '🔴 Disconnected');
      })
      .catch(() => setEsp32Status('🔴 Disconnected'));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    for (let i = 0; i <= CANVAS_WIDTH; i += GRID_SIZE) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_HEIGHT);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }

    // Draw grid labels
    ctx.fillStyle = '#999';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    for (let i = 0; i <= CANVAS_WIDTH; i += GRID_SIZE * 2) {
      ctx.fillText(i / GRID_SIZE, i - 5, 15);
    }

    // Draw plants
    plants.forEach((plant) => {
      const x = (plant.x * GRID_SIZE) + GRID_SIZE / 2;
      const y = (plant.y * GRID_SIZE) + GRID_SIZE / 2;

      // Plant circle
      ctx.fillStyle = plant.q === 1 ? '#00aa00' : '#ff0000';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();

      // Border
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Coordinates text
      ctx.fillStyle = '#000';
      ctx.font = 'bold 9px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${plant.x},${plant.y}`, x, y + 15);
    });
  }, [plants]);

  return (
    <div className="field-map-container">
      <div className="status-bar">
        <span>ESP32 Status: {esp32Status}</span>
        <span>Plants Detected: {plants.length}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="field-canvas"
      />
      <div className="legend">
        <div>
          <span className="legend-good">●</span> Good Quality
        </div>
        <div>
          <span className="legend-bad">●</span> Bad Quality
        </div>
      </div>
    </div>
  );
}

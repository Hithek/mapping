// pages/index.js
import { useState, useEffect } from 'react';
import FieldMap from '../components/FieldMap';

export default function Home() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/plants');
      const data = await response.json();

      if (data.success) {
        setPlants(data.plants || []);
        setLastUpdate(new Date(data.timestamp).toLocaleTimeString());
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch plant data');
      }
    } catch (err) {
      setError(err.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  // Fetch plants on mount
  useEffect(() => {
    fetchPlants();
    const interval = setInterval(fetchPlants, 2000); // Update every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <header>
        <h1>🌾 ESP32 Field Mapper</h1>
        <p>Real-time Plant Detection & Quality Assessment</p>
      </header>

      <main>
        <div className="dashboard">
          <FieldMap plants={plants} />

          <div className="info-panel">
            <h2>Map Information</h2>
            
            {error && <div className="error-message">⚠️ {error}</div>}
            
            {loading && <div className="loading">Loading...</div>}

            <div className="stats">
              <div className="stat-item">
                <span className="label">Total Plants:</span>
                <span className="value">{plants.length}</span>
              </div>
              <div className="stat-item">
                <span className="label">Good Quality:</span>
                <span className="value good">
                  {plants.filter(p => p.q === 1).length}
                </span>
              </div>
              <div className="stat-item">
                <span className="label">Bad Quality:</span>
                <span className="value bad">
                  {plants.filter(p => p.q === 0).length}
                </span>
              </div>
              <div className="stat-item">
                <span className="label">Last Update:</span>
                <span className="value">{lastUpdate || 'Never'}</span>
              </div>
            </div>

            <button onClick={fetchPlants} className="btn-refresh">
              🔄 Refresh Now
            </button>

            <div className="plant-list">
              <h3>Detected Plants</h3>
              <div className="plants-scroll">
                {plants.length === 0 ? (
                  <p className="no-plants">No plants detected yet</p>
                ) : (
                  <table>
                    <thead>
                      <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>Quality</th>
                      </tr>
                    </thead>
                    <tbody>
                      {plants.map((plant, idx) => (
                        <tr key={idx} className={plant.q === 1 ? 'good' : 'bad'}>
                          <td>{plant.x}</td>
                          <td>{plant.y}</td>
                          <td>{plant.q === 1 ? '✓ Good' : '✗ Bad'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <p>ESP32 Field Mapper | Powered by Vercel | Last Updated: {lastUpdate}</p>
      </footer>
    </div>
  );
}

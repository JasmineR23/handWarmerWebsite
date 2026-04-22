import { useEffect, useState } from "react";
import axios from "axios";
import "./HandWarmerList.css";

export default function HandWarmerList() {
  const [handWarmers, setHandWarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHandWarmers = async () => {
      try {
        const res = await axios.get("http://localhost:4000/handwarmers");
        setHandWarmers(res.data);
      } catch (error) {
        console.error("Error fetching hand warmers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHandWarmers();
  }, []);

  if (loading) {
    return <p className="loading">Loading hand warmers...</p>;
  }

  return (
    <div className="handwarmer-list-container">
      <h1>All Hand Warmers</h1>

      <div className="handwarmer-grid">
        {handWarmers.map((hw) => (
          <div key={hw.id} className="handwarmer-card">

            {/* ⭐ REAL IMAGE FROM UPLOADS */}
            <img
              src={`http://localhost:4000/uploads/${hw.image}`}
              alt={hw.name}
              className="handwarmer-img"
            />

            <h2>{hw.name}</h2>

            <p><strong>Quantity:</strong> {hw.quantity}</p>
            <p><strong>Ordered:</strong> {hw.ordered}</p>
            <p><strong>Style:</strong> {hw.style}</p>

            <h3>Materials</h3>

            {hw.materialDetails.map((mat) => (
              <div key={mat.id} className="material-block">
                <p><strong>Colour:</strong> {mat.colour}</p>

                {mat.distribution.map((dist) => (
                  <p key={dist.id}>
                    {dist.material}: {dist.percent}
                  </p>
                ))}
              </div>
            ))}

          </div>
        ))}
      </div>
    </div>
  );
}

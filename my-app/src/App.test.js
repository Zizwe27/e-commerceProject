import { useState } from "react";
import "./App.css";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main style={{ fontFamily: "system-ui", padding: 24 }}>
      <h1>JSX preview demo ✅</h1>
      <p>This is real JSX rendered by React’s dev server.</p>

      <button onClick={() => setCount((c) => c + 1)}>
        Clicks: {count}
      </button>

      <Card>
        <strong>Tip:</strong> Edit <code>src/App.js</code> and save—your browser will live-reload.
      </Card>
    </main>
  );
}

function Card({ children }) {
  return (
    <section style={{ marginTop: 16, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
      {children}
    </section>
  );
}


import "./style.css";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [active, setActive] = useState("Overview");

  const features = [
    "AI Assistant",
    "Task Manager",
    "Expense Tracker",
    "Study Planner",
    "Goal Tracker",
    "Mood Journal"
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F4F0E6",
      color: "#233D35",
      fontFamily: "Arial, sans-serif",
      padding: "30px"
    }}>
      <h1>LIFELINE ✳</h1>
      <p>Your life, organised intelligently.</p>

      <h2>Welcome to LIFELINE</h2>
      <p>Your personal space to plan, grow and achieve.</p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        {["Overview", ...features].map(item => (
          <button
            key={item}
            onClick={() => setActive(item)}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              background: active === item ? "#233D35" : "#E7EFE5",
              color: active === item ? "white" : "#233D35",
              cursor: "pointer"
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div style={{
        marginTop: "30px",
        padding: "25px",
        borderRadius: "18px",
        background: "white"
      }}>
        <h2>{active}</h2>
        {active === "Overview"
          ? <p>Everything you need, in one place.</p>
          : <p>Welcome to your {active}. Your workspace starts here!</p>
        }
      </div>

      <p style={{ marginTop: "40px", color: "#68796F" }}>
        LIFELINE © 2026
      </p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

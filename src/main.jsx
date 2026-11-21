
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function App() {
  const features = [
    "Overview",
    "AI Assistant",
    "Task Manager",
    "Expense Tracker",
    "Study Planner",
    "Goal Tracker",
    "Mood Journal"
  ];

  const [active, setActive] = useState("Overview");
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expense, setExpense] = useState("");
  const [amount, setAmount] = useState("");
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState("");
  const [moods, setMoods] = useState([]);
  const [mood, setMood] = useState("Happy");
  const [note, setNote] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState("");
  const [messages, setMessages] = useState([
    { from: "AI", text: "Hello! Welcome to LIFELINE. How can I help you organize your day?" }
  ]);
  const [chat, setChat] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("lifeline-data");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setTasks(data.tasks || []);
        setExpenses(data.expenses || []);
        setGoals(data.goals || []);
        setMoods(data.moods || []);
        setSubjects(data.subjects || []);
      } catch {
        console.log("Starting with a fresh workspace.");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lifeline-data", JSON.stringify({
      tasks, expenses, goals, moods, subjects
    }));
  }, [tasks, expenses, goals, moods, subjects]);

  const addTask = () => {
    if (!task.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: task, done: false }]);
    setTask("");
  };

  const addExpense = () => {
    if (!expense.trim() || Number(amount) <= 0) return;
    setExpenses([...expenses, {
      id: Date.now(),
      name: expense,
      amount: Number(amount)
    }]);
    setExpense("");
    setAmount("");
  };

  const addGoal = () => {
    if (!goal.trim()) return;
    setGoals([...goals, { id: Date.now(), text: goal, done: false }]);
    setGoal("");
  };

  const addSubject = () => {
    if (!subject.trim()) return;
    setSubjects([...subjects, { id: Date.now(), text: subject }]);
    setSubject("");
  };

  const addMood = () => {
    if (!note.trim()) return;
    setMoods([...moods, {
      id: Date.now(),
      mood,
      note,
      date: new Date().toLocaleDateString()
    }]);
    setNote("");
  };

  const sendMessage = () => {
    if (!chat.trim()) return;
    setMessages([
      ...messages,
      { from: "You", text: chat },
      {
        from: "LIFELINE",
        text: "Thanks for sharing! Let's break things into small, manageable steps. I'm currently in demo mode."
      }
    ]);
    setChat("");
  };

  const card = {
    background: "#FFFFFF",
    padding: "24px",
    borderRadius: "18px",
    marginTop: "20px",
    boxShadow: "0 3px 15px rgba(35,61,53,0.06)"
  };

  const input = {
    padding: "12px",
    border: "1px solid #DCE5D9",
    borderRadius: "9px",
    fontSize: "15px",
    margin: "5px",
    maxWidth: "100%"
  };

  const btn = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "9px",
    background: "#29483E",
    color: "white",
    cursor: "pointer",
    margin: "5px"
  };

  const heading = {
    color: "#29483E",
    marginTop: 0
  };

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const list = (items, render) => (
    <div style={{ marginTop: "18px" }}>
      {items.length === 0
        ? <p style={{ color: "#829087" }}>Nothing here yet. Add your first one!</p>
        : items.map(render)}
    </div>
  );

  const panel = () => {
    switch (active) {
      case "Overview":
        return (
          <div style={card}>
            <h2 style={heading}>Your LIFELINE Dashboard</h2>
            <p>Everything you need, in one place.</p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))",
              gap: "12px",
              marginTop: "22px"
            }}>
              {[
                ["Tasks", tasks.filter(t => !t.done).length],
                ["Goals", goals.length],
                ["Study Subjects", subjects.length],
                ["Total Expenses", "₹" + total]
              ].map(([name, value]) => (
                <div key={name} style={{
                  background: "#E9F0E6",
                  padding: "20px",
                  borderRadius: "12px"
                }}>
                  <h3 style={heading}>{value}</h3>
                  <p>{name}</p>
                </div>
              ))}
            </div>
            <h3 style={heading}>Welcome to your personal space!</h3>
            <p>Plan your day, track your progress and work towards your goals.</p>
          </div>
        );

      case "AI Assistant":
        return (
          <div style={card}>
            <h2 style={heading}>AI Assistant</h2>
            <p>Your personal organizing companion.</p>
            <div style={{
              background: "#F4F0E6",
              padding: "15px",
              borderRadius: "12px",
              minHeight: "150px"
            }}>
              {messages.map((m, i) => (
                <p key={i}><b>{m.from}:</b> {m.text}</p>
              ))}
            </div>
            <input style={input} value={chat}
              onChange={e => setChat(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..." />
            <button style={btn} onClick={sendMessage}>Send</button>
            <p style={{ color: "#829087", fontSize: "12px" }}>
              Demo assistant. Live AI connection will be added separately.
            </p>
          </div>
        );

      case "Task Manager":
        return (
          <div style={card}>
            <h2 style={heading}>Task Manager</h2>
            <p>Organize everything you need to do.</p>
            <input style={input} value={task}
              onChange={e => setTask(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTask()}
              placeholder="Enter a new task..." />
            <button style={btn} onClick={addTask}>+ Add Task</button>
            {list(tasks, t => (
              <div key={t.id} style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
                <label>
                  <input type="checkbox" checked={t.done}
                    onChange={() => setTasks(tasks.map(x =>
                      x.id === t.id ? { ...x, done: !x.done } : x
                    ))} />
                  <span style={{ marginLeft: "10px", textDecoration: t.done ? "line-through" : "none" }}>
                    {t.text}
                  </span>
                </label>
                <button style={{ ...btn, background: "#A5B6A5" }}
                  onClick={() => setTasks(tasks.filter(x => x.id !== t.id))}>Delete</button>
              </div>
            ))}
          </div>
        );

      case "Expense Tracker":
        return (
          <div style={card}>
            <h2 style={heading}>Expense Tracker</h2>
            <h3>Total recorded: ₹{total}</h3>
            <input style={input} value={expense}
              onChange={e => setExpense(e.target.value)}
              placeholder="Expense name" />
            <input style={input} type="number" min="0" value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Amount (₹)" />
            <button style={btn} onClick={addExpense}>Add Expense</button>
            {list(expenses, x => (
              <p key={x.id}>
                {x.name} — ₹{x.amount}
                <button style={btn}
                  onClick={() => setExpenses(expenses.filter(e => e.id !== x.id))}>Delete</button>
              </p>
            ))}
          </div>
        );

      case "Study Planner":
        return (
          <div style={card}>
            <h2 style={heading}>Study Planner</h2>
            <p>Keep your subjects organized.</p>
            <input style={input} value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Enter subject or study topic" />
            <button style={btn} onClick={addSubject}>Add Subject</button>
            {list(subjects, s => (
              <p key={s.id}>
                📚 {s.text}
                <button style={btn}
                  onClick={() => setSubjects(subjects.filter(x => x.id !== s.id))}>Delete</button>
              </p>
            ))}
          </div>
        );

      case "Goal Tracker":
        return (
          <div style={card}>
            <h2 style={heading}>Goal Tracker</h2>
            <p>Small steps create big achievements.</p>
            <input style={input} value={goal}
              onChange={e => setGoal(e.target.value)}
              placeholder="Write a goal..." />
            <button style={btn} onClick={addGoal}>Add Goal</button>
            {list(goals, g => (
              <p key={g.id}>
                <input type="checkbox" checked={g.done}
                  onChange={() => setGoals(goals.map(x =>
                    x.id === g.id ? { ...x, done: !x.done } : x
                  ))} />
                <span style={{ marginLeft: "10px", textDecoration: g.done ? "line-through" : "none" }}>
                  {g.text}
                </span>
                <button style={btn}
                  onClick={() => setGoals(goals.filter(x => x.id !== g.id))}>Delete</button>
              </p>
            ))}
          </div>
        );

      case "Mood Journal":
        return (
          <div style={card}>
            <h2 style={heading}>Mood Journal</h2>
            <p>Take a moment to reflect on your day.</p>
            <select style={input} value={mood}
              onChange={e => setMood(e.target.value)}>
              {["Happy", "Calm", "Excited", "Okay", "Stressed", "Sad"].map(m =>
                <option key={m}>{m}</option>
              )}
            </select>
            <textarea style={{ ...input, display: "block", width: "90%", minHeight: "90px" }}
              value={note} onChange={e => setNote(e.target.value)}
              placeholder="Write about your day..." />
            <button style={btn} onClick={addMood}>Save Entry</button>
            {list(moods, m => (
              <div key={m.id} style={{ borderBottom: "1px solid #eee", padding: "12px" }}>
                <b>{m.mood}</b> · {m.date}
                <p>{m.note}</p>
                <button style={btn}
                  onClick={() => setMoods(moods.filter(x => x.id !== m.id))}>Delete</button>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F4F0E6",
      color: "#29483E",
      fontFamily: "Arial, sans-serif",
      padding: "30px"
    }}>
      <h1 style={{ letterSpacing: "3px" }}>LIFELINE ✳</h1>
      <p>Your life, organised intelligently.</p>
      <h2>Welcome to LIFELINE</h2>
      <p>Your personal space to plan, grow and achieve.</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {features.map(f => (
          <button key={f} onClick={() => setActive(f)}
            style={{
              ...btn,
              background: active === f ? "#29483E" : "#E7EEE4",
              color: active === f ? "white" : "#29483E"
            }}>
            {f}
          </button>
        ))}
      </div>

      {panel()}

      <footer style={{ marginTop: "35px", color: "#829087" }}>
        LIFELINE © 2026
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

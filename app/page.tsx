"use client";

import { useState, useEffect } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // Fetch todos when page loads
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  // Add a new todo
  async function addTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const newTodo = await res.json();
    setTodos([...todos, newTodo]);
    setInput("");
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>My To-Do List</h1>
      
      <form onSubmit={addTodo} style={{ marginBottom: "1rem" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new task..."
          style={{ padding: "0.5rem", marginRight: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add
        </button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "0.5rem" }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </main>
  );
}
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
        setLoading(false);
      });
  }, []);

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

  const remaining = todos.filter((t) => !t.completed).length;
  const completed = todos.length - remaining;

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            My To-Do List
          </h1>
          <p className="text-gray-500 text-sm">
            {todos.length === 0
              ? "No tasks yet — add one below!"
              : `${remaining} remaining · ${completed} completed`}
          </p>
        </div>

        {/* Input form */}
        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition text-gray-700"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold rounded-xl transition shadow-md shadow-indigo-200"
          >
            Add
          </button>
        </form>

        {/* Todo list */}
        {loading ? (
          <p className="text-center text-gray-400 py-8">Loading...</p>
        ) : (
          <ul className="space-y-2 max-h-96 overflow-y-auto">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-indigo-50 transition border border-transparent hover:border-indigo-100"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400 group-hover:bg-indigo-600 transition" />
                <span className="text-gray-700 group-hover:text-gray-900 transition">
                  {todo.text}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Built with Next.js · Deployed on Vercel
        </p>
      </div>
    </main>
  );
}
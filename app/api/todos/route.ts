import { NextResponse } from "next/server";

// This is your temporary "database"
let todos: { id: number; text: string; completed: boolean }[] = [
  { id: 1, text: "Learn Next.js", completed: false },
];

// GET: Fetch all todos
export async function GET() {
  return NextResponse.json(todos);
}

// POST: Create a new todo
export async function POST(request: Request) {
  const body = await request.json();
  const newTodo = {
    id: Date.now(),
    text: body.text,
    completed: false,
  };
  todos.push(newTodo);
  return NextResponse.json(newTodo, { status: 201 });
}
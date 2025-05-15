import {useEffect, useState } from "react";
import { TodoProvider } from "./context";
import "./App.css";
import { TodoForm } from "./components/TodoForm.jsx";
import { TodoItem } from "./components/TodoItem.jsx";
import ThemeBtn from "./components/ThemeBtn";
import { ThemeContext, useTheme,ThemeProvider } from "./context";


export default function App() {
  const [todos, setTodos] = useState([]);
  const [themeMode, setThemeMode] = useState("light");

  // Theme logic
  const darkTheme = () => {
    setThemeMode("dark");
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
  };

  const lightTheme = () => {
    setThemeMode("light");
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      darkTheme();
    } else {
      lightTheme();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  // Todo logic
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <TodoProvider value={{ todos, addTodo, deleteTodo, toggleComplete, updateTodo }}>

        <div className="bg-white dark:bg-[#000000] min-h-screen py-8 transition-colors duration-300">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 mt-12 bg-white dark:bg-white/10 text-black dark:text-white backdrop-blur-sm transition-all duration-300">

            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-center">Manage Your Todos</h1>
              <ThemeBtn useTheme={useTheme} />
            </div>

            <div className="mb-4">
              <TodoForm />
            </div>
           
            <div className="flex flex-wrap gap-y-3">
              {todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          
          </div>
        </div>
      
      </TodoProvider>
    </ThemeProvider>
  );
}

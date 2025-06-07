import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
interface TodoItem {
  id: number;
  name: string;
  isCompleted: boolean;
}
function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [text, setText] = useState("");
  const [filteredStatus, setFilteredStatus] = useState(0);
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredStatus(Number(e.target.value));
  };
  const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleChange = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      })
    );
  };
  const addTodo = () => {
    setTodos((todos) => [
      ...todos,
      {
        id: todos.length + 1,
        name: text,
        isCompleted: false,
      },
    ]);
    setText("");
  };
  const filteredTodos = todos.filter((todo) => {
    if (filteredStatus === 1) {
      return todo.isCompleted;
    } else if (filteredStatus == 2) {
      return !todo.isCompleted;
    }
    return todo;
  });
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={changeText}
            value={text}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
            onClick={addTodo}
          >
            Add
          </button>
        </div>
        <div className="flex gap-6 justify-center mt-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="filter"
              id="filter_all"
              value="0"
              className="w-4 h-4 text-blue-500 focus:ring-blue-500 focus:ring-2 cursor-pointer"
              checked={filteredStatus === 0}
              onChange={handleRadioChange}
            />
            <span className="text-gray-700 select-none">All</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="filter"
              id="filter_completed"
              value="1"
              className="w-4 h-4 text-blue-500 focus:ring-blue-500 focus:ring-2 cursor-pointer"
              checked={filteredStatus === 1}
              onChange={handleRadioChange}
            />
            <span className="text-gray-700 select-none">Completed</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="filter"
              id="filter_active"
              value="2"
              className="w-4 h-4 text-blue-500 focus:ring-blue-500 focus:ring-2 cursor-pointer"
              checked={filteredStatus === 2}
              onChange={handleRadioChange}
            />
            <span className="text-gray-700 select-none">Active</span>
          </label>
        </div>
        <div className="mt-4">
          {filteredTodos.map(({ id, name, isCompleted }) => (
            <div className="flex flex-row justify-between" key={id}>
              <div className="flex-1">{name}</div>
              <div className="">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  checked={isCompleted}
                  onChange={() => handleChange(id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

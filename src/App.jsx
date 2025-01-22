import { useEffect, useState } from "react";
import "./App.css";
import { MdCheck } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function App() {
  const [inputValue, setInputValue] = useState({ content: "", checked: false });
  const [task, setTask] = useState([]);
  const [dateTime, setDateTime] = useState("");

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!inputValue.content.trim()) return (alert("add some task")); // Prevent empty tasks

    const newTask = {
      id: Date.now(), // Unique ID based on timestamp
      content: inputValue.content.trim(),
      checked: false,
    };

    const taskExists = task.some(
      (currTask) => currTask.content === newTask.content
    );
    if (taskExists) return; // Prevent duplicate tasks

    setTask((prevTask) => [...prevTask, newTask]);
    setInputValue({ content: "", checked: false }); // Reset input field
  };

  // Handle input changes
  const handleInputChange = (value) => {
    setInputValue({ ...inputValue, content: value });
  };

  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTask((prevTask) =>
      prevTask.filter((currTask) => currTask.id !== taskId)
    );
  };

  // Toggle task completion
  const handleToggleComplete = (taskId) => {
    setTask((prevTask) =>
      prevTask.map((currTask) =>
        currTask.id === taskId
          ? { ...currTask, checked: !currTask.checked }
          : currTask
      )
    );
  };

  // Update date and time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setDateTime(`${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="todoContainer w-[50%] min-h-[50vh] border border-gray-900 m-auto bg-black text-white p-4 pb-7 rounded">
      <h1 className="text-white font-bold text-3xl text-center">Todo List!</h1>

      <h2 className="text-center text-3xl my-5 text-blue-600">{dateTime}</h2>

      <section className="form">
        <form onSubmit={handleFormSubmit}>
          <div className="my-7 flex items-center justify-center">
            <input
              type="text"
              autoComplete="off"
              className="py-[6px] px-[15px] rounded-xl rounded-tr-none text-black rounded-br-none border-none outline-none w-[290px] h-[45px]"
              placeholder="Add task..."
              value={inputValue.content}
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 py-[6px] px-[8px] rounded-xl rounded-tl-none rounded-bl-none border-none outline-none h-[45px] hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>
        </form>
      </section>

      <section className="text-white">
        <ul>
          {task.map((currTask) => (
            <li
              key={currTask.id}
              className={`mt-3 bg-white text-black w-[80%] m-auto py-3 px-5 rounded-xl flex items-center justify-between ${
                currTask.checked ? "line-through text-gray-500" : ""
              }`}
            >
              <span>{currTask.content}</span>
              <div className="btn">
                <button
                  className="bg-green-600 text-white rounded mr-5 p-1 hover:bg-green-700"
                  onClick={() => handleToggleComplete(currTask.id)}
                >
                  <MdCheck />
                </button>
                <button
                  className="bg-red-600 text-white rounded p-1 hover:bg-red-700"
                  onClick={() => handleDeleteTask(currTask.id)}
                >
                  <MdDeleteForever />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default App;

"use client"
import React, { useState, useEffect } from "react";
import { 
  FaCheck, 
  FaPlus, 
  FaTrash, 
  FaEdit, 
  FaEllipsisV,
  FaTimes,
  FaChartLine,
  FaList,
  FaMoneyBill,
  FaInfoCircle
} from "react-icons/fa";
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

// TodoForm Component
const TodoForm = ({ initialData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    completed: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "medium",
        dueDate: initialData.dueDate || "",
        completed: initialData.completed || false
      });
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (initialData) {
        // Update existing todo
        const todoRef = doc(db, "todos", initialData.id);
        await updateDoc(todoRef, formData);
      } else {
        // Add new todo
        await addDoc(collection(db, "todos"), formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          rows="3"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Priority
        </label>
        <select
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {initialData ? "Update Task" : "Add Task"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

// Task Details Modal Component
const TaskDetailsModal = ({ task, onClose }) => {
    if (!task) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
          <div className="relative inline-block w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Task Details</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</h4>
                <p className="text-lg">{task.title}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</h4>
                <p className="text-gray-700 dark:text-gray-300">{task.description || "No description provided"}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</h4>
                  <p>{task.priority}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</h4>
                  <p className={task.completed ? "text-green-500" : "text-yellow-500"}>
                    {task.completed ? "Completed" : "In Progress"}
                  </p>
                </div>
              </div>
              
              {task.dueDate && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Due Date</h4>
                  <p>{new Date(task.dueDate).toLocaleDateString()}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
// Main Dashboard Component
const DashboardPage = () => {
  const [todos, setTodos] = useState([]);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [activeTab, setActiveTab] = useState("tasks");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const querySnapshot = await getDocs(collection(db, "todos"));
    const todoList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTodos(todoList);
  };

  const handleMarkAsDone = async (todoId) => {
    const todoRef = doc(db, "todos", todoId);
    const todo = todos.find(t => t.id === todoId);
    await updateDoc(todoRef, {
      completed: !todo.completed
    });
    fetchTodos();
  };

  const handleDelete = async (todoId) => {
    const todoRef = doc(db, "todos", todoId);
    await deleteDoc(todoRef);
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setShowTodoForm(true);
  };

  const handleCloseForm = () => {
    setShowTodoForm(false);
    setEditingTodo(null);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  // ...existing derived data and helper functions...
  const ongoingTasks = todos.filter((todo) => !todo.completed);
  const completedTasks = todos.filter((todo) => todo.completed);
  const totalTasks = todos.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks.length / totalTasks) * 100 : 0;

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const TaskItem = ({ task, onDone, onEdit, onDelete }) => (
    <div 
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-colors cursor-pointer"
      onClick={() => handleTaskClick(task)}
    >
      <div className="flex items-center space-x-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDone(task.id);
          }}
          className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            task.completed ? "text-green-500" : "text-gray-400"
          }`}
        >
          <FaCheck className="h-4 w-4" />
        </button>
        <div>
          <p className={`font-medium ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </p>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${getPriorityColor(task.priority)}`}>
              {task.priority} priority
            </span>
            {task.dueDate && (
              <span className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveDropdown(activeDropdown === task.id ? null : task.id);
          }}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
        >
          <FaEllipsisV className="h-4 w-4" />
        </button>
        
        {activeDropdown === task.id && (
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
                setActiveDropdown(null);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
            >
              <FaEdit className="h-4 w-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
                setActiveDropdown(null);
              }}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
            >
              <FaTrash className="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* ... existing header and tabs code ... */}
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <button
          onClick={() => setShowTodoForm(true)}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus className="h-4 w-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab("tasks")}
            className={`flex items-center space-x-2 py-4 ${
              activeTab === "tasks"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FaList className="h-4 w-4" />
            <span>Tasks</span>
          </button>
          <button
            onClick={() => setActiveTab("expenses")}
            className={`flex items-center space-x-2 py-4 ${
              activeTab === "expenses"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <FaMoneyBill className="h-4 w-4" />
            <span>Expenses</span>
          </button>
        </div>
      </div>

      {activeTab === "tasks" && (
        <div className="space-y-6">
          {/* Progress Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <FaChartLine className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold">Task Progress</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {completedTasks.length} of {totalTasks} tasks completed
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Task Lists */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Ongoing Tasks */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Ongoing Tasks</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {ongoingTasks.length} tasks remaining
              </p>
              <div className="space-y-4">
                {ongoingTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDone={handleMarkAsDone}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
                {ongoingTasks.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No ongoing tasks</p>
                )}
              </div>
            </div>

            {/* Completed Tasks */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {completedTasks.length} tasks completed
              </p>
              <div className="space-y-4">
                {completedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onDone={handleMarkAsDone}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
                {completedTasks.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No completed tasks</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "expenses" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Expenses</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Expense tracking functionality coming soon...
          </p>
        </div>
      )}

      {/* Todo Form Modal */}
      {showTodoForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={handleCloseForm}></div>
            <div className="relative inline-block w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {editingTodo ? 'Edit Task' : 'Add New Task'}
                </h3>
                <button
                  onClick={handleCloseForm}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>
              <TodoForm
                initialData={editingTodo}
                onClose={handleCloseForm}
                onSuccess={() => {
                  handleCloseForm();
                  fetchTodos();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default DashboardPage;
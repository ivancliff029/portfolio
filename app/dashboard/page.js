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
  FaInfoCircle,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaSearch
} from "react-icons/fa";
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import withAdminAuth from "../guard/withAdminAuth";
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  TrendingUp 
} from "lucide-react";

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
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose}></div>
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
          <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [selectedStat, setSelectedStat] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const tasksPerPage = 5;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(todoList);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleStatClick = (stat) => {
    setSelectedStat(stat);
    setCurrentPage(1);
    setSidebarOpen(false); // Close sidebar on mobile when selecting a stat
  };

  const filteredTasks = todos.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "ongoing") return !task.completed;
    return true;
  }).filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <div className="flex items-center space-x-3 flex-1 min-w-0">
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
        <div className="min-w-0">
          <p className={`font-medium truncate ${task.completed ? "line-through text-gray-400" : ""}`}>
            {task.title}
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <span className={`${getPriorityColor(task.priority)}`}>
              {task.priority} priority
            </span>
            {task.dueDate && (
              <span className="text-gray-500 truncate">
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

  // Render content based on selected statistic
  const renderMainContent = () => {
    let tasksToDisplay = [];
    switch (selectedStat) {
      case "overview":
        tasksToDisplay = filteredTasks;
        break;
      case "ongoing":
        tasksToDisplay = ongoingTasks;
        break;
      case "completed":
        tasksToDisplay = completedTasks;
        break;
      case "highPriority":
        tasksToDisplay = todos.filter(task => task.priority === "high");
        break;
      default:
        tasksToDisplay = filteredTasks;
    }

    const paginatedTasks = tasksToDisplay.slice(indexOfFirstTask, indexOfLastTask);

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-semibold">
            {selectedStat === "overview" ? "All Tasks" : 
             selectedStat === "ongoing" ? "Ongoing Tasks" :
             selectedStat === "completed" ? "Completed Tasks" :
             "High Priority Tasks"}
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 w-full"
              />
            </div>
            
            <select
              value={filter}
              onChange={handleFilterChange}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="all">All Tasks</option>
              <option value="completed">Completed</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="space-y-4">
            {paginatedTasks.length > 0 ? (
              paginatedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDone={handleMarkAsDone}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No tasks found</p>
            )}
          </div>

          {/* Pagination */}
          {tasksToDisplay.length > tasksPerPage && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {indexOfFirstTask + 1}-{Math.min(indexOfLastTask, tasksToDisplay.length)} of {tasksToDisplay.length} tasks
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
                >
                  <FaArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>
                
                <div className="flex items-center">
                  {Array.from({ length: Math.ceil(tasksToDisplay.length / tasksPerPage) }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`px-3 py-1 mx-1 rounded-md ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(tasksToDisplay.length / tasksPerPage)}
                  className="flex items-center space-x-2 px-3 py-1 sm:px-4 sm:py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50"
                >
                  <span className="hidden sm:inline">Next</span>
                  <FaArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Statistics Panel Component
  const StatisticsPanel = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 space-y-6 h-full">
      <h2 className="text-xl font-semibold mb-4">Task Statistics</h2>

      {/* Total Tasks */}
      <div
        className={`flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
          selectedStat === "overview" ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={() => handleStatClick("overview")}
      >
        <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-full">
          <ClipboardList className="h-6 w-6 text-blue-500 dark:text-blue-300" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
          <p className="text-lg font-semibold">{totalTasks}</p>
        </div>
      </div>

      {/* Ongoing Tasks */}
      <div
        className={`flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
          selectedStat === "ongoing" ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={() => handleStatClick("ongoing")}
      >
        <div className="p-3 bg-yellow-100 dark:bg-yellow-800 rounded-full">
          <Clock className="h-6 w-6 text-yellow-500 dark:text-yellow-300" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ongoing Tasks</p>
          <p className="text-lg font-semibold">{ongoingTasks.length}</p>
        </div>
      </div>

      {/* Completed Tasks */}
      <div
        className={`flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
          selectedStat === "completed" ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={() => handleStatClick("completed")}
      >
        <div className="p-3 bg-green-100 dark:bg-green-800 rounded-full">
          <CheckCircle className="h-6 w-6 text-green-500 dark:text-green-300" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed Tasks</p>
          <p className="text-lg font-semibold">{completedTasks.length}</p>
        </div>
      </div>

      {/* High Priority Tasks */}
      <div
        className={`flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
          selectedStat === "highPriority" ? "ring-2 ring-blue-500" : ""
        }`}
        onClick={() => handleStatClick("highPriority")}
      >
        <div className="p-3 bg-red-100 dark:bg-red-800 rounded-full">
          <AlertCircle className="h-6 w-6 text-red-500 dark:text-red-300" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">High Priority</p>
          <p className="text-lg font-semibold">
            {todos.filter(task => task.priority === "high").length}
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-500 dark:text-blue-300" />
          <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {completedTasks.length} of {totalTasks} tasks completed
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Mobile Header */}
      <div className="sm:hidden bg-white dark:bg-gray-800 shadow-sm p-4 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <FaBars className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <button
          onClick={() => setShowTodoForm(true)}
          className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600"
        >
          <FaPlus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Sidebar - Mobile Overlay */}
        <div 
          className={`fixed inset-0 z-40 sm:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        {/* Sidebar - Content */}
        <div 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out sm:relative sm:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Task Manager</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="sm:hidden p-1 rounded-md text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <FaTimes className="h-5 w-5" />
              </button>
            </div>
            <StatisticsPanel />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Desktop Header */}
          <div className="hidden sm:flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
            <button
              onClick={() => setShowTodoForm(true)}
              className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaPlus className="h-4 w-4" />
              <span>Add Task</span>
            </button>
          </div>

          {/* Main Content */}
          {renderMainContent()}
        </div>
      </div>

      {/* Todo Form Modal */}
      {showTodoForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={handleCloseForm}></div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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

export default withAdminAuth(DashboardPage);
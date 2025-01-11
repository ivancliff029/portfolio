import React, { useState, useEffect } from "react";
import { db, storage } from "../../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [media, setMedia] = useState(null);
  const [isChild, setIsChild] = useState(false);
  const [parentTodos, setParentTodos] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");

  useEffect(() => {
    const fetchParentTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const parents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setParentTodos(parents);
    };

    fetchParentTodos();
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mediaUrl = "";
    if (media) {
      const mediaRef = ref(storage, `media/${media.name}`);
      await uploadBytes(mediaRef, media);
      mediaUrl = await getDownloadURL(mediaRef);
    }

    const newTodo = {
      title,
      description,
      priority,
      media: mediaUrl,
      category: isChild ? "child" : "parent",
      parentId: isChild ? selectedParent : null,
      createdAt: new Date(),
    };

    await addDoc(collection(db, "todos"), newTodo);

    setTitle("");
    setDescription("");
    setPriority("low");
    setMedia(null);
    setIsChild(false);
    setSelectedParent("");

    alert("Todo added successfully!");
  };

  return (
    <form
      className="p-6 bg-white dark:bg-gray-800 rounded-md shadow-md"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Add Todo
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Priority
        </label>
        <select
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Attach Media (Optional)
        </label>
        <input
          type="file"
          className="w-full dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          onChange={handleFileChange}
        />
      </div>

      <div className="mb-4">
        <label className="flex items-center text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            className="mr-2"
            checked={isChild}
            onChange={() => setIsChild(!isChild)}
          />
          Child of (Optional)
        </label>

        {isChild && (
          <select
            className="w-full p-2 border rounded-md mt-2 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            value={selectedParent}
            onChange={(e) => setSelectedParent(e.target.value)}
            required
          >
            <option value="">Select Parent Todo</option>
            {parentTodos.map((todo) => (
              <option key={todo.id} value={todo.id}>
                {todo.title}
              </option>
            ))}
          </select>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;

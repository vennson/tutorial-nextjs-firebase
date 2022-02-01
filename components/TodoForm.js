import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useContext, useEffect, useRef } from "react";
import { Button, TextField } from "@mui/material";

import { db } from "../firebase";
import { TodoContext } from "../context/TodoContext";

const TodoForm = () => {
  const inputAreaRef = useRef();
  const { showAlert, todo, setTodo, todoInitialState } =
    useContext(TodoContext);

  const onTodoChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    console.log("test0");
    if (todo?.hasOwnProperty("timestamp")) {
      console.log("test");
      const docRef = doc(db, "todos", todo.id);
      const todoUpdated = { ...todo, timestamp: serverTimestamp() };
      updateDoc(docRef, todoUpdated);
      setTodo(todoInitialState);
      showAlert("success", `Todo updated with id: ${docRef.id}`);
    } else {
      console.log("test2");
      const collectionRef = collection(db, "todos");
      const docRef = await addDoc(collectionRef, {
        ...todo,
        timestamp: serverTimestamp(),
      });
      setTodo(todoInitialState);
      showAlert("success", `Todo added with id: ${docRef.id}`);
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (inputAreaRef.current.contains(e.target)) {
        return;
      }
      setTodo(todoInitialState);
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);

  return (
    <div ref={inputAreaRef}>
      <TextField
        fullWidth
        label="title"
        name="title"
        margin="normal"
        value={todo.title}
        onChange={onTodoChange}
      />
      <TextField
        fullWidth
        label="detail"
        name="detail"
        multiline
        maxRows={4}
        value={todo.detail}
        onChange={onTodoChange}
      />
      <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>
        {todo.hasOwnProperty("timestamp") ? "Update" : "Add"}
      </Button>
    </div>
  );
};

export default TodoForm;

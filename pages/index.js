import { Alert, Container, Snackbar } from "@mui/material";
import { useState } from "react";

import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { TodoContext } from "../context/TodoContext";

const todoInitialState = { title: "", detail: "" };

export default function Home() {
  const [todo, setTodo] = useState(todoInitialState);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const showAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setOpen(true);
  };

  return (
    <TodoContext.Provider
      value={{ showAlert, todo, setTodo, todoInitialState }}
    >
      <Container maxWidth="sm">
        <TodoForm />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertType}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
        <TodoList />
      </Container>
    </TodoContext.Provider>
  );
}

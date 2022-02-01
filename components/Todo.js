import { IconButton, ListItem, ListItemText } from "@mui/material";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";

import { db } from "../firebase";
import { TodoContext } from "../context/TodoContext";

const Todo = ({ id, timestamp, title, detail }) => {
  const { showAlert, setTodo } = useContext(TodoContext);

  const deleteTodo = async (id, e) => {
    e.stopPropagation();

    const docRef = doc(db, "todos", id);
    await deleteDoc(docRef);
    showAlert("success", `Todo deleted with id: ${id}`);
  };

  return (
    <ListItem
      onClick={() => setTodo({ id, detail, title, timestamp })}
      sx={{ mt: 3, bosShadow: 3 }}
      style={{ backgroundColor: "#FAFAFA" }}
      secondaryAction={
        <>
          <IconButton onClick={(e) => deleteTodo(id, e)}>
            <DeleteIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={title}
        secondary={moment(timestamp).format("MMMM do, YYYY")}
      />
    </ListItem>
  );
};

export default Todo;

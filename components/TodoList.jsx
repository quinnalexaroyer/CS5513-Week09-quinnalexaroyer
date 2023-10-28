import {
Badge,
Box,
Heading,
SimpleGrid,
Text,
useToast,
Link
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash, FaEdit } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus, editTodo } from "../api/todo";
const TodoList = () => {
const [todos, setTodos] = React.useState([]);
const {  user } = useAuth();
const toast = useToast();

useEffect(() => {
if (!user) {
setTodos([]);
return;
}
  const q = query(collection(db, "todo"),
    where("user", "==", user.uid)
  );
  onSnapshot(q, (querySnapchot) => {
    let ar = [];
    querySnapchot.docs.forEach((doc) => {
      console.log(doc.data());
      ar.push({ id: doc.id, ...doc.data() });
    });
  setTodos(ar);
});
}, [user]);
const handleTodoDelete = async (id) => {
if (confirm("Are you sure you want to delete this todo?")) {
deleteTodo(id);
toast({ title: "Todo deleted successfully", status: "success" });
}
};
const handleTodoEdit = async (id) => {
editTodo(id);
toast({ title: "Todo edited successfully", status: "success" });
};
const handleToggle = async (id, status) => {
const newStatus = status == "completed" ? "pending" : "completed";
await toggleTodoStatus({ docId: id, status: newStatus });
toast({
title: `Todo marked ${newStatus}`,
status: newStatus == "completed" ? "success" : "warning",
});
};
return (
<Box mt={5}>
<SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
{todos &&
todos.map((todo) => (
<Box
p={3}
boxShadow="2xl"
shadow={"dark-lg"}
transition="0.2s"
_hover={{ boxShadow: "sm" }}
>
<Heading as="h3" fontSize={"xl"}>
<Link href={`todo/${todo.id}`}>{todo.title}{" "}</Link>
<Badge
color="red.500"
bg="inherit"
transition={"0.2s"}
_hover={{
bg: "inherit",
transform: "scale(1.2)",
}}
float="right"
size="xs"
onClick={() => handleTodoEdit(todo.id)}
>
<FaEdit />
</Badge>
<Badge
color="red.500"
bg="inherit"
transition={"0.2s"}
_hover={{
bg: "inherit",
transform: "scale(1.2)",
}}
float="right"
size="xs"
onClick={() => handleTodoDelete(todo.id)}
>
<FaTrash />
</Badge>
<Badge
color={todo.status == "pending" ? "gray.500" : "green.500"}
bg="inherit"
transition={"0.2s"}
_hover={{
bg: "inherit",
transform: "scale(1.2)",
}}
float="right"
size="xs"
onClick={() => handleToggle(todo.id, todo.status)}
>
{todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
</Badge>
<Badge
float="right"
opacity="0.8"
bg={todo.status == "pending" ? "yellow.500" : "green.500"}
>
{todo.status}
</Badge>
</Heading>
<Text>{todo.description}</Text>
</Box>
))}
</SimpleGrid>
</Box>
);
};
export default TodoList;

import React from "react";
import {
  Box,
  Input,
  Button,
  Textarea,
  Stack,
  Select,
  useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addTodo, editTodo } from "../api/todo";
const EditTodo = (props) => {
  console.log("CCCCCCCCC", props);
  if(Object.keys(props).length === 0) {
    props = {title:"", description:"", status:"pending"};
  }
  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);
  const [status, setStatus] = React.useState(props.status);
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();
  const handleTodoCreate = async () => {
if (!isLoggedIn) {
  toast({
  title: "You must be logged in to create a todo",
  status: "error",
  duration: 9000,
  isClosable: true,
  });
  return;
} else if('user' in props && props.user != user.uid) {
  toast({
  title: "You cannot edit a todo belonging to another user",
  status: "error",
  duration: 9000,
  isClosable: true,
  });
  return;
}
setIsLoading(true);
if('user' in props) {
  const todo = {
    title,
    description,
    status,
    docId:props.docId,
    userId:props.user
  };
  await editTodo(todo);
  setIsLoading(false);
} else {
  const todo = {
    title,
    description,
    status,
    userId:user.uid
  };
  await addTodo(todo);
  setIsLoading(false);
  setTitle("");
  setDescription("");
  setStatus("pending");
  toast({ title: "Todo created successfully", status: "success" });
};
}
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Title"
value={title}
onChange={(e) => setTitle(e.target.value)}
/>
<Textarea
placeholder="Description"
value={description}
onChange={(e) => setDescription(e.target.value)}
/>
<Select value={status} onChange={(e) => setStatus(e.target.value)}>
<option
value={"pending"}
style={{ color: "yellow", fontWeight: "bold" }}
>
Pending ⌛
</option>
<option
value={"completed"}
style={{ color: "green", fontWeight: "bold" }}
>
Completed ✅
</option>
</Select>
<Button
onClick={() => handleTodoCreate()}
disabled={title.length < 1 || description.length < 1 || isLoading}
colorScheme="teal"
variant="solid"
>
Submit
</Button>
</Stack>
</Box>
);
};
export default EditTodo;

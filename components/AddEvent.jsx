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
import { addEvent, editEvent } from "../api/todo";
const EditEvent = (props) => {
  if(Object.keys(props).length === 0) {
    props = {title:"", description:"", date:"", start:"", end:""};
  }
  const [title, setTitle] = React.useState(props.title);
  const [description, setDescription] = React.useState(props.description);
  const [date, setDate] = React.useState(props.date);
  const [start, setStart] = React.useState(props.start);
  const [end, setEnd] = React.useState(props.end);
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();
  const handleEventCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create an event",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else if('user' in props && props.user != user.uid) {
      toast({
      title: "You cannot edit an event belonging to another user",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
    return;
  }
  setIsLoading(true);
    if('user' in props) {
      setIsLoading(true);
      const event = {
        title,
        description,
        date,
        start,
        end,
        docId:props.docId,
        userId:props.user
      }
      await editEvent(event);
      setIsLoading(false);
      toast({ title: "Event updated successfully", status: "success" });
    } else {
      const event = {
        title,
        description,
        date,
        start,
        end,
        userId:props.user
      }
      setTitle("");
      setDescription("");
      setDate("");
      setStart("");
      setEnd("");
      toast({ title: "Event created successfully", status: "success" });
    }
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
    <Input
      placeholder="Date YYYYMMDD"
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
    <Input
      placeholder="Start Time (24 hr clock) HH:MM"
      value={start}
      onChange={(e) => setStart(e.target.value)}
    />
    <Input
      placeholder="End Time (24 hr clock)"
      value={end}
      onChange={(e) => setEnd(e.target.value)}
    />
    <Button
      onClick={() => handleEventCreate()}
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
export default EditEvent;


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
import { addSchedule } from "../api/todo";
import { getToday, getTime } from "../api/todo";
const AddSchedule = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState();
  const [start, setStart] = React.useState();
  const [end, setEnd] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();
  const handleScheduleCreate = async () => {
    if (!isLoggedIn) {
      toast({
        title: "You must be logged in to create a todo",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true);
    const schedule = {
      userId:user.uid,
      title,
      description,
      date,
      start,
      end
    }
    await addSchedule(schedule);
    setTitle("");
    setDescription("");
    setDate("");
    setStart("");
    setEnd("");
    toast({ title: "Schedule item created successfully", status: "success" });
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
      placeholder="Start Time (24 hr clock)"
      value={start}
      onChange={(e) => setStart(e.target.value)}
    />
    <Input
      placeholder="End Time (24 hr clock)"
      value={end}
      onChange={(e) => setEnd(e.target.value)}
    />
    <Button
      onClick={() => handleScheduleCreate()}
      disabled={title.length < 1 || description.length < 1 || isLoading}
      colorScheme="teal"
      variant="solid"
    >
Add
</Button>
</Stack>
</Box>
);
};
export default AddSchedule;


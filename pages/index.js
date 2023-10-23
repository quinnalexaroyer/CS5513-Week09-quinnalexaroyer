import { Container, Heading } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import AddSchedule from "../components/AddSchedule";
import Schedule from "../components/Schedule";
import Link from 'next/link';
export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<AddTodo />
<TodoList />
<Heading as="h2" fontSize={"x1"}>Schedule</Heading>
<AddSchedule />
<Schedule />
</Container>
);
}

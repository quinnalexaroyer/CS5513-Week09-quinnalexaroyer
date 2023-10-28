import { Container, Heading } from "@chakra-ui/react";
import EditTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import NavBar from "../components/NavBar";
import Link from 'next/link';
export default function Home() {
return (
<Container maxW="7xl">
<NavBar />
<Auth />
<EditTodo />
<TodoList />
</Container>
);
}

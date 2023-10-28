import { Container, Heading } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import AddTodo from "../components/AddEvent";
import Auth from "../components/Auth";
import TodoList from "../components/EventList";
import Link from 'next/link';
export default function Home() {
return (
<Container maxW="7xl">
<Auth />
<NavBar />
<AddEvent />
<EventList />
</Container>
);
}

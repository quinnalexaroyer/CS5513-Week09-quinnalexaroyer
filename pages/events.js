import { Container, Heading } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import AddEvent from "../components/AddEvent";
import Auth from "../components/Auth";
import EventList from "../components/EventList";
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

import { Container, Heading } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import AddContact from "../components/AddContact";
import Auth from "../components/Auth";
import ContactList from "../components/ContactList";
import Link from 'next/link';
export default function Home() {
return (
<Container maxW="7xl">
<NavBar />
<Auth />
<AddContact />
<ContactList />
</Container>
);
}

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
import { FaTrash } from "react-icons/fa";
import { deleteContact, toggleContactStatus } from "../api/contact";
const ContactList = () => {
const [contacts, setContacts] = React.useState([]);
const {  user } = useAuth();
const toast = useToast();
useEffect(() => {
  if (!user) {
    setContacts([]);
      return;
  }
  const q = query(collection(db, "contact"),
    where("user", "==", user.uid)
  );
  onSnapshot(q, (querySnapchot) => {
    let ar = [];
    querySnapchot.docs.forEach((doc) => {
      console.log(doc.data());
      ar.push({ id: doc.id, ...doc.data() });
    });
  setContacts(ar);
});
}, [user]);
const handleContactDelete = async (id) => {
if (confirm("Are you sure you want to delete this contact?")) {
deleteContact(id);
toast({ title: "Contact deleted successfully", status: "success" });
}
};
return (
<Box mt={5}>
<SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
{contacts &&
contacts.map((contact) => (
<Box
p={3}
boxShadow="2xl"
shadow={"dark-lg"}
transition="0.2s"
_hover={{ boxShadow: "sm" }}
>
<Heading as="h3" fontSize={"xl"}>
<Link href={`contact/${contact.id}`}>{contact.name}{" "}</Link>
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
onClick={() => handleContactDelete(contact.id)}
>
<FaTrash />
</Badge>
</Heading>
<Text>{contact.relation}</Text>
<Text>{contact.email}</Text>
<Text>{contact.phone}</Text>
</Box>
))}
</SimpleGrid>
</Box>
);
};
export default ContactList;

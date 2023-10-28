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
import { addContact } from "../api/todo";
const AddContact = () => {
  const [name, setName] = React.useState("");
  const [relation, setRelation] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const toast = useToast();
  const { isLoggedIn, user } = useAuth();
  const handleContactCreate = async () => {
if (!isLoggedIn) {
  toast({
  title: "You must be logged in to create a contact",
  status: "error",
  duration: 9000,
  isClosable: true,
  });
  return;
}
setIsLoading(true);
const contact = {
  name,
  relation,
  email,
  phone,
  userId:user.uid
};
await addContact(contact);
setIsLoading(false);
setName("");
setRelation("");
setEmail("");
setPhone("");
setStatus("pending");
toast({ title: "Contact created successfully", status: "success" });
};
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Name"
value={name}
onChange={(e) => setTitle(e.target.value)}
/>
<Input
placeholder="Relation"
value={relation}
onChange={(e) => setDescription(e.target.value)}
/>
<Input
placeholder="Email"
value={email}
onChange={(e) => setTitle(e.target.value)}
/>
<Input
placeholder="Phone"
value={phone}
onChange={(e) => setDescription(e.target.value)}
/>

<Button
onClick={() => handleContactCreate()}
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
export default AddContact;

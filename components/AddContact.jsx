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
  const [isLoading, setIsLoading] = React.useState(false);
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
toast({ title: "Contact created successfully", status: "success" });
};
return (
<Box w="40%" margin={"0 auto"} display="block" mt={5}>
<Stack direction="column">
<Input
placeholder="Name"
value={name}
onChange={(e) => setName(e.target.value)}
/>
<Input
placeholder="Relation"
value={relation}
onChange={(e) => setRelation(e.target.value)}
/>
<Input
placeholder="Email"
value={email}
onChange={(e) => setEmail(e.target.value)}
/>
<Input
placeholder="Phone"
value={phone}
onChange={(e) => setPhone(e.target.value)}
/>

<Button
onClick={() => handleContactCreate()}
disabled={name.length < 1 || (email.length < 1 && phone.length < 1) || isLoading}
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

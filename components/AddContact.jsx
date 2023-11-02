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
import { addContact, editContact } from "../api/todo";
const EditContact = (props) => {
  if(Object.keys(props).length === 0) {
    props = {name:"", relation:"", email:"", phone:""};
  }
  const [name, setName] = React.useState(props.name);
  const [relation, setRelation] = React.useState(props.relation);
  const [email, setEmail] = React.useState(props.email);
  const [phone, setPhone] = React.useState(props.phone);
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
    const contact = {
      name,
      relation,
      email,
      phone,
      docId:props.docId,
      userId:user.uid
    };
    await editContact(contact);
    setIsLoading(false);
    toast({ title: "Contact updated successfully", status: "success" });
  } else {
    const event = {
      name,
      relation,
      email,
      phone
    }
  setName("");
  setRelation("");
  setEmail("");
  setPhone("");
  toast({ title: "Contact created successfully", status: "success" });
  }
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
Submit
</Button>
</Stack>
</Box>
);
};
export default EditContact;

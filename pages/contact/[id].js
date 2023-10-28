import React from "react";
import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    Badge,
    FaTrash
} from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import {
    doc,
    getDoc
} from "firebase/firestore";
import { getFromDB } from "../../firebase";
import {tense} from "../../api/todo";

const ToDoItem = ({d}) => {
  const {user} = useAuth() || {};
  if(!user) return;
  return (
    <Box
      p={3}
      boxShadow="2xl"
      shadow={"dark-lg"}
      transition="0.2s"
      _hover={{ boxShadow: "sm" }}
    >
      <Heading as="h3" fontSize={"xl"}>
      {d.title}{" "}<br/>
    </Heading>
    <Text>{d.description}</Text>
  </Box>
  );
};

export async function getServerSideProps(context) {
  return await getFromDB("contacts", context.params.id);
}

export default ToDoItem;

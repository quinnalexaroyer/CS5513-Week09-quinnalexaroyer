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

const ScheduleItem = ({d}) => {
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
      {d.date}: {d.start}-{d.end}
    <Badge
        color={d.tense == "past" ? "red.500" : (d.tense == "future" ? "green.500" : "yellow.500")}
        bg="inherit"
        transition={"0.2s"}
        _hover={{
          bg: "inherit",
          transform: "scale(1.2)",
        }}
        float="right"
        size="xs"
      >
      <Text>{d.tense}</Text>
    </Badge>

    </Heading>
    <Text>{d.description}</Text>
  </Box>
  );
};

export async function getServerSideProps(context) {
  return await getFromDB("events", context.params.id);
}

export default ScheduleItem;


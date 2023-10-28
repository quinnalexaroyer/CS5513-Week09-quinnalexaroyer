import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  Link
} from "@chakra-ui/react";
import {useRouter} from 'next/router';
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { addEvent, deleteEvent, tense } from "../api/todo";

function getTodaysString() {
  var today = new Event().toISOString();
  return today.slice(0,4) + today.slice(5,7) + today.slice(8,10);
}

const Event = () => {
  const [event, setEvent] = React.useState(); // 14:00 #2
  const {  user } = useAuth();
  const toast = useToast();
  const refreshData = () => {
    if (!user) {
      return;
    }
    if(!event) {
      setEvent([]);
    }
    const q = query(collection(db, "event"),
      where("user", "==", user.uid)
    );
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        console.log(doc.data());
        ar.push({ id: doc.id, tense: tense(doc.data().date, doc.data().start, doc.data().end), ...doc.data() });
      });
      ar.sort(
        function(x,y) {
          return x.date + x.start > y.date + y.start;
        }
      );
      setEvent(ar);
      });
    };
    useEffect(() => {
      refreshData();
    }, [user]);
    const handleEventDelete = async (id) => {
      if (confirm("Are you sure you want to delete this item?")) {
      deleteEvent(id);
      toast({ title: "Item deleted successfully", status: "success" });
    }
  };
  return (
    <SimpleGrid columns={{base:1, md:1}} spacing={8}>
    {event && event.map((d) => (
    <Box
      p={3}
      boxShadow="2xl"
      shadow={"dark-lg"}
      transition="0.2s"
      _hover={{ boxShadow: "sm" }}
    >
    <Heading as="h3" fontSize={"xl"}>
      <Link href={`event/${d.id}`}>{d.title}{" "}</Link><br/>
      {d.date}: {d.start}-{d.end}
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
onClick={() => handleEventDelete(d.id)}
>
<FaTrash />
</Badge>
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
        onClick={() => showEvent(item)}
      >
      <Text>{d.tense}</Text>
      </Badge>
    </Heading>
    <Text>{d.description}</Text>
  </Box>
  ))}
  </SimpleGrid>
);
};
export default Event;


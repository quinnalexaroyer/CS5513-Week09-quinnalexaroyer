import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import {useRouter} from 'next/router';
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Link from 'next/link';

const ScheduleLink = () => {
  const {user} = useAuth() || {};
  if (!user) {
    return '';
  }
  return (<Link key={user.uid} href={`/schedule/${user.uid}00000000`}>See schedule</Link>);
}

export default ScheduleLink;


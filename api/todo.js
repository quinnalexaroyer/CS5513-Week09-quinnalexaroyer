import { db, getFromDB } from "../firebase";
import useAuth from "../hooks/useAuth";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

function getToday() {
  var today = new Date().toISOString();
  return today.slice(0,4) + today.slice(5,7) + today.slice(8,10);
}

function getTime() {
  var today = new Date().toISOString();
  return today.slice(11,19);
}
const addTodo = async ({ userId, title, description, status }) => {
  try {
    await addDoc(collection(db, "todo"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime()
    });
  }
  catch (err) {
    console.log(err);
  }
};
const toggleTodoStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteFromDB = async (collection, docId) => {
  try {
    const todoRef = doc(db, collection, docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};
const deleteTodo = async (docId) => {
  await deleteFromDB("todo", docId);
};
const editTodo = async ({ docId, userId, title, description,status }) => {
  const item = await getFromDB("todo", docId);
  if(userId == item.props.d.user) {
    await updateDoc(doc(db, "todo", docId), {
      title: title,
      description: description,
      status: status,
      updatedAt: new Date().getTime()
    });
  }
};
const addEvent = async ({ userId, title, description, date, start, end}) => {
  await addDoc(collection(db, "events"), {
    user: userId,
    title: title,
    description: description,
    date: date,
    start: start,
    end: end,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  });
}
const deleteEvent = async (docId) => {
  await deleteFromDB("events", docId);
}
const editEvent = async ({ docId, userId, title, description, date, start, end }) => {
  const item = await getFromDB("events", docId);
  if(userId == item.props.d.user) {
    await updateDoc(doc(db, "events", docId), {
      title: title,
      description: description,
      date: date,
      start: start,
      end: end,
      updatedAt: new Date().getTime()
    });
  }
};
const addContact = async ({ userId, name, relation, email, phone}) => {
  await addDoc(collection(db, "contacts"), {
    user: userId,
    name: name,
    relation: relation,
    email: email,
    phone: phone,
    createdAt: new Date().getTime(),
    updatedAt: new Date().getTime()
  });
}
const deleteContact = async (docId) => {
  await deleteFromDB("contacts", docId);
}
const editContact = async ({ docId, userId, name, relation, email, phone}) => {
  const item = await getFromDB("contacts", docId);
  if(userId == item.props.d.user) {
    await updateDoc(doc(db, "contacts", docId), {
      name: name,
      relation: relation,
      email: email,
      phone: phone,
      updatedAt: new Date().getTime()
    });
  }
};
function tense(date, startTime, endTime) {
  var today = getToday();
  if(date < today) return "past";
  else if(date > today) return "future";
  else {
    var time = getTime();
    if(endTime < time) return "past";
    else if(startTime > time) return "future";
    else return "present";
  }
}
export { addTodo, toggleTodoStatus, deleteTodo, editTodo, addEvent, deleteEvent, editEvent, addContact, deleteContact, editContact, tense };

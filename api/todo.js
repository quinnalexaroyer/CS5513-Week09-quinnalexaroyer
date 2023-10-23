import { db } from "../firebase";
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
const deleteTodo = async (docId) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};
const addSchedule = async ({ userId, title, description, date, start, end}) => {
  await addDoc(collection(db, "schedule"), {
    user: userId,
    title: title,
    description: description,
    date: date,
    start: start,
    end: end,
    createdAt: new Date().getTime()
  });
}
const deleteSchedule = async (docId) => {
  try {
    const ref = doc(db, "schedule", docId);
    await deleteDoc(ref);
  } catch (err) {
    console.log(err);
  }
}
const getDailySchedule = async ({date}) => {
  try {
    var endDate = new Date(date.getTime());
    endDate.setDate(endDate.getDate() + 1);
  	var ref = firebase.database().ref("schedule");
  	ref.orderByChild("datetime").startAt(date).endAt(endDate);
  	return ref;
  } catch (err) {
  	console.log(err);
  }
}

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
export { addTodo, toggleTodoStatus, deleteTodo, addSchedule, deleteSchedule, tense };

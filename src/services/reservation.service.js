import { firestore } from "@/config/firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const { object, date, string } = require("yup");

const reservationSchema = object({
  diner: object()
    .shape({
      id: string().required(),
      name: string().required(),
      image: string().nullable(),
      email: string().required().email(),
      phone: string().nullable(),
    })
    .required(),
  partySize: string().required(),
  date: date().required(),
  time: string().required(),
  notes: string().nullable(),
});

const reservationsRef = collection(firestore, "reservations");

export const createReservation = async (data) => {
  try {
    const valid = await reservationSchema.validate(data);
    valid.createdAt = serverTimestamp();
    valid.status = "pending";
    const res = await addDoc(reservationsRef, valid);
    return [res, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const updateReservationStatus = async (id, status, uid, points) => {
  try {
    await updateDoc(doc(reservationsRef, id), { status });
    if (status === "completed") {
      await updateDoc(doc(reservationsRef, id), { completedAt: serverTimestamp() });
      // update user leaf points
      const userRef = doc(firestore, "users", uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const user = userDoc.data();
        const leafPoints = user.points || 0;
        await updateDoc(userRef, { points: leafPoints + points });
      }
    }
    return [true, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};
// get reservation by status
export const getReservationsByStatus = async (status) => {
  try {
    const querySnapshot = await getDocs(
      query(reservationsRef, where("status", "==", status), orderBy("createdAt", "desc"))
    );
    const reservations = [];
    querySnapshot.forEach((doc) => {
      reservations.push({ id: doc.id, ...doc.data() });
    });
    return [reservations, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const getReservationsByUser = async (userId) => {
  try {
    const querySnapshot = await getDocs(query(reservationsRef, where("user.id", "==", userId)));
    const reservations = [];
    querySnapshot.forEach((doc) => {
      reservations.push({ id: doc.id, ...doc.data() });
    });
    return [reservations, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const getReservationsByDate = async (date) => {
  try {
    const querySnapshot = await getDocs(query(reservationsRef, where("date", "==", date)));
    const reservations = [];
    querySnapshot.forEach((doc) => {
      reservations.push({ id: doc.id, ...doc.data() });
    });
    return [reservations, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const removeReservation = async (id) => {
  try {
    await deleteDoc(doc(reservationsRef, id));
    return [true, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

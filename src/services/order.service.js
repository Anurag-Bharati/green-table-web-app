import { firestore } from "@/config/firebase/firebase";
import { parse } from "date-fns";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { array, number, object, string } from "yup";

const ordersRef = collection(firestore, "orders");

const orderSchema = object({
  user: object()
    .shape({
      id: string().required(),
      name: string().required(),
      image: string().required(),
      email: string().required().email(),
      phone: string().nullable(),
    })
    .required(),
  orders: array()
    .of(
      object().shape({
        id: string().required(),
        name: string().required(),
        price: number().required(),
        image: string().required(),
        quantity: number().required(),
      })
    )
    .required(),
});

export const createOrder = async (data) => {
  try {
    const valid = await orderSchema.validate(data);
    valid.createdAt = serverTimestamp();
    valid.status = "pending";
    const res = await addDoc(ordersRef, valid);
    return [res, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const updateOrderStatus = async (id, status, uid, points) => {
  try {
    await updateDoc(doc(ordersRef, id), { status });
    if (status === "completed") {
      await updateDoc(doc(ordersRef, id), { completedAt: serverTimestamp() });
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

export const getOrdersByStatusOrderedByDate = async (status) => {
  try {
    const querySnapshot = await getDocs(
      query(ordersRef, where("status", "==", status), orderBy("createdAt", "desc"))
    );
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ ...doc.data(), id: doc.id });
    });
    return [orders, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const getOrdersByUser = async (userId) => {
  try {
    const querySnapshot = await getDocs(query(ordersRef, where("user.id", "==", userId)));
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({ ...doc.data(), id: doc.id });
    });
    return [orders, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

export const removeOrder = async (id) => {
  try {
    await deleteDoc(doc(ordersRef, id));
    return [true, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

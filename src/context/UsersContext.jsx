import React, { createContext, useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { store } from "../firebase";

const UsersContext = createContext();

export const useUsersContext = () => {
  return useContext(UsersContext);
};

const fetchDataFromCollection = async (collectionRef) => {
  try {
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.log(error);
  }
};

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [showcases, setShowCases] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const showcaseCollection = collection(store, "usersshowcase");

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersCollection = await getDocs(
          collection(store, "usersdetails")
        );
        const usersData = usersCollection.docs.map((doc) => doc.data());
        setUsers(usersData);

        const showcasesData = await fetchDataFromCollection(showcaseCollection);
        setShowCases(showcasesData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsersData();
  }, []);

  const getUserByEmail = (email) => {
    return users.find((user) => user.email === email);
  };

  const getOrdersByEmail = async (email) => {
    try {
      const ordersQuery = query(
        collection(store, "ordershistory"),
        where("order.email", "==", email)
      );
      const ordersSnapshot = await getDocs(ordersQuery);
      const ordersData = ordersSnapshot.docs.map((doc) => doc.data());
      return ordersData;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const deleteUser = async (email) => {
    try {
      const usersCollection = collection(store, "usersdetails");
      const querySnapshot = await getDocs(
        query(usersCollection, where("email", "==", email))
      );
      const userDoc = querySnapshot.docs[0];

      if (userDoc) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.email !== email)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeShowcase = async (showcaseId) => {
    try {
      const showcaseRef = doc(showcaseCollection, showcaseId);
      await deleteDoc(showcaseRef);
      setShowCases((prevShowcase) =>
        prevShowcase.filter((showcase) => showcase.id !== showcaseId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOrdersHistoryData = async () => {
    const ordersHistoryCollection = collection(store, "ordershistory");

    return getDocs(ordersHistoryCollection)
      .then((ordersHistorySnapshot) => {
        const ordersHistoryData = ordersHistorySnapshot.docs.map((doc) =>
          doc.data()
        );
        setOrdersHistory(ordersHistoryData);
        return ordersHistoryData;
      })
      .catch((error) => {
        console.error("Error fetching orders history data:", error);
        return [];
      });
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        getUserByEmail,
        getOrdersByEmail,
        deleteUser,
        showcases,
        removeShowcase,
        fetchOrdersHistoryData,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

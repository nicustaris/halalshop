import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getDocs, query, where, collection } from "firebase/firestore";
import Cookies from "universal-cookie";
import { store } from "./firebase";

const PrivateRoute = () => {
  const cookie = new Cookies();
  const userEmail = cookie.get("email");
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userEmail) {
          const usersCollection = collection(store, "usersdetails");
          const q = query(usersCollection, where("email", "==", userEmail));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0].data();
            setIsAdmin(userDoc.isAdmin);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
          navigate("/SignIn");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [userEmail]);

  if (isAdmin === null) {
    return null;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;

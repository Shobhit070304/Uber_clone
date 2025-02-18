import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

function UserProtectWrapper({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(UserDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data.user);
          setLoading(false);
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <>{children}</>;
}

export default UserProtectWrapper;

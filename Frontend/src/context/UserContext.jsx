import React, { createContext, useState } from "react";

export const UserDataContext = createContext();
function UserContext({ children }) {
  const [userData, setUserData] = useState({
    fullName: {
      firstName: "",
      lastName: "",
    },
    email: "",
  });
  return (
    <UserDataContext.Provider value={{userData, setUserData}}>
      <div>{children}</div>;
    </UserDataContext.Provider>
  );
}

export default UserContext;

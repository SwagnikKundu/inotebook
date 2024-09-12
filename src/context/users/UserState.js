
import userContext from "./UserContext";

const UserState = (props) => {
  const host = "http://localhost:8080";
  


  //FUNC 1: Login User and generate Token
  const loginUser = async (email,password) => {
    const response = await fetch(`${host}/api/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email,password }),
    });

    const json = await response.json();
    return json;
    
  };

  //FUNC 2: Login User and generate Token
  const SignUpUser = async (name,email,password) => {
    const response = await fetch(`${host}/api/user/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name,email,password }),
    });

    const json = await response.json();
    return json;
  };

  return (
    <userContext.Provider value={{loginUser,SignUpUser}}>{props.children}</userContext.Provider>
  );
};

export default UserState;

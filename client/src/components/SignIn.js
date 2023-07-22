import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 15em;
`;
const Admin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: pink 4px solid;
  height: 15em;
  width: 15em;
  text-align: center;
`;
const Guest = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: pink;
  /* border: white 2px solid; */
  height: 15em;
  width: 15em;
  text-align: center;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding-bottom: 3em;
  color: white;
`;
const Text = styled.div`
margin-bottom: 2em;
`
const Input = styled.input`
margin-bottom: 0.5em;
`;
const Button = styled.button`

`;

const SignIn = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const HandleClick = () => {
    fetch("https://calendart.vercel.app/calend_art/users/signin", {
      method: "POST",

      body: JSON.stringify({
        username,
        password,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const { data, status, error } = json;
        if (status === 200) {
          setCurrentUser(data);
          sessionStorage.setItem("users", data);
          navigate("/");
        } else {
          console.log(error);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const navClick = ()=>{
    navigate("/")
  }

  return (
    <Container>
      <Guest>
        <Text>Only the Admin may add events</Text>
        <button onClick={navClick}>Back to Home</button>
      </Guest>
      <Admin>
        <Text>Admin Log In</Text>
        <Label>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Label>
        <Button onClick={HandleClick}>Sign In</Button>
      </Admin>
    </Container>
  );
};

export default SignIn;

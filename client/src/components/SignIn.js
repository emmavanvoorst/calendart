import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10em;
`;
const Admin = styled.div`
  background-color: white;
  border: pink 2px solid;
  height: 20em;
  width: 15em;
  text-align: center;
`;
const Guest = styled.div`
  cursor: pointer;
  background-color: pink;
  border: white 2px solid;
  height: 20em;
  width: 15em;
  text-align: center;
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding-bottom: 3em;
  color: white;
`;
const Input = styled.input``;
const Button = styled.button``;
const SignIn = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [users, setUsers] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
console.log({username, password})

  useEffect((users) => {
    let mounted = true;
    fetch(`/calend_art/users/read`)
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 400 || parse.status === 500) {
          throw new Error(parse.message);
        } else {
          if (mounted) {
            setUsers(parse.users);
            
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const HandleClick = () => {
    if (username && password) {
      const matchedUser = users.some(
        (user) => user.username === username && user.password === password
      );
      console.log(users.username)
      if (matchedUser) {
        // Username and password match
        sessionStorage.setItem("user", JSON.stringify(matchedUser));
        setCurrentUser(username);
        navigate('/');
        console.log("Invalid username or password");

      } else {
        // Username and do not password match
         console.log("Invalid username or password");
      }
    } else {
      console.log("Please enter username and password");
    }
  };

  return (
    <Container>
      <Admin>
        <div>Admin</div>
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
        <Button onClick={HandleClick}>sign in</Button>
      </Admin>
      <Guest>Proceed as Guest</Guest>
    </Container>
  );
};

export default SignIn;

import { useState, useContext} from "react";
import { UserContext } from "./context/UserContext";
import {styled} from "styled-components";


const Container = styled.div`
display: flex;
justify-content: center;
  align-items: center;
padding-top: 10em;
`
const Admin = styled.div`
background-color: white;
border: pink 2px solid;
height: 20em;
width: 15em;
text-align: center;
`
const Guest = styled.div`
cursor: pointer;
background-color: pink;
border: white 2px solid;
height: 20em;
width: 15em;
text-align: center;
`
const Label = styled.label`
display: flex;
flex-direction: column;
  padding-bottom: 3em;
  color: white;
`
const Input = styled.input`
`

const SignIn = () => {
    // const { currentUser, setCurrentUser } = useContext(UserContext);

    const handleClick= ()=>{
        // setCurrentUser()
    }

    return(
        <Container>
        <Admin>
            <div>Admin</div>
            <Label>
            <Input
            type="text"
            name="username"
            placeholder="Username"/>
            <Input
            type="password"
            name="password"
            placeholder="Password"/>
            </Label>
            <button>sign in</button>
        </Admin>
        <Guest>Proceed as Guest
            
        </Guest>
        </Container>
    )
};

export default SignIn;
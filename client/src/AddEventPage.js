import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "./components/Form";
import {styled} from "styled-components";
import { UserContext } from "./components/context/UserContext";

const EventContainer = styled.div`
padding-top: 10em;
`

const AddEvent = () => {
    const navigate= useNavigate()
    const { currentUser, setCurrentUser } = useContext(UserContext);
    useEffect(() => {
        if (!currentUser) {
          navigate("/");
        }
      }, []);
return(
    <EventContainer>
    <Form/>
    </EventContainer>
    
)
}

export default AddEvent;
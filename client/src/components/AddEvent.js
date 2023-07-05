import Form from "./context/Form";
import {styled} from "styled-components";

const EventContainer = styled.div`
padding-top: 10em;
`

const AddEvent = () => {
return(
    <EventContainer>
    <Form/>
    </EventContainer>
    
)
}

export default AddEvent;
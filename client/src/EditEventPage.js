import {styled} from "styled-components";

import EditEventCard from "./components/EditEventCard";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-top: 10em;
  width: 100vw;
  
`;

const EditEventPage = () => {
return(
<Container>
<EditEventCard/>
</Container>
)
}


export default EditEventPage;
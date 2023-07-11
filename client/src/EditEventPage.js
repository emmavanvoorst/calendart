import {styled} from "styled-components";

import Form from "./components/Form";
import LongEventCard from "./components/LongEventCard";

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
<LongEventCard/>
</Container>
)
}


export default EditEventPage;
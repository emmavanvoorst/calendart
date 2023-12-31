import EventCard from "./components/EventCard";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 10em 12vw 0 10vw;
  width: 100vw;
  
  
`;


const Events = () => {
  return (
    <Container>
     
      <EventCard />
    </Container>
  );
};

export default Events;

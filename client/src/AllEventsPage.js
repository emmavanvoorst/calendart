import EventCard from "./components/EventCard";
import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding-top: 10em;
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

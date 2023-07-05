import EventCard from "./EventCard";
import {styled} from "styled-components";

const Container = styled.div`
  padding-top: 10em;
  height: 100em;
`

const Events = () => {
  return (
    <Container>
      <EventCard />
    </Container>
  );
};

export default Events;

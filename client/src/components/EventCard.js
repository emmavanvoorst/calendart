import { useEffect, useState } from "react";
import { styled } from "styled-components";
import moment from "moment";

const Wrapper = styled.div`
  padding: 0 15em;
  display: flex;
  flex-wrap: wrap;
`
const EventContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 30em;
  width: 30em;
  background-color: aliceblue;
  margin: 0 4em 4em 0;
  padding: 2em;
  font-family: 'Roboto Mono', monospace;
`;
const Title = styled.div`
font-size: 2rem;
`
const EventCard = () => {
  const [events, setEvents] = useState([]);
  console.log({ events });
  useEffect(() => {
    let mounted = true;
    console.log({ events });
    fetch(`/calend_art/events/read`)
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 400 || parse.status === 500) {
          throw new Error(parse.message);
        } else {
          if (mounted) {
            setEvents(parse.events);
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

  return (
    <Wrapper>
      {events.length > 0 ? (
        events.map((event, index) => (
          <EventContainer>
            <Title>{event.title}</Title>
            <div>{event.location.name}</div>
            <div>{event.location.address}</div>
            <div>Start: {moment(event.start_date).format("DD MMMM, yy")}</div>
            <div>End: {moment(event.end_date).format("DD MMMM, yy")}</div>
            <div>Description: {event.description}</div>
            <div>Website: {event.url}</div>
            
            
          </EventContainer>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </Wrapper>
  );
};

export default EventCard;

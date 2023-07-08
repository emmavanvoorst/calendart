import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { SquircleLoader } from "react-awesome-loaders";
import moment from "moment";

const Wrapper = styled.div`
  padding: 0 15em;
  display: flex;
  flex-wrap: wrap;
`;
const EventContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 25em;
  width: 100%;
  border: white 3px solid;
  margin: 0 4em 4em 0;
  padding: 2em;
  font-family: "Roboto Mono", monospace;
  color: white;
`;
const Title = styled.div`
  font-size: 2rem;
`;
const Link = styled.a`
  text-decoration: none;
  color: green;
`;
const Loading =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const WideEventCard = () => {
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

  const displayedEvents = events.slice(0, 3);

  return (
    <Wrapper>
      <Title>Events happening soon</Title>
      {events.length > 0 ? (
        displayedEvents.map((event, index) => (
          <EventContainer key={index}>
            <Title>{event.title}</Title>
            <div>{event.location.name}</div>
            <div>{event.location.address}</div>
            <div>
              Start time:{" "}
              {!event.start_time ? <div>N/A</div> : event.start_time}
            </div>
            <div>Start: {moment(event.start_date).format("DD MMMM, yy")}</div>
            <div>End: {moment(event.end_date).format("DD MMMM, yy")}</div>
            <div>Description: {event.description}</div>
            <div>
              Website: <Link href={event.url}>Go to {event.location.name}</Link>
            </div>
          </EventContainer>
        ))
      ) : (
        <Loading>
          <SquircleLoader />
        </Loading>
      )}
    </Wrapper>
  );
};

export default WideEventCard;

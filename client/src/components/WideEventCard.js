import { useEffect, useState } from "react";
import { styled } from "styled-components";
import moment from "moment";

const Wrapper = styled.div`
  padding: 0 10vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 700px){
    padding: 1em;
  }
`;

const Container = styled.div`
display: flex;
flex-direction: column;

`
const EventContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 40em;
  width: 100%;
  border: white 3px solid;
  margin: 0 4em 4em 0;
  padding: 2em;
  font-family: "Roboto Mono", monospace;
  color: white;
  @media screen and (max-width: 700px){
    width: 80em;
    font-size: 0.8rem;
    height: 35em;
  }
`;
const Title = styled.div`
  font-size: 2rem;
  @media screen and (max-width: 700px){
    font-size: 1rem;
  }
`;
const Description = styled.div`
width: 50em;
margin: 1em 0 1em 0;
@media screen and (max-width: 700px){
    width: 15em;
    
  }
`
const FeatureTitle = styled.div`
  width: 10em;
  font-size: 2rem;
  color:darkseagreen;
  background-color: white;
`;
const Button = styled.button`
/* margin-top: 2em; */
  display: inline-block;
  padding: 0.75rem 1.25rem;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 1rem;
  letter-spacing: .15rem;
  transition: all .3s;
  position: relative;
  overflow: hidden;
  z-index: 1;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: white solid 1px;
    background-color: none;
    z-index: -2;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: white;
    transition: all .3s;
    z-index: -1;
  }
  &:hover {
    color: darkseagreen;
    font-weight: bold;
    &:before {
      width: 100%;
    }
  }
`
const Loading =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const WideEventCard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let mounted = true;
    console.log({ events });
    fetch(`https://calendart.vercel.app/calend_art/events/read`)
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
     <Container>
     {events.length ? <FeatureTitle>Featured Events</FeatureTitle> : null}
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
            <Description>Description:<br/> {event.description}</Description>
            <Button as="a" href={event.url}>
              Go to {event.location.name}
            </Button>
          </EventContainer>
         
        ))
      ) : (
        <Loading>
          LOADING...
        </Loading>
      )}
      </Container>
    </Wrapper>
  );
};

export default WideEventCard;

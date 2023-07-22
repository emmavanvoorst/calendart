import { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { NavLink } from "react-router-dom";

import { styled } from "styled-components";
// import { SquircleLoader } from "react-awesome-loaders";
import {MdOutlineDelete} from 'react-icons/md';
import {FiEdit3} from 'react-icons/fi'
import moment from "moment";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  
`
const EventContainer = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
  min-height: 55em;
  width: 40vw;
  border: white 3px solid;
  margin: 0 4em 4em 0;
  padding: 3em 5em  0 5em;
  font-family: 'Roboto Mono', monospace;
  color: white;
  @media screen and (max-width: 800px){
    width: 100%;
    padding:2em;
    font-size: 0.8rem;
    height: 55em;
  }
`;
const PageTitle = styled.div`
color: white;
font-size: 3rem;
`
const Title = styled.div`
font-size: 2rem;
margin-bottom: 1em;
`
const Flex = styled.div`
display: flex;
`
const Text =styled.div`
margin-bottom: 2.5em;
`
const Loading =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const IconContainer =styled.div`
display: flex;
margin: 1em  0 0 1em;
`
const Delete= styled(MdOutlineDelete)`
  cursor: pointer;
  margin-left: 0.5em;
`
const Edit = styled(FiEdit3)`
cursor: pointer;
color: white;
`

const Button = styled.button`
margin-top: 3em;
  display: inline-block;
  padding: 0.75rem 1.25rem;
  margin-bottom: 2em;
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

const EventCard = () => {
  const [events, setEvents] = useState([]);
  const [deletedEvent, setDeletedEvent] = useState(null);
  const { currentUser, setCurrentUser } = useContext(UserContext);



  useEffect((events) => {
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

  const handleDeleteEvent = (eventId) => {

    fetch(`/calend_art/events/delete/${eventId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 200) {
          setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
        } else {
          console.log(parse.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredEvents = events.filter((event) => event._id !== deletedEvent);

  return (
    <Wrapper>
      <div>
      {filteredEvents.length ? <PageTitle>All Events</PageTitle> : null}
       {filteredEvents.length > 0 ? (
        filteredEvents.map((event, index) => (
          <EventContainer key={index}>
            <Flex>
            <Title>{event.title}</Title>
            {currentUser &&
            <IconContainer>
            <NavLink to ={`/edit/${event._id}`}><Edit size={25}/></NavLink>
            <Delete size={25} onClick={() => handleDeleteEvent(event._id)}/>
            </IconContainer>
            }</Flex>
            <Text>{event.location.name}</Text>
            <Text>{event.location.address}</Text>
            <Text>Start time: {!event.start_time ? <div>N/A</div>: event.start_time}</Text>
            <Text>Start: {moment(event.start_date).format("DD MMMM, yy")}</Text>
            <Text>End: {moment(event.end_date).format("DD MMMM, yy")}</Text>
            <Text>Description:<br/> {event.description}</Text>
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
      </div>
    </Wrapper>
  );
};

export default EventCard;
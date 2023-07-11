import { useEffect, useState, useContext } from "react";
import { UserContext } from "./context/UserContext";
import { NavLink } from "react-router-dom";

import { styled } from "styled-components";
import { SquircleLoader } from "react-awesome-loaders";
import {MdOutlineDelete} from 'react-icons/md';
import {FiEdit3} from 'react-icons/fi'
import moment from "moment";

const Wrapper = styled.div`
  /* padding: 0 15em; */
  display: flex;
  flex-wrap: wrap;
`
const EventContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 30em;
  width: 33vw;
  border: white 3px solid;
  margin: 0 4em 4em 0;
  padding: 2em;
  font-family: 'Roboto Mono', monospace;
  color: white;
  @media screen and (max-width: 1400px){
    width: 100%;
    padding:0;
    font-size: 0.8rem;
    height: 37em;
  }
`;
const Link = styled.a`
text-decoration: none;
color: green;
&:hover{
  color:pink;
}
`
const Title = styled.div`
font-size: 2rem;
`
const Loading =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const IconContainer =styled.div`
display: flex;
margin-top: 2em;
`
const Delete= styled(MdOutlineDelete)`
  cursor: pointer;
`
const Edit = styled(FiEdit3)`
cursor: pointer;
color: white;
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
          // setDeletedEvent(eventId);
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
       {filteredEvents.length > 0 ? (
        filteredEvents.map((event, index) => (
          <EventContainer key={index}>
            <Title>{event.title}</Title>
            <div>{event.location.name}</div>
            <div>{event.location.address}</div>
            <div>Start time: {!event.start_time ? <div>N/A</div>: event.start_time}</div>
            <div>Start: {moment(event.start_date).format("DD MMMM, yy")}</div>
            <div>End: {moment(event.end_date).format("DD MMMM, yy")}</div>
            <div>Description: {event.description}</div>
            <div>Website: <Link href={event.url}>Go to {event.location.name}</Link></div>
            
            {currentUser &&
            <IconContainer>
            <NavLink to ={`/edit/${event._id}`}><Edit size={25}/></NavLink>
            <Delete size={25} onClick={() => handleDeleteEvent(event._id)}/>
            </IconContainer>
            }
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

export default EventCard;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { styled } from "styled-components";
import DatePicker from "react-datepicker";
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
  height: 45em;
  width: 35em;
  border: white 3px solid;
  margin: 0 4em 4em 0;
  padding: 2em;
  font-family: "Roboto Mono", monospace;
  color: white;
`;
const Label = styled.div``;
const InputTitle = styled.div``;
const DescInput = styled.textarea``;
const TitleInput = styled.input`
  all: unset;
  font-size: 2em;
  color: white;
  width: 15em;
  height: 3em;
  &::placeholder {
    color: white;
  }
  &:focus {
    border: pink solid 1px;
  }
`;
const Input = styled.input`
  all: unset;
  font-size: 1em;
  color: white;
  height: 2em;
  margin-bottom: 1.5em;
  &::placeholder {
    color: white;
  }
  &:focus {
    border: pink solid 1px;
  }
`;

const Title = styled.div`
  font-size: 2rem;
`;

const Website = styled.div``;
const Link = styled.a`
  text-decoration: none;
  color: green;
  &:hover {
    color: pink;
  }
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LongEventCard = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({});

  console.log({ event });
  useEffect(() => {
    let mounted = true;
    fetch(`/calend_art/events/${eventId}`)
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 400 || parse.status === 500) {
          throw new Error(parse.message);
        } else {
          if (mounted) {
            setEvent(parse.data);
            console.log({ parse });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      mounted = false;
    };
  }, [eventId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
   
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/calend_art/events/update/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 200) {
          console.log("Event updated successfully");
        } else {
          console.log("Event update failed");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Wrapper>
      {event ? (
        <EventContainer>
          <Label>
            <TitleInput
              type="text"
              name="title"
              placeholder={event.title}
              value={formData.title || ""}
              onChange={handleChange}
            />
          </Label>
          <Label>
            <Input
              type="text"
              name="name"
              placeholder={event.location.name}
              value={formData.name || ""}
              onChange={handleChange}
            />
          </Label>
          <Label>
            <Input
              type="text"
              name="address"
              placeholder={event.location.address}
              value={formData.address || ""}
              onChange={handleChange}
            />
          </Label>
          {/* <Label>
            <Input
              type="text"
              name="start_time"
              placeholder={`Start time: ${
                !event.start_time ? "N/A" : event.start_time
              }`}
              value={formData.start_time || ""}
              onChange={handleChange}
            />
          </Label>
          <Label>
          <DatePicker
            selected={formData.endDate}
            minDate={new Date(formData.startDate)}
            //   placeholder={`Start: ${moment(event.start_date).format(
            //     "DD MMMM, yy"
            //   )}`}
              name="startDate"
              value={formData.start_date || ""}
              onChange={handleChange}
            />
          </Label> */}
          {/* <Label>
          <DatePicker
            selected={formData.endDate}
            minDate={new Date(formData.startDate)}
              placeholder={`End: ${moment(event.end_date).format(
                "DD MMMM, yy"
              )}`}
              value={formData.end_date || ""}
              onChange={handleChange}
            />
          </Label> */}
          <Label>
            <InputTitle>Description</InputTitle>
            <DescInput
              type="text"
              name="description"
              rows="4"
              cols="35"
              placeholder={event.description}
              value={formData.description || ""}
              onChange={handleChange}
            />
          </Label>

          <Website>
            <Label>
              <Input
                type="text"
                name="url"
                placeholder={
                    <span>
                      Go to{" "}
                      <Link href={event.url}>{event.location.name}</Link>
                    </span>
                  }
                value={formData.url || ""}
                onChange={handleChange}
              />
            </Label>
            Website: Go to {event.location.name}
          </Website>
          <button type="submit" onClick={handleSubmit}>Save Changes</button>
        </EventContainer>
      ) : (
        <Loading>
          <SquircleLoader />
        </Loading>
      )}
    </Wrapper>
  );
};

export default LongEventCard;

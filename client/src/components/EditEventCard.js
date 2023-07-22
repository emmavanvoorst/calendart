import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { styled } from "styled-components";
import { Scrollbars } from "react-custom-scrollbars";
// import { SquircleLoader } from "react-awesome-loaders";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import moment from "moment";

const Wrapper = styled.div`
  padding: 0 15em;
  display: flex;
  flex-wrap: wrap;
`;
const PageTitle = styled.div`
  background-color: white;
  color: darkseagreen;
  width: 15vw;
  height: 4vh;
  font-size: 1.5rem;
`;
const EventContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 57em;
  width: 50vw;
  border: white 3px solid;
  margin: 0 4em 4em 0;
  padding: 2em;
  font-family: "Roboto Mono", monospace;
`;
const InputContainer = styled.div``;
const Label = styled.div`
  color: white;
  margin: 1.5em 0;
`;
const TitleLabel = styled.div`
  color: white;
`;
const InputTitle = styled.div``;
const DescInput = styled.textarea`
  width: 100%;
  all: unset;
  border: white solid 2px;
  color: white;
  &::placeholder {
    color: white;
  }
  &:focus {
    border: pink solid 1px;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 20px;
  }

  /* Track */
  &.track {
    bottom: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    width: 16px; /* must have some width */
  }

  /* Handle */
  &.thumbVertical {
    position: absolute;
    width: 50px; /* must have some width */
  }
`;
const TitleInput = styled.input`
  all: unset;
  font-size: 2em;
  color: white;
  width: 100%;
  height: 3em;
  border: white solid 2px;
  padding-left: 0.5em;
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
  height: 2em;
  width: 100%;
  border: white solid 2px;
  padding-left: 0.5em;
  &::placeholder {
    color: white;
  }
  &:focus {
    border: pink solid 1px;
  }
`;

const Title = styled.div`
  font-size: 0.8rem;
`;

const Website = styled.div``;
const Button = styled.button`
  all: unset;
  cursor: pointer;
  color: white;
  border: white 2px solid;
  width: 10em;
  height: 3em;
  text-align: center;
  font-weight: bold;
  &:hover {
    color: darkseagreen;
    background-color: white;
  }
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const EditEventCard = () => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    fetch(`https://calendart.vercel.app/calend_art/events/${eventId}`)
      .then((response) => response.json())
      .then((parse) => {
        if (parse.status === 400 || parse.status === 500) {
          throw new Error(parse.message);
        } else {
          if (mounted) {
            setFormData(parse.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.name ||
      !formData.address ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.eventLink ||
      !formData.desc
    ) {
      window.alert("Please fill in all the fields");
      return;
    }

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
          navigate("/events");
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
      <div>
        <PageTitle>Edit Event</PageTitle>
        {formData ? (
          <EventContainer>
            <InputContainer>
              <TitleLabel>
                <Title>Event Title</Title>
                <TitleInput
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({ ...formData, title: event.target.value })
                  }
                />
              </TitleLabel>
              <Label>
                <Title>Name of location</Title>
                <Input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                />
              </Label>
              <Label>
                <Title>Address</Title>
                <Input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={(event) =>
                    setFormData({ ...formData, address: event.target.value })
                  }
                />
              </Label>
              <Website>
                <Label>
                  <Title>Event url</Title>
                  <Input
                    type="text"
                    name="website"
                    value={formData.eventLink}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        eventLink: event.target.value,
                      })
                    }
                  />
                </Label>
              </Website>
              <Label>
                <InputTitle>Start Time</InputTitle>
                <input
                  type="time"
                  required
                  id="appt"
                  name="appt"
                  min="09:00"
                  max="18:00"
                  value={formData.startTime}
                  onChange={(time) =>
                    setFormData({ ...formData, startTime: time.target.value })
                  }
                />
              </Label>
              <Label>
                <Title>Start Date</Title>
                <DatePicker
                  selected={moment(formData.startDate).toDate()}
                  name="startDate"
                  onChange={(date) =>
                    setFormData({ ...formData, startDate: date })
                  }
                />
              </Label>
              <Label>
                <Title>End Date</Title>
                <DatePicker
                  selected={moment(formData.endDate).toDate()}
                  minDate={new Date(formData.startDate)}
                  onChange={(date) =>
                    setFormData({ ...formData, endDate: date })
                  }
                />
              </Label>
              <Label>
                <Title>Description</Title>

                <DescInput
                  type="text"
                  name="description"
                  required
                  rows="7"
                  cols="35"
                  value={formData.desc}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      desc: event.target.value,
                    })
                  }
                />
              </Label>
              <Button type="submit" onClick={handleSubmit}>
                Save Changes
              </Button>
            </InputContainer>
          </EventContainer>
        ) : (
          <Loading>
            LOADING....
          </Loading>
        )}
      </div>
    </Wrapper>
  );
};

export default EditEventCard;

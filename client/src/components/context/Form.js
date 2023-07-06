import { useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
// import TimePicker from "react-time-picker";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
// import 'react-clock/dist/Clock.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto Mono", monospace;
`;
const Label = styled.label`
  padding-bottom: 3em;
  color: white;
`;
const Input = styled.input`
  border: none;
  background-color: white;
  margin-left: 1em;
  width: 15em;
  height: 2em;
  font-family: "Roboto Mono", monospace;
  &:focus {
    border: none;
  }
`;
const DescInput = styled.textarea`
  border: none;
  background-color: white;
  margin-left: 1em;
`;
const SubmitInput = styled.button`
  all: unset;
  cursor: pointer;
  background-color: pink;
  padding: 1em 3em 1em 3em;
`;
const Form = () => {
  // const [value, onChange] = useState("10:00");
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    address: "",
    startDate: new Date(),
    endDate: new Date(),
    startTime: "",
    eventLink: "",
    desc: "",
  });
  // const [value, setValue] = useState('')

  const handleSubmit = () => {
    fetch("/calend_art/events/create", {
      method: "POST",
      body: JSON.stringify({
        title: formData.title,
        location: {
          name: formData.name,
          address: formData.address,
        },
        start_date: formData.startDate.valueOf(),
        end_date: formData.endDate.valueOf(),
        start_time: formData.startTime,
        url: formData.eventLink,
        description: formData.desc,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((res)=> res.json())
    .then((json)=>{
      const { status, error } = json;
      if(status === 201){
        window.alert("success")
      }else{
        console.log(error)
      }
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <>
      <Container>
        <Label>
          Event Title
          <Input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
            }
          />
        </Label>
        <Label>
          Name of Location
          <Input
            type="text"
            name="name"
            placeholder="Name of Venue"
            value={formData.location}
            onChange={(event) =>
              setFormData({ ...formData, location: event.target.value })
            }
          />
        </Label>
        <Label>
          Address
          <Input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={(event) =>
              setFormData({ ...formData, address: event.target.value })
            }
          />
        </Label>
        <Label>
          Start Date
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
          />
        </Label>
        <Label>
          End Date
          <DatePicker
            selected={formData.endDate}
            onChange={(date) => setFormData({ ...formData, endDate: date })}
          />
        </Label>
        <Label>
          Start Time
          <input
            type="time"
            id="appt"
            name="appt"
            min="09:00"
            max="18:00"
            value={formData.time}
            onChange={(time) => setFormData({ ...formData, startTime: time })}
          />
        </Label>
        <Label>
          Link to Event
          <Input
            type="text"
            name="website"
            placeholder="Link to Event"
            value={formData.eventLink}
            onChange={(event) =>
              setFormData({ ...formData, eventLink: event.target.value })
            }
          />
        </Label>
        <Label>
          Description
          <DescInput
            type="text"
            name="desc"
            rows="4"
            cols="35"
            value={formData.desc}
            onChange={(event) =>
              setFormData({ ...formData, desc: event.target.value })
            }
          />
        </Label>
        <SubmitInput onClick={handleSubmit}>Create Event</SubmitInput>
      </Container>
    </>
  );
};

export default Form;

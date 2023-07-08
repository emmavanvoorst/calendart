import { useState, useEffect } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";
// import TimePicker from "react-time-picker";

import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
// import 'react-clock/dist/Clock.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
`;
const Label = styled.div`
position: relative;
  padding-bottom: 3em;
  color: black;
  
`;
const Input = styled.input`
  border: none;
  background-color: white;
  margin-left: 1em;
  width: 15em;
  height: 2em;
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
  width: 10em;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const Flex= styled.div`
  display: flex;
`
const InputTitle=styled.label`
position:absolute;
left: 12%;
top: 10px;
transition: all 0.5s ease;
pointer-events: none;
&:focus{
  display:block;
  color: black;
  top: -20px;
  font-size: 14px;
}
`
const Form = () => {
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
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const isFormEmpty = Object.values(formData).some(value => value === '' || value === undefined);
  console.log(formData)
    setDisabled(isFormEmpty);
  }, [formData]);

  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.name ||
      !formData.address ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.startTime ||
      !formData.eventLink ||
      !formData.desc
    ) {
      window.alert("Please fill in all the fields");
      return;
    }

    console.log(formData.startTime);
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
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const { status, error } = json;
        if (status === 201) {
          window.alert("success");
        } else {
          console.log(error);
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
          <InputTitle>Event Title</InputTitle>
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
        <Flex>
        <Label>
          
          <Input
            type="text"
            name="name"
            placeholder
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          ></Input><InputTitle>Name of Location</InputTitle>
        </Label>
        <Label>
          <InputTitle>Address</InputTitle>
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
        </Flex>
        <Flex>
        <Label>
          <InputTitle>Start Date</InputTitle>
          <DatePicker
            selected={formData.startDate}
            onChange={(date) => setFormData({ ...formData, startDate: date })}
          />
        </Label>
        <Label>
          <InputTitle>End Date</InputTitle>
          <DatePicker
            selected={formData.endDate}
            minDate={new Date(formData.startDate)}
            onChange={(date) => setFormData({ ...formData, endDate: date })}
          />
        </Label>
        </Flex>
        <Label>
          <InputTitle>Start Time</InputTitle>
          <input
            type="time"
            id="appt"
            name="appt"
            min="09:00"
            max="18:00"
            value={formData.time}
            onChange={(time) =>
              setFormData({ ...formData, startTime: time.target.value })
            }
          />
        </Label>
        
        <Label>
          <InputTitle>Link to Event</InputTitle>
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
          <InputTitle>Description</InputTitle>
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
        <SubmitInput onClick={handleSubmit} disabled={disabled}>
          Create Event
        </SubmitInput>
      </Container>
    </>
  );
};

export default Form;

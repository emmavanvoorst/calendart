import { useState, useEffect } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";



const Wrapper =styled.div`
display: flex;
justify-content:center;
align-items: center;
`
const Container = styled.div`
  display: flex;
  width: 50em;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 5em;
  border: white solid 2px;
  
`;
const FormTitle = styled.div`
color: white;
font-size: 2rem;
margin: 0 0 1em 0.4em;
`
const Label = styled.div`
display: flex;
flex-direction: column;
  padding-bottom: 3em;
  color: black;
  
`;
const Input = styled.input`
  border: none;
  background-color: white;
  margin-left: 1em;
  width: 20em;
  height: 2em;
  &:focus {
    border: none;
  }
`;
const TimeInput = styled.input`
width: 8em;
`
const DescInput = styled.textarea`
  border: none;
  background-color: white;
  margin-left: 1em;
`;
const SubmitInput = styled.button`
  all: unset;
  cursor: pointer;
  border: white 2px solid;
  padding: 1em 3em 1em 3em;
  width: 10em;
  text-align: center;
  color: white;
  &:hover{
    background-color: white;
    color: darkseagreen;
    font-weight: bold;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const Flex= styled.div`
  display: flex;
`
const InputTitle=styled.label`
color:white;
font-size: 0.9rem;
margin-left: 0.9em;
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
    setDisabled(isFormEmpty);
  }, [formData]);

  const handleSubmit = () => {
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
    
    fetch("calendart-4zawbxdfw-emmavanvoorst.vercel.app/calend_art/events/create", {
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
    <Wrapper>
      <Container>
        <Label>
         <FormTitle>Add a New Event</FormTitle>
          <InputTitle>Event Title</InputTitle>
          <Input
            type="text"
            name="title"
            placeholder="Enter an event title"
            value={formData.title}
            onChange={(event) =>
              setFormData({ ...formData, title: event.target.value })
            }
          />
        </Label>
        <Flex>
        <Label>
          <InputTitle>Name of Location</InputTitle>
          <Input
            type="text"
            name="name"
            placeholder= "Name of event location"
            value={formData.name}
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }
          ></Input>
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
          <TimeInput
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
            placeholder="Provide a link to the event"
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
            placeholder="Describe your event"
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
    </Wrapper>
  );
};

export default Form;

import { useState } from "react";
import { styled } from "styled-components";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Container = styled.form`
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
  &:focus {
    border: none;
  }
`;
const DescInput = styled.input`
  border: none;
  background-color: white;
  margin-left: 1em;
  width: 20em;
  height: 7em;
`;
const SubmitInput = styled.input`
  all: unset;
  cursor: pointer;
  background-color: pink;
  padding: 1em 3em 1em 3em;
`;
const Form = () => {
  const [hour, setHour] = useState();
  const [startDate, setStartDate] = useState(new Date());

  const hours = Array.from({ length: 24 }, (_, i) => i + 1);

  const handleChange = (event) => {
    setHour(event.target.value);
  };

  return (
    <>
      <Container>
        <Label>
          Event Title
          <Input type="text" name="title" />
        </Label>
        <Label>
          Name of Venue
          <Input type="text" name="location" />
        </Label>
        <Label>
          Address
          <Input type="text" name="address" />
        </Label>
        <Label>
          Start Date
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </Label>
        <Label>
          End Date
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </Label>
        <Label>
          Start Time
          {/* <dropdown label="What Time" options={hours} onChange={handleChange} /> */}
          <Input type="text" name="time" />
        </Label>
        <Label>
          Link to Event
          <Input type="text" name="website" />
        </Label>
        <Label>
          Description
          <DescInput type="text" name="desc" />
        </Label>
        <SubmitInput type="submit" value="Create Event" />
      </Container>
    </>
  );
};

export default Form;

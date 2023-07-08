import { styled } from "styled-components";
import moment from "moment";
import heroimg from "../imgs/heroimg.png";

const Container = styled.div`
  position: relative;
  padding: 8em 0;
  text-align: center;
  color: black;
  font-weight: bold;
`;
const Flex = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Image = styled.img`
  width: 100%;
`;
const Text = styled.div`
  align-self: center;
  border: white 3px solid;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 8em 4em;
`;
const Title = styled.div`
  margin-bottom: 1em;
  font-size: 2rem;
`;
const Desc = styled.div`
  margin-bottom: 2em;
`;
const Date = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
`;

const Hero = () => {
  return (
    <Container>
      <Image src={heroimg} />
      <Flex>
        <Text>
          <Title>Calend'Art</Title>
          <Desc>Find local Montreal art events</Desc>
          <Date>Today is {moment().format("dddd, MMMM, yyy")}</Date>
        </Text>
      </Flex>
    </Container>
  );
};

export default Hero;

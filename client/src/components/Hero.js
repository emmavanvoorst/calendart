import { styled } from "styled-components";
import moment from "moment";
import heroimg from "../imgs/heroimg.png";
import { useState } from "react";
import { NavLink } from "react-router-dom";

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
  transition: 500ms;
  &:hover{
    transform: scale(1.3); 
    cursor: pointer;
  }
  @media screen and (max-width: 500px) {
    padding: 0.2em 1em;
  }
`;
const Title = styled.div`
  margin-bottom: 1em;
  font-size: 2rem;
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
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

const NLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  transition: 200ms;
  &:hover {
    color: rgba(0, 54, 132);
  }
`;

const Hero = () => {
 const [hover, setHover] = useState(false)

  const onMouseEnter= () =>{
      setHover(true)
  }
  const onMouseLeave= () =>{
    setHover(false)
}


  return (
    <Container>
      <Image src={heroimg} />
      <Flex onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave}>
      { hover !== true? 
        <Text>
          <Title>Calend'Art</Title>
          <Desc>Find local Montreal art events</Desc>
        </Text>:
        <NLink to="/about">
          <Text>
          <Title>Find out more<br/> about Calend'Art</Title>
        </Text></NLink>
     }
      </Flex> 
        
    </Container>
  );
};

export default Hero;

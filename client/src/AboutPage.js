import { styled } from "styled-components";
import aboutpage from "./imgs/aboutpage.png";

const Container = styled.div`
  position: relative;
`;
const Image = styled.img``;
const Position = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Text = styled.div`
  margin-bottom: 1em;
  background-color: white;
`;
const AboutPage = () => {
  return (
    <Container>
      <Image src={aboutpage} />
      <Position>
        <Text>About Calend'Art</Text>
        <Text>
          Montreal, a city renowned for its vibrant art scene, offers a plethora
          of vernissages and art events for enthusiasts to explore. While
          established artists often benefit from marketing funding for their
          shows, emerging and smaller artists face challenges in promoting their
          events to a wider audience. With my website, I aim to bridge this gap
          by providing a dedicated platform for smaller artists to showcase and
          advertise their events.</Text> 
          <Text>The website will serve as a comprehensive
          directory, offering vernissage goers easy access to a curated list of
          art events happening across the city. By featuring these lesser-known
          events, attendees will have the opportunity to discover and support
          emerging artists they might not have otherwise known about.
        </Text>
      </Position>
    </Container>
  );
};

export default AboutPage;

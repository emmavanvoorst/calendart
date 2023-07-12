import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { styled, css } from "styled-components";
import moment from "moment";

const Container = styled.div`
  z-index: 2001;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 8em;
  background-color: darkseagreen;
  border-bottom: pink 4px solid;
  @media screen and (max-width: 800px) {
    height: 6em;
  }
`;
const NavTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 4rem;
  margin: 0.5em 4em 0 1em;
  transition: 200ms;
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    font-size: 2.3rem;
  }
`;
const NavItem = styled.div`
  font-size: 2rem;
  color: white;
  font-weight: bold;
  margin-right: 2em;
  cursor: pointer;
  @media screen and (max-width: 1400px) {
    font-size: 1.4rem;
  }
`;

const Nav = styled.div`
margin-top: 0.5em;
  display: flex;
@media screen and (max-width: 1400px) {
   margin-top: 1.5em;
  display: flex;
  }
  
`

const Title = styled.p`
  font-family: "Instrument Sans", sans-serif;
`;

const NLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  transition: 500ms;
  &:hover {
    color: pink;
  }
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  border: white 2px solid;
  padding: 1em 2em;
  color: white;
  font-weight: bold;
  margin-right: 1.5em;
  &:hover {
    background-color: white;
    color: darkseagreen;
  }
  @media screen and (max-width: 1400px) {
   padding: 1em 1.5em;
   margin-top: 0.5em;
  }
  @media screen and (max-width: 830px) {
   padding: 0.05em 1.5em;
   margin-top: 0.5em;
  }
`;

const HamburgerMenu = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;
const HamIcon = styled.div`
  cursor: pointer;
  position: absolute;
  @media screen and (max-width: 900px) {
    display: flex;
  }
`;

const DropMenu = styled.div`
  position: absolute;
  top: 3.4em;
  right: 0;
  padding: 1em 1em 1.5em 2.5em;
  background-color: darkseagreen;
  border: pink solid 4px;
  border-top: none;
  line-height: 4em;
`;
const HamAni = styled.div`
  cursor: pointer;
  @media screen and (min-width: 900px) {
    display: none;
  }
`;
const StyledSpan = styled.span`
  position: relative;
  display: flex;
  margin-left: 80vw;
  height: 2px;
  width: 3em;
  background: white;
  border-radius: 2px;
  transition: transform 0.2s ease-in-out;

  &:nth-child(1) {
    top: 0;
    ${({ open }) =>
      open &&
      css`
        width: 0;
        left: 50%;
      `}
  }

  &:nth-child(2) {
    top: 8px;
    ${({ open }) =>
      open &&
      css`
        transform: rotate(45deg);
      `}
  }
  &:nth-child(3) {
    top: 6px;
    ${({ open }) =>
      open &&
      css`
        transform: rotate(-45deg);
      `}
  }

  &:nth-child(4) {
    top: 16px;
    ${({ open }) =>
      open &&
      css`
        top: 8px;
        width: 0;
        left: 50%;
      `}
  }
`;

const NavBar = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  const handleSignout = () => {
    setCurrentUser(null);
    sessionStorage.setItem("users", null);
    navigate("/");
  };

  const handleClick = () => {
    setActive((prevState) => !prevState);
    // setActive(true);
    // if (active === true) {
    //   setActive(false);
    // }
  };

  return (
    <Container>
      <NavTitle onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {" "}
        <NLink to="/">
          {hover === false ? (
            <Title>CALEND&apos;ART</Title>
          ) : (
            <Title>{moment().format("DD/MM/YYYY")}</Title>
          )}
        </NLink>
      </NavTitle>
      <HamburgerMenu>

      <Nav>
        <NavItem>
          <NLink to="/events">EVENTS</NLink>
        </NavItem>
        <NavItem>
          <NLink to="/about">ABOUT US</NLink>
        </NavItem>
        {currentUser ? (
          <NavItem>
            <NLink to="/addevent">ADD EVENT</NLink>
          </NavItem>
        ) : (
          <NavItem>
            <NLink to="/signin">LOG IN</NLink>
          </NavItem>
        )}
        </Nav>
        {currentUser && <Button onClick={handleSignout}>SIGN OUT</Button>}
      </HamburgerMenu>

      <HamIcon>
        <HamAni>
          <div id="nav-icon3" onClick={handleClick}>
            <StyledSpan open={active} />
            <StyledSpan open={active} />
            <StyledSpan open={active} />
            <StyledSpan open={active} />
          </div>
        </HamAni>
        {active === false ? null : (
          <DropMenu>
            <NavItem>
              <NLink to="/events">EVENTS</NLink>
            </NavItem>
            <NavItem>
              <NLink to="/about">ABOUT US</NLink>
            </NavItem>
            {currentUser ? (
              <NavItem>
                <NLink to="/addevent">ADD EVENT</NLink>
              </NavItem>
            ) : (
              <NavItem>
                <NLink to="/signin">LOG IN</NLink>
              </NavItem>
            )}
            {currentUser && <Button onClick={handleSignout}>SIGN OUT</Button>}
          </DropMenu>
        )}
      </HamIcon>
    </Container>
  );
};

export default NavBar;

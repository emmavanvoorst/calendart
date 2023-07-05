import { useState } from "react";
import {styled} from "styled-components";
import moment from "moment";
import { NavLink } from "react-router-dom";


const Container =styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 position: fixed;
 width: 100%;
 height: 8em;
 background-color: darkseagreen;
 border-bottom: pink 4px solid;
`
const NavItem =styled.div`
 font-family: 'Roboto Mono', monospace;
 font-size: 2rem;
 color: white;
 font-weight: bold;
 margin-right: 2em;
 cursor: pointer;
 
`
const NavTitle =styled.div`
 color: white;
 font-family: 'Instrument Sans', sans-serif;
 font-weight: bold;
 font-size: 4rem;
 margin: 0.5em 4em 0 1em;
 transition: 1000ms;
 cursor: pointer;
`

const NLink = styled(NavLink)`
 text-decoration: none;
 color:white;
 transition: 500ms;
 &:hover{
  color: pink;
 }
`


const NavBar = () => {
    const [hover, setHover] = useState(false);


    const handleMouseEnter = () => {
        setHover(true);   
      };
      const handleMouseLeave = () => {
        setHover(false);
      };


    return(
        <Container>
        <NavTitle 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}> <NLink to="/">{hover === false ? <p>CALEND&apos;ART</p>: <p>{moment().format("DD/MM/YYYY")}</p>}</NLink></NavTitle> 
        <NavItem><NLink to="/events">EVENTS</NLink></NavItem>
        <NavItem><NLink to="/addevent">ADD EVENT</NLink></NavItem> 
        </Container>
    )
}



export default NavBar;
import { useState } from "react";
import {styled} from "styled-components";
import moment from "moment";

const Container =styled.div`
 display: flex;
 align-items: center;
 height: 8em;
 background-color: darkseagreen;
`
const NavItem =styled.div`
 font-family: 'Roboto Mono', monospace;
 font-size: 2rem;
 color: white;
 font-weight: bold;
 margin-right: 2em;
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
        onMouseLeave={handleMouseLeave}> {hover === false ? <p>CALEND&apos;ART</p>: <p>{moment().format("DD/MM/YYYY")}</p>}</NavTitle> 
        <NavItem>CALENDAR</NavItem> 
        <NavItem>MY ACCOUNT</NavItem> 
        </Container>
    )
}



export default NavBar;
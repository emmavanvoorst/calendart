import {styled} from "styled-components";

const Container =styled.div`
 display: flex;
 align-items: center;
 height: 5em;
 background-color: darkseagreen;
`
const NavItem =styled.div`
 color: white;
 font-weight: bold;
`

const NavBar = () => {

    return(
        <Container>
        <NavItem>CALEND&apos;ART</NavItem> 
        <NavItem>CALENDAR</NavItem> 
        </Container>
    )
}



export default NavBar;
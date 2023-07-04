import {styled} from "styled-components";
import moment from "moment";

const ImagePlaceholder = styled.div`
position: relative;
 background-color: gainsboro;
 height: 100vh;
`
const Date = styled.div`
 position: absolute;
`

const Hero = () => {
return(
    <>
    <ImagePlaceholder></ImagePlaceholder>
    <Date>{moment().format("dddd, mmmm, yyy")}</Date>
    </>
)
}

export default Hero;
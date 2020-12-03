import styled from 'styled-components';
import bg from '../../images/bg-photo.jpg';

export const BackgroundImage = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -2;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-attachment: fixed; 
  background-size: cover;
  &:before {
    content: '';
    z-index: -1;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(to bottom right,#002f4b,#dc4225);
    opacity: .5; 
  }
`
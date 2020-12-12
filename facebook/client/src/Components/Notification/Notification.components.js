import styled from 'styled-components';

export const NotificationContainer = styled.div`
  padding: .5rem;
  border-radius: 5px;
  background: ${({clicked}) => (!clicked ? 'rgba(200,0,20,.15)' : 'white')};
  display: flex;
  align-items: center;
  

  &:hover {
    background: lightgray;
    cursor: pointer;
  }
`

export const UserImage = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-image: ${({src}) => (`(${src})`)};
  background-size: 100%;
  background-repeat: no-repeat;
`
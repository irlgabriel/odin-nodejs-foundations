import styled from 'styled-components';

export const CoverPhoto = styled.img`
  width: 100%;
  height: 320px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`

export const ProfilePhoto = styled.img`
  position: absolute;
  width: 192px;
  height: 192px;
  border-radius: 96px;
  left: calc(50% - 96px);
  bottom: -15px;
  border: 3px solid white;
  z-index: 5;
`

export const ProfileSection = styled.div`
  width: min(100%, 950px);
  margin: 0 auto;
  margin-bottom: 30px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  position: relative;
`

export const ProfileHeader = styled.div`
  width: min(100%, 950px);
  margin: 0 auto;
`
export const ProfileNav = styled.div`
  display: flex;
  align-items: center;
`
export const NavItem = styled.div`
  padding: 1rem;
  background: white;
  transition: all .2s;
  font-weight: bold;
  border-radius: ${({active}) => (active ? '0' : '6px')};
  border-bottom: ${({active}) => (active ? '3px solid royalblue' : '')};
  color: ${({active}) => (active ? 'royalblue' : 'black')};
  &:hover {
    cursor: pointer;
    border-radius: 0;
    background: ${({active}) => (active ? 'white': '#f0f2f5')};
  }
`
export const Main = styled.div`
  display: flex;
  width: min(100%, 950px);
  margin: 0 auto;
`
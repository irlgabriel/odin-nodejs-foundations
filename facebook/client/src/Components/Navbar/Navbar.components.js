import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavMidItem = styled(Link)`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({active}) => (active ? '3px solid royalblue' : '')};
`

export const RoundWrapper = styled.div`
  background: #f0f2f5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    background: lightgray;
  }
`

export const CollapsableDiv = styled.div`
  padding: .5rem;
  border-radius: 6px;
  background: white;
  position: absolute;
  top: 60px;
  right: 15px;
  width: 350px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1);
`

export const RoundImage = styled.img`
  border-radius: 32px;
  width: 64px;
  height: 64px;
  z-index: 2;
`

export const GrayHover = styled.div`
  display: flex;
  align-items: center;
  padding: .5rem;
  background: white;
  border-radius: 6px;
  &:hover {
    background: #f0f2f5;
    cursor: pointer;
  }
`

export const LinkGreyHover = styled(Link)`
  color: black;
  background: white;
  &:hover {
    text-decoration: none;
    color: black;
  }
`
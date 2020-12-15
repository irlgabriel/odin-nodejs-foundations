import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

export const MenuIcon = styled(FiMenu)`
  font-size: 32px;
  &:hover {
    cursor: pointer;
    opacity: .75;
  }
`

export const RegularLink = styled(Link)`
  color: black;
  &:hover {
    text-decoration: none;
    color: black;
  }
`

export const NavMidItem = styled(Link)`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: ${({active}) => (active ? '3px solid royalblue' : '3px solid white')};
`

export const RoundWrapper = styled.div`
  position: relative;
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

export const RoundedUserDiv = styled.div`
  background: ${({active}) => (active ? 'rgba(0,44,200,.2)' : 'white')};
  color: ${({active}) => (active ? 'royalblue' : 'black')};
  font-weight: bold;
  border-radius: 16px;
  padding: .25rem;
  display: flex;
  align-items: center;
  &:hover {
    background: #f0f2f5;
    cursor: pointer;
  }
`

export const TopRightUserImg = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 14px;
`

export const NewNotifications = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  right: -5px;
  bottom: -5px;
  position: absolute;
  background: red;
  color: white;
  font-size: 13px;

  &:before {
    content: '${({count}) => (count)}'
  }
`

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
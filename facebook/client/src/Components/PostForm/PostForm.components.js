import styled from 'styled-components';

export const RoundImage = styled.img`
  border-radius: 20px;
  width: 36px;
  height: 36px;
  z-index: 2;
`
export const GrayHover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  &:hover {
    background: lightgray;
    border-radius: 6px;
    cursor: pointer;
  }
`
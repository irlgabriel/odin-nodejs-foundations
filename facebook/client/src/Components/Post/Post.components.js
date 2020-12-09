import styled from 'styled-components';

export const PostContainer = styled.div`
  background: white;
  padding: .5rem;
  border-radius: 5px;
`
export const RoundImage = styled.img`
  border-radius: 21px;
  width: 42px;
  height: 42px;
  margin-right: .5rem;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
`
export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`
export const Body = styled.div`
  display: flex;
  flex-direction: column;
`
export const Footer = styled.div`
  display: flex;
  flex-direction: column;
`
export const TopFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const BottomFooter = styled.div`
  display: flex;
  align-items: center;
`
export const RoundWrapper = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${({bgColor}) => (bgColor)};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FooterItem = styled.div`
  width: 50%;
  border-radius: 5px;
  background: white;
  transition: all .3s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .5rem;
  font-weight: bold;
  &:hover {
    background: #f0f2f5;
    cursor: pointer;
  }
`
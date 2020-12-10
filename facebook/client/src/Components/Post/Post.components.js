import styled from 'styled-components';

export const PostContainer = styled.div`
  background: white;
  padding: .5rem 1rem;
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
  position: relative;
`
export const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const RoundedContainer = styled.div`
  border-radius: 5px;
  padding: .5rem;
  position: absolute;
  top: 50px;
  right: 10px;
  background: white;

`

export const RoundedWrapper = styled.div`
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


export const CommentsContainer = styled.div`
`
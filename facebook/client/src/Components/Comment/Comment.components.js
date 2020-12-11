import styled from 'styled-components';

export const CommentContainer = styled.div`
  display: flex;
  margin-bottom: .5rem;
`

export const UserPhoto = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

export const CommentBody = styled.div`
  padding: .5rem;
  width: 100%;
  border-radius: 10px;
  background: #f0f2f5;
`

export const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const CommentFooter = styled.div`
  display: flex;
  align-items: center;
`

export const FooterLink = styled.p`
  font-weight: ${({bold}) => (bold ? 'bold' : '')};
  font-size: 12px;
  color: ${({color}) => (color ? color : 'black')};
  margin-right: .5rem;
  &:hover {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }
`
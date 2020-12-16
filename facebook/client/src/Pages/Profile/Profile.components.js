import styled from "styled-components";

export const CoverPhoto = styled.div`
  width: 100%;
  height: 320px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-size: 100%;
`;

export const DefaultCoverPhoto = styled.div`
  background: rgb(239, 239, 241);
  background: linear-gradient(
    180deg,
    rgba(239, 239, 241, 1) 0%,
    rgba(115, 113, 113, 1) 96%
  );
  width: 100%;
  height: 320px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

export const ProfilePhotoWrapper = styled.div`
  position: absolute;
  left: calc(50% - 96px);
  bottom: -25px;
  border: 1px solid darkgray;
  border-radius: 96px;
`;

export const ProfilePhoto = styled.div`
  width: 192px;
  height: 192px;
  z-index: 5;
  background-image: ${({ src }) => `url(${src})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border-radius: 96px;
  border: 4px solid white;
`;

export const ChangeProfilePhoto = styled.div`
  padding: 0.25rem;
  border-radius: 18px;
  display: grid;
  place-items: center;
  background: lightgray;
  width: 36px;
  height: 36px;
  position: absolute;
  right: 10px;
  bottom: 15px;
  z-index: 6;
  &:hover {
    background: darkgray;
    cursor: pointer;
  }
`;

export const ProfileSection = styled.div`
  width: min(100%, 950px);
  margin: 0 auto;
  margin-bottom: 30px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  position: relative;
`;

export const ProfileHeader = styled.div`
  width: min(100%, 950px);
  margin: 0 auto;
`;
export const ProfileNav = styled.div`
  display: flex;
  align-items: center;
`;
export const NavItem = styled.div`
  padding: 1rem;
  background: white;
  transition: all 0.2s;
  font-weight: bold;
  border-radius: ${({ active }) => (active ? "0" : "6px")};
  border-bottom: ${({ active }) => (active ? "3px solid royalblue" : "")};
  color: ${({ active }) => (active ? "royalblue" : "black")};
  &:hover {
    cursor: pointer;
    border-radius: 0;
    background: ${({ active }) => (active ? "white" : "#f0f2f5")};
  }
`;
export const Main = styled.div`
  display: flex;
  width: min(100%, 950px);
  margin: 0 auto;
`;

export const GrayHoverDiv = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 6px;
  background: #f0f2f5;

  padding: 0.5rem 0.25rem;
  &:hover {
    background: lightgray;
    cursor: pointer;
  }
`;

export const FlexDivGray = styled.div`
  max-width: 200px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 6px;

  background: #f0f2f5;
  padding: 0.5rem 0.25rem;
  &:hover {
    opacity: 0.75;
    cursor: pointer;
  }
`;


export const CollapseDiv = styled.div`
  position: absolute;
  min-width: 150px;
  background: white;
  bottom: -45px;
  right: 0px;
  border-radius: 6px;
  padding: .25rem;
  border: 1px solid lightgray;
`

export const Option = styled.div`
  border-radius: 5px;
  background: white;
  padding: .25rem;
  transition: all .2s ease-in-out;
  &:hover {
    background: lightsalmon;
    cursor: pointer;
  }
`
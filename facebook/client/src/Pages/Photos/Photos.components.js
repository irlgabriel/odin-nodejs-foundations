import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';

export const PhotosContainer = styled(Container)`
  display: flex;
  padding: .5rem;
  border-radius: 5px;
  background: white;
  width: 100%;
`

export const PhotoWrapper = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`

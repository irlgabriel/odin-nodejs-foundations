import styled from 'styled-components';
import { Container } from 'reactstrap';

export const SectionFlex = styled(Container)`
  display: flex;
  align-items: center;
  width: 100%;
`

export const Section = styled(Container)`
  padding: .5rem;
`

export const FooterItem = styled.div`
  padding: .5rem 1rem;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    opacity: .5;
  }
`
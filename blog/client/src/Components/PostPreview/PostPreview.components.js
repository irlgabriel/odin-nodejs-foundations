import styled from 'styled-components';
import { Container } from 'reactstrap';

export const Preview = styled.div`
  max-width: 400px;
  margin-left: 1rem;
  margin-top: 1rem;
  border: 1px solid white;
  border-radius: 4px;
  padding: .5rem;
  display: flex;
  flex-direction: column;
`
export const SectionFlex = styled(Container)`
  width: 100%;
  padding: .5rem;
  display: flex;
  align-items: center;
`
export const Section = styled(Container)`
  width: 100%;
  padding: .5rem;
`
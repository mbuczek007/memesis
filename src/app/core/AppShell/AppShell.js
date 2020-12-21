import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

const AppShell = (props) => {
  const { children } = props;

  return (
    <RootElem>
      <Header />
      <StyledMuiContainer component='main'>
        <Grid container>{children}</Grid>
      </StyledMuiContainer>
      <Footer />
    </RootElem>
  );
};

const RootElem = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  background-color: #f3f3f3;
`;

const StyledMuiContainer = styled(Container)`
  padding-top: ${({ theme }) => theme.spacing(8)}px;
  padding-bottom: ${({ theme }) => theme.spacing(6)}px;
  max-width: 750px;
`;

export default AppShell;

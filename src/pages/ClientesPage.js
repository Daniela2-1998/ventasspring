import React from 'react';
import styled from 'styled-components';
import ClienteList from '../components/ClienteList';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Title = styled.h1`
  color: rgb(92, 35, 146);
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem 0;
  margin-top: 2rem;
  color: rgb(92, 35, 146);
  font-size: 0.9rem;
`;

const ClientesPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <PageContainer>
      <Title>Gestión de Clientes</Title>
      <ContentWrapper>
        <ClienteList />
      </ContentWrapper>
      <Footer>
        © {currentYear} Desarrollado por Daniela Ailen Mansilla | Fullstack Developer con React y Spring
      </Footer>
    </PageContainer>
  );
};

export default ClientesPage;

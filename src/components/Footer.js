import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: rgb(92, 35, 146);
  color: white;
  text-align: center;
  padding: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <p>© {currentYear} Daniela Ailen Mansilla - Desarrolladora Fullstack con React y Spring</p>
    </FooterContainer>
  );
};

export default Footer;

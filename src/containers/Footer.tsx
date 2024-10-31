import React from 'react';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-red text-white py-3 mt-auto">
      <Container className="text-center">
        &copy; {new Date().getFullYear()} Dans-Jobs Portal. All Rights Reserved.
      </Container>
    </footer>
  );
};

export default Footer;

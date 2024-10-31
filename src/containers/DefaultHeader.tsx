import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const DefaultHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
         // Hapus token dari localStorage atau sessionStorage
        localStorage.removeItem('token');
        // Arahkan kembali ke halaman utama
        navigate('/');
        // Refresh halaman untuk memastikan state diperbarui
        window.location.reload();
    };

  return (
    <Navbar bg="dark-red" variant="dark" expand="lg">
      <Container className='header-logo'>
        <Navbar.Brand href="/"><b>Dans-Jobs</b> Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/jobs">Job List</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
             <Nav.Link href="#" onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DefaultHeader;

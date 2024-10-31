import React from 'react';
import { Nav } from 'react-bootstrap';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar bg-light vh-100 p-3 d-none d-md-block" style={{ width: '250px' }}>
      <Nav className="flex-column">
        <Nav.Link href="/jobs" className="text-dark">
          Job List
        </Nav.Link>
        {/* Tambahkan item menu lainnya sesuai kebutuhan */}
      </Nav>
    </div>
  );
};

export default Sidebar;

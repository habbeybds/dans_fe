import React, { useState } from 'react';
import { Form, FormControl, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100 justify-content-center">
        <Col md={6}>
          <Card className='cover-login'>
            <Card.Header className='header-login text-center'>
              <img
                className="logo-login"
                src={require("../assets/img/logo180.png")}
                alt="Bhinneka Logo"
                width={100}
              />
            </Card.Header>
            <Card.Body className='body-login'>
              <div className="text-center mb-5">
                <h4>Masuk ke akun Dans-Jobs</h4>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <FormControl
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <FormControl
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <div className="text-center mt-5">
                  <Button
                    type="submit"
                    className="btn-md btn-rounded btn btn-danger"
                    style={{
                      color: "#ffffff",
                    }}
                  >
                    {/* Gunakan ikon */}
                    <FontAwesomeIcon icon={faArrowRightToBracket} color="white" />&nbsp;MASUK
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

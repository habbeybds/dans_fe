import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getJobDetail } from '../api/jobApi';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import DefaultHeader from '../containers/DefaultHeader';
import Sidebar from '../containers/Sidebar';
import Footer from '../containers/Footer';

const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    const fetchJob = async () => {
      const result = await getJobDetail(id!);
      setJob(result);
    };
    fetchJob();
  }, [id]);

  const handleBackClick = () => {
    // Navigasi kembali ke JobListPage dengan state filter sebelumnya
    navigate('/jobs', { state: location.state });
  };

  if (!job) return <div className="text-center my-4">
  <Spinner animation="border" />
</div>;

  return (
    <div className="d-flex flex-column vh-100">
      <DefaultHeader />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <Container className="my-5">
          <Button variant="link" onClick={handleBackClick} className="mb-4">&larr; Back</Button>
          <Row>
            <Col md={8}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Subtitle className="text-muted mb-2">
                    {job.type} / {job.location}
                  </Card.Subtitle>
                  <Card.Title as="h1" className="mb-3">{job.title}</Card.Title>
                  <Card.Subtitle className="text-muted mb-3">
                    Posted {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
                  </Card.Subtitle>
                  <Card.Text dangerouslySetInnerHTML={{ __html: job.description }} />
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>{job.company}</Card.Title>
                  {job.company_logo && (
                    <img
                      src={job.company_logo}
                      alt={`${job.company} logo`}
                      className="img-fluid mb-3"
                      style={{ maxHeight: '100px' }}
                    />
                  )}
                  {job.company_url && (
                    <Card.Text>
                      <a href={job.company_url} target="_blank" rel="noopener noreferrer">
                        {job.company_url}
                      </a>
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <Card.Title>How to apply</Card.Title>
                  <Card.Text dangerouslySetInnerHTML={{ __html: job.how_to_apply }} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetailPage;

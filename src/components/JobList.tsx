import React from 'react';
import { Card, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  created_at: string;
}

interface JobListProps {
  jobs: Job[];
  onJobClick: (jobId: string) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, onJobClick}) => {
  return (
    <Container className="my-5">
      <h4 className="mb-4">Job List</h4>
      <ListGroup variant="flush">
        {jobs.map((job) => (
          <ListGroup.Item key={job.id} className="mb-3" onClick={() => onJobClick(job.id)}>
            <Card>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={8}>
                    <Card.Title className="text-primary">
                      <a href={`/jobs/${job.id}`} className="text-decoration-none">
                        {job.title}
                      </a>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.company} - <span className="badge bg-success">{job.type}</span></Card.Subtitle>
                  </Col>
                  <Col md={4} className="text-md-right">
                    <Card.Text>
                      <small className="text-muted">{job.location}</small> <br/>
                      <small className="text-muted">{formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}</small>
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default JobList;

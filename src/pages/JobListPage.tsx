import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchJobs } from "../slices/jobSlice";
import JobList from "../components/JobList";
import DefaultHeader from "../containers/DefaultHeader";
import Sidebar from "../containers/Sidebar";
import Footer from "../containers/Footer";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const JobListPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const loading = useSelector((state: RootState) => state.jobs.loading);

  // Ambil state filter sebelumnya jika ada, atau gunakan default values
  const initialFilters = location.state || {
    page: 1,
    search: "",
    location: "",
    fullTime: false,
  };

  const [page, setPage] = useState(initialFilters.page);
  const [search, setSearch] = useState(initialFilters.search);
  const [locationFilter, setLocationFilter] = useState(initialFilters.location);
  const [fullTime, setFullTime] = useState(initialFilters.fullTime);

  useEffect(() => {
    dispatch(
      fetchJobs({
        page,
        description: search,
        location: locationFilter,
        full_time: fullTime,
      })
    );
  }, [dispatch, page, search, locationFilter, fullTime]);

  const handleJobClick = (jobId: string) => {
    // Navigasi ke detail pekerjaan dengan state filter saat ini
    navigate(`/jobs/${jobId}`, {
      state: { page, search, location: locationFilter, fullTime },
    });
  };

  return (
    <div className="d-flex flex-column vh-100">
      <DefaultHeader />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <Container className="my-5">
          <h4 className="mb-4">Job Search</h4>
          <Form>
            <Row className="align-items-center mb-3">
              <Col md={4} className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Filter by title, benefits, companies, expertise"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col md={4} xs={8} className="mb-2">
                <Form.Control
                  type="text"
                  placeholder="Filter by city, state zip code or country"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </Col>
              <Col md={2} xs={4}>
                <Form.Check
                  type="checkbox"
                  label="Full Time"
                  checked={fullTime}
                  onChange={() => setFullTime(!fullTime)}
                />
              </Col>
              <Col md={2}>
                <Button variant="primary" onClick={() => setPage(1)}>
                <FontAwesomeIcon icon={faMagnifyingGlass} color="white" />&nbsp;Search
                </Button>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col md={10}>
              {loading ? (
                <div className="text-center my-4">
                  <Spinner animation="border" />
                </div>
              ) : jobs.length > 0 ? (
                <JobList jobs={jobs}  onJobClick={handleJobClick} />
              ) : (
                <p className="text-center mt-4">
                  Tidak ada Jobs ditemukan sesuai kriteria anda.
                </p>
              )}
              <div className="d-flex justify-content-between mt-4">
                <Button
                  variant="secondary"
                  onClick={() => setPage((prev: number) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                {jobs.length > 0 && (
                  <Button
                    variant="secondary"
                    onClick={() => setPage((prev: number) => prev + 1)}
                  >
                    Next
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default JobListPage;

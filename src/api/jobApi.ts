import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getJobs = async (page: number, description?: string, location?: string, full_time?: boolean) => {
  const params: any = { page };
  if (description) params.description = description;
  if (location) params.location = location;
  if (full_time !== undefined) params.full_time = full_time;

  const response = await axios.get(`${API_URL}/jobs`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    params,
  });
  return response.data;
};

export const getJobDetail = async (id: string) => {
  const response = await axios.get(`${API_URL}/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
  });
  return response.data;
};

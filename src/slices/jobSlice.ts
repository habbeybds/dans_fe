import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getJobs, getJobDetail } from '../api/jobApi';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  description?: string;
  created_at: string;
}

interface JobState {
  jobs: Job[];
  jobDetail: Job | null;
  loading: boolean;
}

const initialState: JobState = {
  jobs: [],
  jobDetail: null,
  loading: false,
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params: { page: number; description?: string; location?: string; full_time?: boolean }) => {
    const response = await getJobs(params.page, params.description, params.location, params.full_time);
    return response.jobs;
  }
);

export const fetchJobDetail = createAsyncThunk(
  'jobs/fetchJobDetail',
  async (id: string) => {
    const response = await getJobDetail(id);
    return response;
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action: PayloadAction<Job[]>) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchJobDetail.fulfilled, (state, action: PayloadAction<Job>) => {
        state.jobDetail = action.payload;
      });
  },
});

export default jobSlice.reducer;

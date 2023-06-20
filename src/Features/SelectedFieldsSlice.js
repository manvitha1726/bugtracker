import { createSlice } from '@reduxjs/toolkit';

const selectedFieldsSlice = createSlice({
  name: 'selectedFields',
  initialState: {
    selectedProjectId: null,
    selectedIssueId: null,
  },
  reducers: {
    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },
    setSelectedIssueId: (state, action) => {
      state.selectedIssueId = action.payload;
    }
  },
});

export const { setSelectedProjectId, setSelectedIssueId} = selectedFieldsSlice.actions;

export default selectedFieldsSlice.reducer;

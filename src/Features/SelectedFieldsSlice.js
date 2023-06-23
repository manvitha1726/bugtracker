import { createSlice } from '@reduxjs/toolkit';

const selectedFieldsSlice = createSlice({
  name: 'selectedFields',
  initialState: {
    selectedFilters: null,
    selectedProjectId: null,
    selectedIssueId: null,
  },
  reducers: {
    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload;
    },
    setSelectedIssueId: (state, action) => {
      state.selectedIssueId = action.payload;
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    }
  },
});

export const { setSelectedProjectId, setSelectedIssueId, setSelectedFilters} = selectedFieldsSlice.actions;

export default selectedFieldsSlice.reducer;

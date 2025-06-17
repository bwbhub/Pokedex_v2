import { createSlice } from "@reduxjs/toolkit"

export const localLoadingSlice = createSlice({
  name: "LocalLoadMode",
  initialState: {
    localLoading: false
  },
  reducers: {
    setLocalLoading: (state, action) => {
      state.localLoading = action.payload
    }
  }
})

export const { setLocalLoading } = localLoadingSlice.actions

export default localLoadingSlice.reducer

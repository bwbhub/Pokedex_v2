import { configureStore } from "@reduxjs/toolkit"
import globalLoadingSlice from "./features/globalLoadingSlice"
import localLoadingSlice from "./features/localLoadingSlice"

const store = configureStore({
  reducer: {
    globalLoading: globalLoadingSlice,
    localLoading: localLoadingSlice
  }
})

export default store

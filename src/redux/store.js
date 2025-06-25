import { configureStore } from "@reduxjs/toolkit"
import globalLoadingSlice from "./features/globalLoadingSlice"
import localLoadingSlice from "./features/localLoadingSlice"
import languageSlice from "./features/languageSlice"

const store = configureStore({
  reducer: {
    globalLoading: globalLoadingSlice,
    localLoading: localLoadingSlice,
    language: languageSlice
  }
})

export default store

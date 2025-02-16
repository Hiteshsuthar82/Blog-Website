import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authslice";
import resumeReducer from "../features/resumeSlice";
import sampleReducer from "../features/sampleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resume: resumeReducer,
    sample: sampleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific action types
        ignoredActions: ["resume/getUsersPermanentsDetail/rejected"],
        // Ignore specific paths in the state or action
        ignoredPaths: ["meta.headers"],
      },
    }),
});

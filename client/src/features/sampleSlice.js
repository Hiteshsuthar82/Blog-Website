import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  status: false,
  data: null,
};

export const uploadImage = createAsyncThunk(
  "sample/uploadImage",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/temp/upload-image`,
        credentials,
        {
          withCredentials: true ,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("image uploaded successfully.");
      return response.data;
    } catch (error) {
      console.log("error in uploading image.", error.payload);
      return rejectWithValue("uploadImage :: error ", error.payload);
    }
  }
);

export const updateImage = createAsyncThunk(
  "sample/updateImage",
  async (credentials, { rejectWithValue }) => {
    const id = credentials.get('sampleId');
        
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/v1/temp/image/${id}`,
        credentials,
        {
          withCredentials: true ,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("image updated successfully.");
      return response.data;
    } catch (error) {
      console.log("error in updating image.", error.payload);
      return rejectWithValue("updateImage :: error ", error.payload);
    }
  }
);

export const createSample = createAsyncThunk(
  "sample/create",
  async (credentials, { rejectWithValue }) => {
    console.log(credentials);
    
    try {
      const response = await axios.post(
        // "http://localhost:8000/api/v1/temp/edit-resume",
        "http://api/url",
        credentials,
        { withCredentials: true }
      );

      console.log("create successfully.");
      return response.data;
    } catch (error) {
      return rejectWithValue("createSample :: error ", error.payload);
    }
  }
);

export const getAllSample = createAsyncThunk(
  "sample/getAllSample",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        // `http://localhost:8000/api/v1/temp/Allresume`,
        "http://api/url",
        { withCredentials: true }
      );

      console.log("all data fetched successfully.");
      return response.data;
    } catch (error) {
      console.log("error occur in getAllSample : ", error.response);
      return rejectWithValue("getAllSample :: error ", error.response.data);
    }
  }
);

export const deleteSample = createAsyncThunk(
  "sample/deleteSample",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        // `http://localhost:8000/api/v1/temp/delete/resume/${credentials?.resumeId}`,
        `http://api/url//${credentials?.id}`,
        { withCredentials: true }
      );
      console.log(response.data);

      return true;
    } catch (error) {
      console.log("selected deleted successfully.");
      return rejectWithValue("deleteSample :: error ", error.response.data);
    }
  }
);

export const updateSample = createAsyncThunk(
  "sample/edit",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        // `http://localhost:8000/api/v1/temp/resume-edit/${credentials?.resumeId}`,
        `http://api/url//${credentials?.id}`,
        credentials?.formData,
        { withCredentials: true }
      );
      console.log("updated successfully.");
      return response.data;
    } catch (error) {
      return rejectWithValue("updateSample :: error ", error.response);
    }
  }
);

export const sampleSlice = createSlice({
  name: "sample",
  initialState,
  extraReducers: (builder) => {
    // upload image
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(uploadImage.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload;
      })
      .addCase(uploadImage.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // update image
    builder
      .addCase(updateImage.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(updateImage.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload;
      })
      .addCase(updateImage.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // create Sample
    builder
      .addCase(createSample.pending, (state) => {
        state.loading = true;
        state.status = false;
        state.data = null;
      })
      .addCase(createSample.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload;
      })
      .addCase(createSample.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // edit Sample
    builder
      .addCase(updateSample.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSample.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload;
      })
      .addCase(updateSample.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // getting all Sample data
    builder
      .addCase(getAllSample.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllSample.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
        state.data = actions.payload.data;
      })
      .addCase(getAllSample.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });

    // delete Sample
    builder
      .addCase(deleteSample.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSample.fulfilled, (state, actions) => {
        state.loading = false;
        state.status = true;
      })
      .addCase(deleteSample.rejected, (state) => {
        state.loading = false;
        state.status = false;
      });
  },
});

export default sampleSlice.reducer;

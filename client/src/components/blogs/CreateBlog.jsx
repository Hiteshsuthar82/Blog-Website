import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL;

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!content.trim()) {
      newErrors.content = "Content is required";
    }
    if (!image) {
      newErrors.image = "Banner image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setLoading(true);
    setErrors({ ...errors, image: "" });

    const formData = new FormData();
    formData.append("onlyimage", file);

    try {
      const response = await axios.patch(
        `${apiurl}/user/only-uplaod-image`,
        formData
      );
      if (response?.data.success) {
        setImage(response.data.data);
      }
    } catch (error) {
      setErrors({ ...errors, image: "Failed to upload image. Please try again." });
      console.error("Image upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (isPublished) => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("isPublished", isPublished);
    
    // If image is a File object, append it
    if (image instanceof File) {
      formData.append("image", image);
    } else if (typeof image === "string") {
      // If image is already uploaded and we have the URL
      formData.append("image", image);
    }

    console.log(formData);
    

    try {
      const response = await axios.post(
        `${apiurl}/blog/blogcreate`,
        formData, // ✅ Send the FormData object as it is
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Keep this if needed
        }
      );
      
      // const response = await axios.post(
      //   `${apiurl}/blog/blogcreate`,
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      console.log(response);
      
      if (response.data.statusCode === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      
      const errorMessage = error.response?.data?.message || "Failed to create blog post";
      setErrors({ ...errors, submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Create New Blog Post
          </h1>
          <p className="text-lg text-gray-600">
            Share your thoughts with the world
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Blog Title *
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter your blog title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setErrors({ ...errors, title: "" });
              }}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.title ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200`}
            />
            {errors.title && (
              <p className="mt-2 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image *
            </label>
            <div className="relative">
              {previewImage || image ? (
                <div className="relative">
                  <img
                    src={image || previewImage}
                    alt="Banner"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <label
                      htmlFor="image-upload"
                      className="px-4 py-2 bg-white text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 transition duration-200"
                    >
                      Change Banner
                    </label>
                  </div>
                  {loading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
                    </div>
                  )}
                </div>
              ) : (
                <label
                  htmlFor="image-upload"
                  className={`flex items-center justify-center w-full h-64 border-2 border-dashed ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  } rounded-lg cursor-pointer hover:border-blue-500 transition duration-200`}
                >
                  <div className="text-center">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <svg
                        className="h-12 w-12"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      Click to upload banner image
                    </p>
                  </div>
                </label>
              )}
              <input
                type="file"
                id="image-upload"
                onChange={handleImageUpload}
                className="hidden"
                accept="image/*"
              />
            </div>
            {errors.image && (
              <p className="mt-2 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content *
            </label>
            <div className={`border ${
              errors.content ? "border-red-500" : "border-gray-300"
            } rounded-lg`}>
              <Editor
                apiKey="luejpslmzgs69x1v91w4c7pjxh2uhr5aj2a3dzopry8khfb6"
                value={content}
                onEditorChange={(newContent) => {
                  setContent(newContent);
                  setErrors({ ...errors, content: "" });
                }}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic underline strikethrough | \
                    forecolor backcolor | alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help",
                  content_style:
                    "body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; font-size: 16px }",
                }}
              />
            </div>
            {errors.content && (
              <p className="mt-2 text-sm text-red-600">{errors.content}</p>
            )}
          </div>

          {errors.submit && (
            <div className="mb-6">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
            <button
              onClick={() => handleSubmit(false)}
              disabled={loading}
              className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save as Draft"}
            </button>
            <button
              onClick={() => handleSubmit(true)}
              disabled={loading}
              className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;  
import { useEffect, useState } from "react";
import { Heart, MessageCircle, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


// const allMyBlogs = [
//     {
//       _id:"1",
//       isPublished:true,
//       image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROvJuFdhlFQ4Zxu6pov9RMus7mKLwjH5Tugw&s",
//       title: "xyz company is broken",
//       content:
//         "Making an online banner with Canva is easy. Whether you’re wanting to dress up your Facebook, X (formerly Twitter), YouTube or LinkedIn profile...",
//       author: {
//         username: "john Doe",
//         image:
//           "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
//       },
//       likes: "100",
//       comments: [
//         {
//           username: "john",
//           content: "hello bhai mere kya hal",
//           profileImg:
//             "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
//         },
//         {
//           username: "ramsh sharma",
//           content: "hello bhai mere kya hal",
//           profileImg:
//             "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
//         },
//       ],
//     },
//     {
//       _id:"2",
//       isPublished:false,
//       image:
//         "https://intihug.com/wp-content/uploads/2014/12/img_banner-thin_mountains.jpg",
//       title: "xyz company is broken",
//       content:
//         "Making an online banner with Canva is easy. Whether you’re wanting to dress up your Facebook, X (formerly Twitter), YouTube or LinkedIn profile...",
//       author: {
//         username: "john Doe",
//         image:
//           "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
//       },
//       likes: "100",
//       comments: [
//         {
//           username: "john",
//           content: "hello bhai mere kya hal",
//           profileImg:
//             "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
//         },
//         {
//           username: "ramsh sharma",
//           content: "hello bhai mere kya hal",
//           profileImg:
//             "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
//         },
//       ],
//     },
//   ];

const MyBlogs = () => {
  const [showPublished, setShowPublished] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [confirmPublish, setConfirmPublish] = useState(null);
  const [allMyBlogs, setAllMyBlogs] = useState([]);
  const navigate = useNavigate();
  const apiurl = import.meta.env.VITE_API_URL;


  useEffect(()=>{
    getAllBlogs();
  },[])

  const getAllBlogs = async () => {
    const response = await axios.get(
      `${apiurl}/blog/userallblogs`,
      { withCredentials: true }
    );
    if (response?.data.success) {
      console.log(response);
      setBlogs(Array.isArray(response.data.data) ? response.data.data : []);
    }
  }

  const handlePublish = (blog) => {
    setConfirmPublish(blog);
  };

  const confirmPublishBlog = async (blog) => {
    console.log(blog);
    
    const response = await axios.patch(
      `${apiurl}/blog/publish-post/${blog._id}`,
      {},
      { withCredentials: true }
    );
    if (response?.data.success) {
      console.log(response);
      setBlogs(Array.isArray(response.data.data) ? response.data.data : []);
      getAllBlogs();
    }
    // setBlogs((prevBlogs) =>
    //   prevBlogs.map((b) =>
    //     b.title === confirmPublish.title ? { ...b, isPublished: true } : b
    //   )
    // );
    setConfirmPublish(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                My Blog Posts
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and track your blog posts
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button
                onClick={() => navigate("/create-blog")}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                + New Blog Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="w-full sm:w-auto">
              <div className="bg-gray-100 p-1 rounded-lg inline-flex">
                <button
                  onClick={() => setShowPublished(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    !showPublished
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Drafts ({blogs.filter((blog) => !blog.isPublished).length})
                </button>
                <button
                  onClick={() => setShowPublished(true)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    showPublished
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Published ({blogs.filter((blog) => blog.isPublished).length})
                </button>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="text-sm text-gray-500">
                Showing{" "}
                {
                  blogs.filter((blog) => blog.isPublished === showPublished)
                    .length
                }{" "}
                posts
              </span>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs
            .filter((blog) => blog.isPublished === showPublished)
            .map((blog, index) => (
              <BlogCard key={index} blog={blog} onPublish={handlePublish} />
            ))}
        </div>
      </div>

      {/* Publish Confirmation Modal */}
      {confirmPublish && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full mx-4 transform transition-all">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Publish Blog Post
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to publish "{confirmPublish.title}"? This
              will make it visible to all readers.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmPublish(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmPublishBlog(confirmPublish)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Publish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const BlogCard = ({ blog, onPublish }) => {
  const [likes, setLikes] = useState(parseInt(blog.likes));
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <div className="flex space-x-2">
              <button className="p-2 text-white bg-blue-600/90 rounded-lg hover:bg-blue-700 transition-colors">
                <Edit size={16} />
              </button>
              <button className="p-2 text-white bg-red-600/90 rounded-lg hover:bg-red-700 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
            <button onClick={() => navigate(`/blog/${blog._id}`, { state: { blog } })} className="p-2 text-white bg-gray-800/90 rounded-lg hover:bg-gray-900 transition-colors">
              <Eye size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {blog.title}
        </h2>
        {/* <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {blog.content}
        </p> */}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-4">
            <button
              className="flex items-center space-x-1.5 text-gray-500 hover:text-red-500 transition-colors"
              onClick={() => setLikes(likes + 1)}
            >
              <Heart
                size={18}
                className={
                  likes > parseInt(blog.likes)
                    ? "fill-red-500 text-red-500"
                    : ""
                }
              />
              <span className="text-sm font-medium">{likes}</span>
            </button>
            <button className="flex items-center space-x-1.5 text-gray-500 hover:text-blue-500 transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm font-medium">
                {blog.comments.length}
              </span>
            </button>
          </div>

          {!blog.isPublished && (
            <button
              onClick={() => onPublish(blog)}
              className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBlogs;

import { useState } from "react";
import { Heart, MessageCircle, PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const allBlogs = [
    {
      _id:"1",
      bannerImg:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROvJuFdhlFQ4Zxu6pov9RMus7mKLwjH5Tugw&s",
      title: "xyz company is broken",
      description:
        "Making an online banner with Canva is easy. Whether you’re wanting to dress up your Facebook, X (formerly Twitter), YouTube or LinkedIn profile...",
      auther: {
        username: "john Doe",
        image:
          "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
      },
      likes: "100",
      comments: [
        {
          username: "john",
          content: "hello bhai mere kya hal",
          profileImg:
            "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        },
        {
          username: "ramsh sharma",
          content: "hello bhai mere kya hal",
          profileImg:
            "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        },
      ],
    },
    {
      _id:"2",
      bannerImg:
        "https://intihug.com/wp-content/uploads/2014/12/img_banner-thin_mountains.jpg",
      title: "xyz company is broken",
      description:
        "Making an online banner with Canva is easy. Whether you’re wanting to dress up your Facebook, X (formerly Twitter), YouTube or LinkedIn profile...",
      auther: {
        username: "john Doe",
        image:
          "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
      },
      likes: "100",
      comments: [
        {
          username: "john",
          content: "hello bhai mere kya hal",
          profileImg:
            "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        },
        {
          username: "ramsh sharma",
          content: "hello bhai mere kya hal",
          profileImg:
            "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
        },
      ],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 relative">
      {/* Create Blog Button */}
      <button
        onClick={() => navigate("/create-blog")}
        title="create blog"
        className="fixed bottom-6 right-6 bg-slate-800 text-white px-2 py-2  rounded-full flex items-center space-x-2 shadow-lg hover:bg-slate-600 transition"
      >
        <PlusCircle size={40} />
      </button>

      <h1 className="text-3xl font-bold text-center mb-6">📜 All Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allBlogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}

const BlogCard = ({ blog, navigate }) => {
  const [likes, setLikes] = useState(parseInt(blog.likes));

  return (
    <div
      className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
      onClick={() => navigate(`/blog/${blog._id}`, { state: { blog } })}
    >
      <img
        src={blog.bannerImg}
        alt="Blog Banner"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{blog.title}</h2>
        <div className="flex gap-2 mt-2">
          <img
            src={blog.auther.image}
            className="h-10 w-10 rounded-full"
            alt="profile img"
          />
          <span className="text-gray-600 text-sm mt-2">
            {blog.auther.username}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            className="flex items-center space-x-2 text-red-500 hover:text-red-600"
            onClick={(e) => {
              e.stopPropagation();
              setLikes(likes + 1);
            }}
          >
            <Heart size={20} />
            <span className="font-medium">{likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-blue-500 hover:text-blue-600">
            <MessageCircle size={20} />
            <span className="font-medium">{blog.comments.length}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
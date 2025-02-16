import { useState } from "react";
import { Heart, MessageCircle } from "lucide-react";

const allBlogs = [
  {
    bannerImg:
      "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    title: "xyz company is broken",
    description:
      "Making an online banner with Canva is easy. Whether you’re wanting to dress up your Facebook, X (formerly Twitter), YouTube or LinkedIn profile...",
    likes: "100",
    ispublished:true,
    comments: [
      {
        username: "john",
        content: "hello bhai mere kya hal",
        profileImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROvJuFdhlFQ4Zxu6pov9RMus7mKLwjH5Tugw&s",
      },
      {
        username: "ramsh sharma",
        content: "hello bhai mere kya hal",
        profileImg:
          "https://intihug.com/wp-content/uploads/2014/12/img_banner-thin_mountains.jpg",
      },
    ],
  },
  {
    bannerImg:
      "https://t4.ftcdn.net/jpg/02/29/75/83/240_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg",
    title: "xyz company is broken",
    ispublished:false,
    description:
      "Making an online banner with Canva is easy. Whether you’re wanting to dress up your Facebook, X (formerly Twitter), YouTube or LinkedIn profile...",
    likes: "100",
    comments: [
      {
        username: "john",
        content: "hello bhai mere kya hal",
        profileImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROvJuFdhlFQ4Zxu6pov9RMus7mKLwjH5Tugw&s",
      },
      {
        username: "ramsh sharma",
        content: "hello bhai mere kya hal",
        profileImg:
          "https://intihug.com/wp-content/uploads/2014/12/img_banner-thin_mountains.jpg",
      },
    ],
  },
];

const AllBlogsPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">All Blogs</h1>
      {allBlogs.map((blog, index) => (
        <BlogCard key={index} blog={blog} />
      ))}
    </div>
  );
};

const BlogCard = ({ blog }) => {
  const [likes, setLikes] = useState(parseInt(blog.likes));

  return (
    <div className="border rounded-xl p-4 shadow-md">
      <img
        src={blog.bannerImg}
        alt="Banner"
        className="w-full h-48 object-cover rounded-lg"
      />
      <h2 className="text-xl font-bold mt-3">{blog.title}</h2>
      <div className="flex items-center justify-between mt-2">
        <button
          className="flex items-center space-x-2 text-red-500"
          onClick={() => setLikes(likes + 1)}
        >
          <Heart size={20} />
          <span>{likes}</span>
        </button>
        <button className="flex items-center space-x-2 text-blue-500">
          <MessageCircle size={20} />
          <span>{blog.comments.length}</span>
        </button>
      </div>
    </div>
  );
};

export default AllBlogsPage;

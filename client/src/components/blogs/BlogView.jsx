import { useLocation, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";

const BlogView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blog = location.state?.blog;

  const [comments, setComments] = useState(blog?.comments || []);
  const [newComment, setNewComment] = useState("");

  if (!blog) {
    return <div className="text-center mt-20">Blog not found.</div>;
  }

  // Function to handle adding a new comment
  const addComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj = {
      username: "Guest User", // Temporary username
      content: newComment,
      profileImg:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y", // Default avatar
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 underline mb-4"
      >
        ← Back to Blogs
      </button>

      <img
        src={blog.bannerImg}
        alt="Blog Banner"
        className="w-full h-64 object-cover rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-4">{blog.title}</h1>

      <div className="flex items-center gap-3 mt-3">
        <img
          src={blog.auther.image}
          className="h-10 w-10 rounded-full"
          alt="Author"
        />
        <span className="text-gray-700">{blog.auther.username}</span>
      </div>

      <p className="text-gray-600 mt-4">{blog.description}</p>

      <div className="flex items-center space-x-2 text-red-500 hover:text-red-600 mt-4">
        <Heart size={20} />
        <span className="font-medium">{blog.likes} Likes</span>
      </div>

      {/* Comments Section */}
      <h2 className="text-xl font-semibold mt-6">Comments</h2>
      <div className="mt-4 space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex gap-3 bg-gray-100 p-3 rounded-lg">
            <img
              src={comment.profileImg}
              className="h-8 w-8 rounded-full"
              alt="User"
            />
            <div>
              <p className="font-medium">{comment.username}</p>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Section */}
      <div className="mt-6 p-4 border rounded-lg bg-white shadow">
        <h3 className="text-lg font-semibold mb-2">Add a Comment</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Write your comment..."
            className="flex-1 p-2 border rounded-lg"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={addComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogView;

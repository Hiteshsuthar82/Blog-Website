import React, { useState } from "react";

const CommentPage = () => {
  const [comment, setComment] = useState("");

  const sendComment = () => {
    if (comment.trim() !== "") {
      alert("Comment sent: " + comment);
      setComment("");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen px-6 bg-gray-200 py-5">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg mx-4 flex flex-col  h-full">
          {/* User Profile */}
          <div className="header font-bold text-[38px] ">Comments</div>
          <div className="flex items-center mb-4 bg-gray-300 rounded p-4 mt-4 ">
            <img
              src="images.png"
              alt="User Profile"
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="font-semibold text-lg">John Doe</span>
          </div>

          <div className="flex items-center mb-4 bg-gray-300 rounded p-4  ">
            <img
              src="images.png"
              alt="User Profile"
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="font-semibold text-lg">John Doe</span>
          </div>
          <div className="flex items-center mb-4 bg-gray-300 rounded p-4  ">
            <img
              src="images.png"
              alt="User Profile"
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="font-semibold text-lg">John Doe</span>
          </div>
          <div className="flex items-center mb-4 bg-gray-300 rounded p-4  ">
            <img
              src="images.png"
              alt="User Profile"
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="font-semibold text-lg">John Doe</span>
          </div>
          <div className="flex items-center mb-4 bg-gray-300 rounded p-4  ">
            <img
              src="images.png"
              alt="User Profile"
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="font-semibold text-lg">John Doe</span>
          </div>
          <div className="flex items-center mb-4 bg-gray-300 rounded p-4  ">
            <img
              src="images.png"
              alt="User Profile"
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="font-semibold text-lg">John Doe</span>
          </div>
          <div className="flex items-center mb-4 bg-gray-300 rounded p-4  ">
            <img
              src="images.png"
              alt="User Profile"
              className="w-8 h-8 rounded-full mr-3"
            />
            <span className="font-semibold text-lg">John Doe</span>
          </div>

          {/* Comment Input */}
          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-white  p-[13px] flex items-center border border-gray-300 w-full max-w-md">
            <input
              type="text"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              onClick={sendComment}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentPage;

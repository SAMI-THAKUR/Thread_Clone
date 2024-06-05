import React, { useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const CreatePost = () => {
  const toast = useToast();
  const [body, setBody] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  // Function to handle changes in the description textarea
  const handleDescriptionChange = (e) => {
    setBody(e.target.value);
  };
  // Function to handle changes in the image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const createPost = async () => {
    try {
      const res = await axios.post(
        "https://thread-clone-6f8g.onrender.com/post/create",
        { body, image: imagePreview },
        {
          withCredentials: true,
        },
      );
      const data = res.data;
      if (data.error) {
        toast("Error", data.error, "error");
      } else {
        toast("Success", "Post created successfully", "success");
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  };
  // Function to handle posting the new post
  const handlePost = () => {
    // Reset the input fields after posting
    setBody("");
    setImagePreview(null);
  };

  // Character count for description
  const charCount = body.length;
  const maxChar = 300;
  const remainingChar = maxChar - charCount;

  return (
    <div className="h-[100vh] w-full mb-40">
      <div className="heading text-center font-bold text-2xl m-5 text-head dark:text-darkhead">New Post</div>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <textarea
          className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none font-mono"
          spellCheck="false"
          placeholder="Describe everything about this post here"
          value={body}
          onChange={handleDescriptionChange}
        ></textarea>

        {/* Image input */}
        <div className="image-input my-5 flex justify-between">
          <label htmlFor="imageInput" className="cursor-pointer">
            <Icon icon="eva:attach-fill" className="text-head dark:text-darkhead text-2xl" />
          </label>
          <input id="imageInput" type="file" style={{ display: "none" }} onChange={handleImageChange} />
          {/* Character count */}
          <div className="count ml-auto text-gray-400 text-base font-semibold font-mono">
            {remainingChar}/{maxChar}
          </div>
        </div>

        {imagePreview && (
          <div className="image-preview mt-2">
            <img src={imagePreview} alt="Preview" className="max-w-full h-[300px]" />
          </div>
        )}
        {/* Post button */}
        <div
          className="btn mt-5 w-fit border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500"
          onClick={() => {
            createPost();
            handlePost();
          }}
        >
          Post
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

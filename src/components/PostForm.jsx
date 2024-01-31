import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostForm = ({ post }) => {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "erase this",
      slug: post?.$id || "erase-this",
      content: post?.content || "Erase this",
      status: post?.status || "active",
    },
  });
  return <div>PostForm</div>;
};

export default PostForm;

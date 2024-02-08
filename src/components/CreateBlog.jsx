import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, RTE, Select } from "../components/index";
import { Button } from "./ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateBlog = ({ post }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      image: post?.image || "",
    },
  });

  const storage = getStorage();

  const submit = async (data) => {
    setIsSubmitted(true);
    if (data.image && data.image[0]) {
      const storageRef = ref(storage, data.image[0].name);
      const uploadTask = uploadBytesResumable(storageRef, data.image[0]);

      uploadTask.on(
        "state_changed",
        // ...
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              // console.log("File available at", downloadURL);

              const id = `${Date.now()}`;
              const _doc = {
                id: id,
                user: user.uid,
                title: data.title,
                slug: data.slug,
                content: data.content,
                image: downloadURL,
              };

              setDoc(doc(db, "Blogs", id), _doc)
                .then((res) => {
                  // console.log(res);
                  reset();
                })
                .catch((error) => {
                  // console.log(error);
                });
            })
            .catch((error) => {
              // console.log("Error getting download URL:", error);
            });

          toast("Blog has been submitted successfully!", {
            description: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
          });
        }
      );
    } else {
      const id = `${Date.now()}`;
      const _doc = {
        id: id,
        user: user.uid,
        title: data.title,
        slug: data.slug,
        content: data.content,
      };

      setDoc(doc(db, "Blogs", id), _doc)
        .then((res) => {
          // console.log(res);
          reset();
        })
        .catch((error) => {
          // console.log(error);
        });

      toast("Blog has been submitted successfully!", {
        description: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
      });
    }

    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap w-full px-3 pt-5 pb-10">
      <Toaster />
      <div className="w-full px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className={`mb-4 ${errors.title ? "border-red-500" : ""}`}
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className={`mb-4 ${errors.slug ? "border-red-500" : ""}`}
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4 md:w-1/2"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />
        {post && (
          <div className="w-full mb-4">
            <img alt={post.title} className="rounded-lg" />
          </div>
        )}
        <div className="shadow-md">
          <RTE
            label="Content :"
            name="content"
            className={`mb-4 ${errors.content ? "border-red-500" : ""}`}
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <Button type="submit" disabled={isSubmitted} className="w-full py-5 mt-8">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default CreateBlog;

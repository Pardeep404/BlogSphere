import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    setLoading(true);
    setError(null);

    try {
      const file = data.image?.[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (post) {
        if (file) appwriteService.deleteFile(post.featuredImage);

        const updatedPost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (updatedPost) navigate(`/post/${updatedPost.$id}`);
      } else {
        if (file) {
          data.featuredImage = file.$id;
          const newPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (newPost) navigate(`/post/${newPost.$id}`);
        }
      }
    } catch (err) {
      setError("Failed to create or update the post. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s+/g, "-");
    }
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
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col md:flex-row gap-6"
    >
      {/* Left Section - Title, Slug, Content */}
      <div className="md:w-2/3 w-full">
        <Input
          label="Title :"
          placeholder="Enter post title"
          className="mb-4 w-full px-4 py-2 rounded-md bg-zinc-700 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-zinc-700"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Auto-generated from title"
          className="mb-4 w-full px-4 py-2 rounded-md bg-zinc-700 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-zinc-700"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Section - Image, Status, Button */}
      <div className="md:w-1/3 w-full flex flex-col gap-4">
        <Input
          label="Featured Image :"
          type="file"
          className="w-full px-4 py-2 rounded-md bg-zinc-700 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-zinc-700"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full rounded-xl overflow-hidden border border-zinc-300 shadow">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white placeholder:text-white/50 focus:outline border-2 focus:ring-2 focus:ring-primary focus:bg-zinc-800"
          {...register("status", { required: true })}
        />

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <Button
          type="submit"
          bgColor={
            "text-white bg-black hover:text-black hover:bg-white hover:border-black"
          }
          className="w-full text-white"
          disabled={loading}
        >
          {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </Button>
      </div>
    </form>
  );
}

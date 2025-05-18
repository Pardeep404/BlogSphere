import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10">
      <Container>
        {/* Post Header */}
        <div className="w-full mb-6 rounded-2xl border border-zinc-200 shadow-md overflow-hidden">
          {post.featuredImage ? (
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full  object-cover"
            />
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center bg-zinc-100 text-zinc-500 text-xl font-semibold">
              No Image Available
            </div>
          )}
        </div>

        {/* Buttons (if author) */}
        {isAuthor && (
          <div className="flex justify-center gap-4 mb-8">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-600 hover:bg-green-700">Edit</Button>
            </Link>
            <Button bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold text-zinc-900 mb-4 text-center">
          {post.title}
        </h1>

        {/* Divider */}
        <div className="w-20 h-1 bg-yellow-500 mx-auto rounded-full mb-10" />

        {/* Content */}
        <div className="prose prose-lg max-w-4xl mx-auto text-zinc-100">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
}

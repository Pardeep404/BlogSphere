import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts && Array.isArray(posts.documents)) {
          setPosts(posts.documents);
        } else {
          setPosts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setPosts([]);
      });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-16 text-center">
        <Container>
          <div className="max-w-xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-4">
              No Posts Available
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Please login to read posts and explore more content.
            </p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-10 transition-colors duration-500">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {posts.map((post, index) => (
            <motion.div
              key={post.$id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="w-full max-w-sm bg-white dark:bg-zinc-800 border border-zinc-900 rounded-2xl overflow-hidden hover:shadow-lg transition duration-300"
            >
               <img
                src={post.image || "https://via.placeholder.com/400x200"}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              {/* <img
                src="https://fra.cloud.appwrite.io/v1/storage/buckets/67e8a7dd0024dae2cf4b/files/68071374e51979a6ace8/view?project=67e8a364000f0a7a2947&mode=admin"
                alt="Featured"
                className="w-full h-auto"
              /> */}

              <div className="p-4">
                <time
                  dateTime={post.date || new Date().toISOString()}
                  className="text-xs uppercase text-gray-400 font-semibold"
                >
                  {new Date(post.$createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <h2 className="my-1 text-2xl font-bold leading-relaxed text-gray-800 dark:text-white">
                  {post.title}
                </h2>
                <div
                  className="text-sm my-2 text-gray-600 dark:text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: `${post.content?.slice(0, 100)}...`,
                  }}
                ></div>
                <Link
                  to={`/post/${post.$id}`}
                  className="mt-4 py-2.5 px-6 rounded-full border font-medium text-white bg-black hover:text-black hover:bg-white hover:border-black flex justify-center items-center space-x-2 transition duration-300"
                >
                  <span>Learn more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;

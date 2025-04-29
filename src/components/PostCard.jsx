import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  // Debug logs to verify the props and image URL
  console.log("Post ID:", $id)
  console.log("Featured Image ID:", featuredImage)
  console.log("Image Preview URL:", appwriteService.getFilePreview(featuredImage))

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300">
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-60 object-cover rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogHeader from "./BlogHeader";
import BlogContent from "./BlogContent";
import { Loader2, AlertCircle } from "lucide-react";

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/blogs/api/blogs/${slug}/`);
        setBlog(response.data);
      } catch (err) {
        console.error("Failed to fetch blog details:", err);
        setError("Failed to load blog.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin w-10 h-10" style={{ color: "var(--accent-color)" }} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <AlertCircle className="w-12 h-12 mb-4" style={{ color: "var(--accent-color)" }} />
        <p className="text-lg font-medium" style={{ color: "var(--text-color)" }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      <BlogHeader blog={blog} />
      <BlogContent blog={blog} />
    </div>
  );
};

export default BlogDetail;
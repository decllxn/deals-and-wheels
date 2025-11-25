import { useState, useEffect } from "react";
import axios from "axios";

export default function useLatestBlogs(count = 3) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:8000/blogs/api/latest/?count=${count}`
        );
        setBlogs(data.results || data);
      } catch (err) {
        console.error(err);
        setError("Could not load blog posts at the moment.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [count]);

  return { blogs, loading, error };
}
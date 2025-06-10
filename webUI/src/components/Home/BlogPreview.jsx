import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaEye, FaCommentDots } from 'react-icons/fa';

const BlogPreview = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/blogs/latest/');
        const data = await response.json();
        setBlogs(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="py-20" style={{ backgroundColor: 'var(--bg-color)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl sm:text-4xl font-bold text-center mb-14"
            style={{ color: 'var(--text-color)' }}
          >
            📝 Latest from Our Blog
          </h2>
          <div className="text-center" style={{ color: 'var(--text-color)' }}>
            Loading...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-14"
          style={{ color: 'var(--text-color)' }}
        >
          📝 Latest from Our Blog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="group rounded-xl overflow-hidden border shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.015]"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--surface-color)',
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              <div className="p-6" style={{ color: 'var(--text-color)' }}>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent-color)] transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p
                  className="text-sm italic mb-4 line-clamp-2 flex items-center"
                  style={{ color: 'var(--muted-text)' }}
                >
                  <FaCommentDots className="mr-2" size={16} />
                  &ldquo;{blog.topComment}&rdquo;
                </p>

                <div
                  className="flex justify-between text-sm mt-auto"
                  style={{ color: 'var(--muted-text)' }}
                >
                  <div className="flex items-center">
                    <FaEye className="mr-1" style={{ color: 'var(--highlight-color)' }} />
                    {blog.views.toLocaleString()} Views
                  </div>
                  <div className="flex items-center">
                    <FaHeart className="mr-1" style={{ color: 'var(--accent-color)' }} />
                    {blog.likes.toLocaleString()} Likes
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            to="/blogs"
            className="inline-block py-3 px-6 text-lg font-semibold rounded-lg transition-colors duration-300"
            style={{
              backgroundColor: 'var(--accent-color)',
              color: 'white',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-color)';
            }}
          >
            See More Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
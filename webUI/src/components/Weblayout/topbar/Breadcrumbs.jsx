import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaAngleRight } from "react-icons/fa";

const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getBreadcrumbs = () => {
    const pathSegments = currentPath.split("/").filter(Boolean);

    return pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const name = decodeURIComponent(segment.replace(/-/g, " ")).replace(/\b\w/g, (c) => c.toUpperCase());
      return { name, path };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  if (currentPath === "/") return null;

  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-hidden whitespace-nowrap max-w-[calc(100%-200px)] sm:max-w-[calc(100%-300px)]"
      style={{ color: "var(--muted-text)" }}
    >
      <Link
        to="/"
        className="flex items-center space-x-1 transition-colors duration-200"
        style={{ color: "var(--muted-text)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-color)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-text)")}
      >
        <FaHome className="text-xs sm:text-sm" />
        <span>Home</span>
      </Link>

      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={index}>
          <FaAngleRight className="text-xs" />
          <Link
            to={crumb.path}
            className="capitalize truncate transition-colors duration-200"
            style={{ color: "var(--muted-text)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-color)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted-text)")}
          >
            {crumb.name}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumbs;
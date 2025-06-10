import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { BASE_URL } from '../../constants'; // Assuming you have your base URL defined

const SearchBarWithDropdown = ({ onSearchSubmit }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/auctions/auctions/suggestions/?query=${search}`);
          setSuggestions(response.data);
          setIsDropdownOpen(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
          setIsDropdownOpen(false);
        }
      };

      const debounceTimer = setTimeout(fetchSuggestions, 300); // Debounce for 300ms
      return () => clearTimeout(debounceTimer);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [search]);

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearch(`${suggestion.make} ${suggestion.model}`);
    setIsDropdownOpen(false);
    if (onSearchSubmit) {
      onSearchSubmit(`${suggestion.make} ${suggestion.model}`);
    } else {
      navigate(`/auctions/?search=${suggestion.make} ${suggestion.model}`);
    }
  };

  const handleSearchSubmitLocal = () => {
    setIsDropdownOpen(false);
    if (onSearchSubmit) {
      onSearchSubmit(search);
    } else {
      navigate(`/auctions/?search=${search}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInputRef]);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        <FaSearch className="absolute left-4 text-gray-500" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search for cars..."
          value={search}
          onChange={handleInputChange}
          className="w-full pl-12 pr-16 py-3 border rounded-lg focus:ring-2 focus:outline-none text-lg"
          style={{
            backgroundColor: "var(--surface-color)",
            color: "var(--text-color)",
            borderColor: "var(--border-color)"
          }}
          onFocus={() => search && suggestions.length > 0 && setIsDropdownOpen(true)}
        />
        <button
          onClick={handleSearchSubmitLocal}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-all"
          style={{
            backgroundColor: "var(--accent-color)",
            color: "var(--text-color)",
          }}
        >
          Search
        </button>
      </div>
      {isDropdownOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded-md shadow-lg mt-1 z-10"
          style={{
            backgroundColor: "var(--surface-color)",
            borderColor: "var(--border-color)"
          }}>
          <ul>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  color: "var(--text-color)",
                }}
              >
                {suggestion.image && (
                  <img
                    src={suggestion.image}
                    alt={`${suggestion.make} ${suggestion.model}`}
                    className="w-10 h-10 object-cover rounded mr-2"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/path/to/your/placeholder-image.png' }} // Optional: Placeholder for broken images
                  />
                )}
                <span>{suggestion.make} {suggestion.model}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBarWithDropdown;
import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { useSearch } from "../context/SearchContext"; 
import { useNavigate } from "react-router-dom"; 

const Header = ({ setShowVideo }) => { 
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { setSearchTerm } = useSearch(); 
  const [showSearch, setShowSearch] = React.useState(false);
  const navigate = useNavigate(); 

  const handleSearchToggle = () => {
    setShowSearch((prev) => !prev);
    setShowVideo(!showSearch); // Toggle video based on search state
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
  };

  const handleFocus = () => {
    setShowVideo(false);
  };

  const handleBlur = () => {
    if (!showSearch) {
      setShowVideo(true);
    }
  };

  const handleProfileNavigation = (path) => {
    navigate(path);
    setShowVideo(true);
  };

  return (
    <header className="absolute flex items-center justify-between p-4 z-10 bg-opacity-5 bg-red-900 text-white w-full shadow-md">
      <div className="flex items-center space-x-4">
        <h1 
          className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-red-600 via-slate-300 to-green-600 text-transparent bg-clip-text cursor-pointer"
          onClick={() => navigate('/')}
        >
          BEA
          <span className="text-2xl md:text-3xl lg:text-4xl bg-gradient-to-r from-green-500 via-purple-900 to-pink-200 text-transparent bg-clip-text">
         TT
          </span>
          UBE
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <div className="flex items-center p-1 border rounded-md bg-gray-700 text-sm md:text-base lg:text-lg">
              <FontAwesomeIcon icon={faGlobe} className="mr-2" />
              <select
                className="bg-gray-700 text-sm md:text-base lg:text-lg border-none focus:outline-none"
                aria-label="Language selector"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
              </select>
            </div>
            <button className="bg-red-700 px-4 py-2 rounded-md hover:bg-red-900 transition-colors text-sm md:text-base lg:text-lg">
              Sign In
            </button>
          </>
        ) : (
          <>
            <div className="relative flex items-center">
              <button
                onClick={handleSearchToggle}
                className="text-gray-300 hover:text-gray-100 transition-colors"
                aria-label="Search"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                type="text"
                placeholder="Search..."
                className={`absolute right-5 top-full p-2 border rounded-md bg-gray-800 text-white placeholder-gray-400 
                  focus:outline-none focus:ring-2 transition-all duration-1000 ease-in-out ${
                    showSearch ? "opacity-100 w-32 sm:w-48 md:w-64" : "opacity-0 w-0"
                  }`}
                style={{
                  transition: "width 1s ease-in-out",
                  marginTop: "-30px",
                }}
                onChange={handleSearchChange} 
                onFocus={handleFocus} 
                onBlur={handleBlur} 
              />
            </div>
            <div className="relative group">
              <button
                className="hover:text-gray-100 transition-colors"
                aria-label="User menu"
              >
                <FontAwesomeIcon className="text-black" icon={faUser} />
              </button>
              <div className="absolute right-0 mt-4 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-700" onClick={() => handleProfileNavigation('/manage-profile')}>
                  Manage Profile
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-700" onClick={() => handleProfileNavigation('/account')}>
                  Account
                </button>
                <button className="w-full px-4 py-2 text-left hover:bg-gray-700" onClick={() => handleProfileNavigation('/help-center')}>
                  Help Center
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-700"
                  onClick={logout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

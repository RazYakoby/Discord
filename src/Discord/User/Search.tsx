import { useState } from 'react';
import '../../css/Search.css';

function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSearchModal = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div className="button3">
      {isSearchOpen && (
        <h3 className="search-header">Search for servers, channels, or DMs</h3>
      )}
      <input
        className="searchTerm"
        type="text"
        placeholder="Find or start a conversation"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={toggleSearchModal}
      />
      {isSearchOpen && (
        <div className="model-overlay2" onClick={toggleSearchModal}>
          <div className="model-content2" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Where would you like to go?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="footer2">
              <h5>
                PROPTIP: Start searches with <b>@</b>, <b>#</b>, <b>!</b>, or <b>*</b> to narrow results. Learn more.
              </h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;

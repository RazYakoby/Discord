import { useState } from 'react';
import '../../css/Search.css';
import {Flex, TextInput, Title } from '@mantine/core';

function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSearchModal = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <Flex className="button3">
      {isSearchOpen && (
        <Title className="search-header">Search for servers, channels, or DMs</Title>
      )}
      <TextInput
        type="text"
        placeholder="Find or start a conversation"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={toggleSearchModal}
        styles={{
          input: {
              backgroundColor: '#202225',
              color: "white",
              position: "absolute",
              top: "-5px",
              right: "-225px",
              width: "220px"
          },
          label: {
              fontFamily: "sans-serif", 
              position: "relative",
              top: "-2%"
          }
      }}
      />
      {isSearchOpen && (
        <Flex className="model-overlay2" onClick={toggleSearchModal}>
          <Flex className="model-content2" onClick={(e) => e.stopPropagation()}>
            <TextInput
              type="text"
              placeholder="Where would you like to go?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              styles={{
                input: {
                  backgroundColor: '#202225',
                  color: "white",
                  width: "208%",
                  position: "relative",
                  top: "5px",
              }
          }}
            />
            <Flex className="footer2">
              <h5>
                PROPTIP: Start searches with <b>@</b>, <b>#</b>, <b>!</b>, or <b>*</b> to narrow results. Learn more.
              </h5>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Search;

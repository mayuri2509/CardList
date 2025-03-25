// import React, { useState, useCallback } from 'react';

// function debounce(func, delay) {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }

// const SearchComponent = () => {
//   const [query, setQuery] = useState('');

//   const handleSearch = (searchQuery) => {
//     console.log('Searching for:', searchQuery);
//   };

//   const debouncedSearch = useCallback(debounce(handleSearch, 5000), []);

//   const handleChange = (event) => {
//     setQuery(event.target.value);
//     debouncedSearch(event.target.value);
//   };

//   return (
//     <div>
//       <input 
//         type="text" 
//         value={query} 
//         onChange={handleChange} 
//         placeholder="Search..." 
//       />
//     </div>
//   );
// };

// export default SearchComponent;
// import SearchComponent from './Compoents/FirstPage';
// <SearchComponent/>
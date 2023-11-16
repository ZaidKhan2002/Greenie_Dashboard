import React, { useState, useEffect, useRef } from 'react';
import data from '../data/users'; 

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const popupRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setUsers(data); 
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        handleClosePopup();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); 
  };


  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };


  return (
    <div>
  <form>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div class="relative md:w-[100%] mb-10 mt-4 md:ml-96">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input 
        type="search" 
        id="default-search" 
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
        placeholder="Search With Username" 
        required 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      <button 
        type="submit" 
        class="text-white absolute end-2.5 bottom-2.5 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2"
      >
        Search
      </button>
    </div>
  </form>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg md:w-[180%] md:ml-10">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-lg text-gray-100 uppercase bg-green-500">
        <tr>
          <th scope="col" class="px-6 py-3">
            Username
          </th>
          <th scope="col" class="px-6 py-3">
            Email
          </th>
          <th scope="col" class="px-6 py-3">
            Phone
          </th>
          <th scope="col" class="px-6 py-3">
            Creation Date
          </th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user) => (
          <tr key={user.id} class="bg-white border-b text-lg hover:bg-green-100 cursor-pointer" onClick={() => handleUserClick(user)}>
            <td class="px-6 py-4">{user.username}</td>
            <td class="px-6 py-4">{user.email}</td>
            <td class="px-6 py-4">{user.phone}</td>
            <td class="px-6 py-4">{user.creationDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div ref={popupRef} className="bg-white w-1/2 h-1/2 p-8 rounded-lg text-center">
          <div class="mx-auto relative w-24 h-24 overflow-hidden bg-gray-100 rounded-full border-2 border-green-500 mb-8">
            <svg class="absolute w-12 h-12 text-gray-400 left-5 mt-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
          </div>
            <h2 className="text-4xl font-bold mb-4">User Details</h2>
            <p className='text-xl mb-2'>Username: {selectedUser.username}</p>
            <p className='text-xl mb-2'>Email: {selectedUser.email}</p>
            <p className='text-xl mb-2'>Phone: {selectedUser.phone}</p>
            <p className='text-xl mb-2'>Creation Date: {selectedUser.creationDate}</p>
            <button
              className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-green-300"
              onClick={handleClosePopup}
            >
              Generate Report
            </button>
            <button
              className="mt-4 ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-green-300"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
   <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-lg m-8">
          <li>
          <button
  onClick={() => paginate(currentPage - 1)}
  disabled={currentPage === 1}
  className='bg-gray-100 p-4'
>
  Previous
</button>
          </li>
          {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map(
  (number, index) => (
    <li key={index}>
      <button
        className={`bg-gray-100 p-4 ${
          currentPage === index + 1 ? 'bg-green-500 text-white' : ''
        }`}
        onClick={() => paginate(index + 1)}
      >
        {index + 1}
      </button>
    </li>
  )
)}
          <li>
          <button
  onClick={() => paginate(currentPage + 1)}
  disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
  className='bg-gray-100 p-4'
>
  Next
</button>
          </li>
        </ul>
      </nav>

</div>

  );
};

export default UserDetails;

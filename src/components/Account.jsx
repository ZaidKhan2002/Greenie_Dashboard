import React, { useState } from 'react'

const Account = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
      });
    
      const { username, password, confirmPassword } = formData;
      const [showToast, setShowToast] = useState(false);
      const [passwordError, setPasswordError] = useState('');
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
          }
      
          if (formData.password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return;
          }

        console.log('Form submitted:', formData);
        setShowToast(true);

        setFormData({
            username: '',
            password: '',
            confirmPassword: '',
          });

          setTimeout(() => {
            setShowToast(false);
          }, 3000);
      };

  return (
    <div className="flex justify-center items-center h-screen w-screen lg:pr-96">
        {showToast && (
            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 p-4 mt-8 text-gray-500 bg-white rounded-lg shadow z-50">
                <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                    <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="sr-only">Check icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">Form Submitted successfully.</div>
            </div>
        )}
      <form onSubmit={handleSubmit} className="w-full lg:h-1/2  max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-green-500">
            <h2 className="text-4xl font-bold mb-6 text-center">Register</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="confirmPassword">
                    Confirm Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                />
            </div>
            {passwordError && (
            <p className="text-red-500 text-sm mb-4">{passwordError}</p>
            )}
            <div className="flex items-center justify-center">
                <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Register
                </button>
            </div>
      </form>
    </div>
  )
}

export default Account
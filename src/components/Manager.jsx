import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [isAvailable, setIsAvailable] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPassword = async () => {
    try {
      const req = await fetch("http://localhost:3000/passwords");
      const passwords = await req.json();
      setPasswordArray(passwords);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPassword();
  }, []);

  const toggleEye = () => {
    setIsAvailable(!isAvailable);
    if (passwordRef.current) {
      passwordRef.current.type = isAvailable ? 'password' : 'text';
    }
  };

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const newPassword = { ...form, id: uuidv4() };

      setPasswordArray(prevArray => [...prevArray, newPassword]);
      await fetch("http://localhost:3000/passwords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword)
      });

      setForm({ site: "", username: "", password: "" });
      toast.success("Password saved!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error("Error: Password not saved. All fields must be longer than 3 characters.");
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(p => p.id === id);
    setForm(passwordToEdit);
    setPasswordArray(passwordArray.filter(p => p.id !== id));
  };

  const deletePassword = async (id) => {
    const confirmed = window.confirm("Do you want to delete your password?");
    if (confirmed) {
      await fetch(`http://localhost:3000/passwords/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      setPasswordArray(passwordArray.filter(password => password.id !== id));
      toast.success("Password deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className="bg-gray-100 min-h-screen flex items-center justify-center py-6">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center text-green-600">Password Manager</h1>
          <p className="text-center mb-4 text-gray-700">Your own password manager</p>
          <div className="space-y-4">
            <input
              onChange={handleChange}
              value={form.site}
              placeholder='Enter website URL'
              className='block w-full border border-green-400 rounded-full py-2 px-4'
              type="text"
              name="site"
              id="site"
            />
            <input
              onChange={handleChange}
              value={form.username}
              placeholder='Enter username'
              className='block w-full border border-green-400 rounded-full py-2 px-4'
              type="text"
              name="username"
              id="username"
            />
            <div className='relative'>
              <input
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                placeholder='Enter password'
                className='block w-full border border-green-400 rounded-full py-2 px-4'
                type="password"
                name="password"
                id="password"
              />
              <span
                ref={ref}
                className='absolute inset-y-0 right-4 flex items-center cursor-pointer'
                onClick={toggleEye}
              >
                <img
                  width={24}
                  src={isAvailable ? 'eye.png' : 'eye-crossed.png'}
                  alt={isAvailable ? 'Show' : 'Hide'}
                />
              </span>
            </div>
            <button
              onClick={savePassword}
              className='w-full bg-green-500 text-white rounded-full py-2 hover:bg-green-400 transition-colors'
            >
              Save
            </button>
          </div>

          <h2 className="text-xl font-bold mt-8 text-center text-green-600">Your passwords</h2>
          {passwordArray.length === 0 && <div className="text-center text-gray-700 mt-4">No Passwords to show</div>}
          {passwordArray.length > 0 && (
            <div className="overflow-auto mt-4">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className='w-full bg-green-800 text-white'>
                    <th className='py-2 px-4'>Site</th>
                    <th className='py-2 px-4'>Username</th>
                    <th className='py-2 px-4'>Password</th>
                    <th className='py-2 px-4'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-green-100'>
                  {passwordArray.map((item) => (
                    <tr key={item.id} className="text-center">
                      <td className='py-2 px-4'>
                        <div className='flex items-center justify-center'>
                          <a href={item.site} target='_blank' rel="noopener noreferrer" className='text-blue-500 hover:underline'>
                            {item.site}
                          </a>
                          <div onClick={() => copyText(item.site)} className='cursor-pointer ml-2'>
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/vzolctzz.json"
                              trigger="hover"
                            />
                          </div>
                        </div>
                      </td>
                      <td className='py-2 px-4'>
                        <div className='flex items-center justify-center'>
                          <span>{item.username}</span>
                          <div onClick={() => copyText(item.username)} className='cursor-pointer ml-2'>
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/vzolctzz.json"
                              trigger="hover"
                            />
                          </div>
                        </div>
                      </td>
                      <td className='py-2 px-4'>
                        <div className='flex items-center justify-center'>
                          <span className='truncate max-w-xs'>{item.password}</span>
                          <div onClick={() => copyText(item.password)} className='cursor-pointer ml-2'>
                            <lord-icon
                              style={{ width: "25px", height: "25px" }}
                              src="https://cdn.lordicon.com/vzolctzz.json"
                              trigger="hover"
                            />
                          </div>
                        </div>
                      </td>
                      <td className='py-2 px-4 flex items-center justify-center'>
                        <span onClick={() => editPassword(item.id)} className='cursor-pointer mx-1'>
                          <lord-icon
                            src="https://cdn.lordicon.com/xljvqlng.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          />
                        </span>
                        <span onClick={() => deletePassword(item.id)} className='cursor-pointer mx-1'>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

'use client'

import {useState } from "react"
import { toast } from "react-hot-toast";


const Form = () => {
    
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')


  const Submit=async(e)=>{

    e.preventDefault()
    try {
      const response = await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username:email, password:password }),
      });
      const data = await response.json();
      if (response.ok) {
    
        toast.success('Success Login in')
        // Redirect or do something else upon successful login
      } else {
        toast.error('Failed'); // Invalid username or password
      }
    } catch (error) {
      console.error('Error:', error);
      
    }
    
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  return (
    <form className="p-10" >
        <div className="flex-col items-center">
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 mb-3 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your username" required onChange={handleEmailChange}/>
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your password" required onChange={handlePasswordChange}/>
        </div>
        <button className="bg-black hover:bg-gray-900 mt-7 h-10 text-white font-bold rounded-full w-full  mx-auto" onClick={Submit}>Register</button>
        </div>
    </form>
  )
}

export default Form
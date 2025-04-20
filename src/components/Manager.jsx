import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const show = useRef();
  const inputPass = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = () => {
    inputPass.current.type = "password";
    if (show.current.className.includes("bx bxs-show")) {
      show.current.className = "bx bxs-hide";
      inputPass.current.type = "password";
    } else {
      show.current.className = "bx bxs-show";
      inputPass.current.type = "text";
    }
  };

  const saveData = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ){
    toast("Password saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setPasswordArray([...passwordArray,{...form ,id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray,{...form ,id:uuidv4()}]));
    setForm({ site: "", username: "", password: "" });
    console.log([...passwordArray,{...form ,id:uuidv4()}]);
  }else {
    toast("Please fill in all fields!");
  }
  };
  const deleteData = (id) => {
  
   let isconfirm = confirm('Are you sure ')
   
   if(isconfirm){
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
     setPasswordArray(passwordArray.filter(item => item.id != id));
     localStorage.setItem('passwords' ,JSON.stringify(passwordArray.filter(item => item.id != id)))
   }
   
  };

  const editData=(id)=>{
      console.log('edit data' + id);
      setForm(passwordArray.filter(item =>item.id === id)[0]);
      setPasswordArray(passwordArray.filter(item =>item.id != id))


  }



  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copy to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className=" mycontainer ">
        <h1 className="text-4xl text-center font-bold">
          <span className="text-green-600">&lt;</span>
          Pass
          <span className="text-green-600">OP/&gt;</span>
        </h1>
        <p className="text-center text-lg text-green-900">
          Your Own Password Manager
        </p>
        <div className=" flex items-center flex-col p-4 gap-8 text-black ">
          <input
            className=" rounded-full border border-green-700 p-4 py-1  w-full"
            type="text"
            name="site"
            id=""
            value={form.site}
            placeholder="Enter Website Url"
            onChange={handlechange}
          />
          <div className="flex  justify-between gap-8 w-full">
            <input
              className=" rounded-full border border-green-700 p-4 py-1  w-full  "
              type="text"
              name="username"
              id=""
              value={form.username}
              placeholder="Enter Username"
              onChange={handlechange}
            />
            <div className="relative flex items-center">
              <input
                ref={inputPass}
                value={form.password}
                className=" rounded-full border border-green-700 px-4 py-1  w-full "
                type="text"
                name="password"
                id=""
                placeholder="Enter Password"
                onChange={handlechange}
              />
              <span className="absolute right-2" onClick={showPassword}>
                <span className="material-symbols-outlined text-2xl">
                  <i className="bx bxs-show " ref={show}></i>
                </span>
              </span>
            </div>
          </div>
          <button
            className="bg-green-400 w-fit flex items-center justify-center p-2  rounded-full hover:bg-green-500 transition-all gap-2 px-6 border border-green-900"
            onClick={saveData}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4"> Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to Display</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto  w-full  rounded-lg overflow-hidden ">
              <thead>
                <tr className="bg-green-800 text-center text-white">
                  <th className="py-2">URL</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 text-center">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white  ">
                        <div className="flex justify-center items-center gap-2">
                          <a href={item.site} target="_blank">
                       
                            {item.site}
                          </a>
                          <i
                            className="bx bxs-copy cursor-pointer text-xl"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          ></i>
                        </div>
                      </td>

                      <td className="py-2 border border-white ">
                        <div className="flex justify-center items-center gap-2">
                          <span>{item.username}</span>
                          <i
                            className="bx bxs-copy cursor-pointer text-xl"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          ></i>
                        </div>
                      </td>

                      <td className="py-2 border border-white ">
                        <div className="flex justify-center items-center gap-2">
                          <span>{item.password}</span>
                          <i
                            className="bx bxs-copy cursor-pointer text-xl *:"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          ></i>
                        </div>
                      </td>
                      <td className="py-2 border border-white ">
                        <div className="flex justify-center items-center gap-2">
                          <span onClick={()=>{editData(item.id)}}>
                            <i className="bx bxs-edit-alt text-2xl"></i>
                          </span>
                          <span onClick={()=>{deleteData(item.id)}}>
                            <i className="bx bxs-trash text-2xl"></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

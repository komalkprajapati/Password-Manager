import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-slate-800 text-white p-2 font-sans tracking-wide fixed w-full bottom-0  ">
        <div className="flex  flex-col items-center justify-between ">
          <div className="logo font-bold text-2xl">
            <span className="text-green-600">&lt;</span>
            Pass
            <span className="text-green-600">OP/&gt;</span>
          </div>
          <p className=" text-center  max-lg:order-1">
            © CodeWithMe❤️. All rights reserved.
          </p>
          <div></div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

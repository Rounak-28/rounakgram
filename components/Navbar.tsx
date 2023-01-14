import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import Modal from "./Modal";

const Navbar = ({ session }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(!isModalOpen);

  if (!session) {
    return (
      <div className="fixed w-full bg-[#eeebeb] top-0">
        <div className="w-full h-14 flex relative">
          <Link href="/">
            <img src="/ig.png" className="h-14 px-4" alt="" />
          </Link>
          <div className="line w-full bg-[#00000036] h-[1px] absolute bottom-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed w-full bg-[#eeebeb] top-0 z-[50000]">
      <div className="w-full h-14 flex relative">
        <Link href="/">
          <img src="/ig.png" className="h-14 px-4" alt="" />
        </Link>
        <FiPlusSquare
          className="absolute right-20 top-3 text-3xl"
          onClick={openModal}
        />
        {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
        <img
          src={session?.user?.image}
          className="w-9 h-9 rounded-full absolute right-4 top-2"
          onClick={()=> signOut()}
        />
        <div className="line w-full bg-[#00000036] h-[1px] absolute bottom-0"></div>
      </div>
    </div>
  );
};

export default Navbar;

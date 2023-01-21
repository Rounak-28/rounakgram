import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiPlusSquare } from "react-icons/fi";
import { dummyProfile } from "../jotai/atom";
import Modal from "./Modal";
import SignoutModal from "./SignoutModal";
import ThemeChanger from "./ThemeChanger";

const Navbar = ({ session }: any) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isSignputModalOpen, setIsSignoutModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsSignoutModalOpen(false);
  };

  const openSignoutModal = () => {
    setIsSignoutModalOpen(!isSignputModalOpen);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (!session) {
    return (
      <div className="fixed w-full bg-[#fafafa] dark:bg-[#0f172a] top-0 z-[50000]">
        <div className="w-full h-14 flex relative">
          <Link href="/">
            {theme == "dark" ? (
              <img src="/ig-white.png" className="h-14 px-4" alt="" />
            ) : (
              <img src="/ig.png" className="h-14 px-4" alt="" />
            )}
          </Link>
          <div className="absolute right-8 top-[14px] ">
            <ThemeChanger />
          </div>
          <div className="line w-full bg-[#00000036] h-[1px] absolute bottom-0"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed w-full bg-[#fafafa] dark:bg-[#0f172a] top-0 z-[50000]">
      <div className="w-full h-14 flex relative">
        <Link href="/">
          {theme == "light" ? (
            <img src="/ig.png" className="h-14 px-4" alt="" />
          ) : (
            <img src="/ig-white.png" className="h-14 px-4" alt="" />
          )}
        </Link>
        <div className="absolute right-36 top-[14px]">
          <ThemeChanger />
        </div>
        <FiPlusSquare
          className="absolute right-20 top-3 text-3xl"
          onClick={openModal}
        />
        <AnimatePresence>
          {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
        </AnimatePresence>
        <img
          src={session?.user?.image || dummyProfile}
          className="w-9 h-9 rounded-full absolute right-4 top-2"
          onClick={openSignoutModal}
        />
        <AnimatePresence>
          {isSignputModalOpen && (
            <SignoutModal setIsSignoutModalOpen={setIsSignoutModalOpen} />
          )}
        </AnimatePresence>
        <div className="line w-full bg-[#00000036] h-[1px] absolute bottom-0"></div>
      </div>
    </div>
  );
};

export default Navbar;

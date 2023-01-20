import { useAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { postFile } from "../jotai/atom";
import { motion } from "framer-motion"

const Modal = ({ setIsModalOpen }: any) => {
  const [selectedFile, setSelectedFile] = useAtom(postFile)
  // const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [isPostBtnEnabled, setIsPostBtnEnabled] = useState(false);


  const inputChangeHandler = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
    setIsPostBtnEnabled(true);
  };
  
  const handlePost = () => {};

  return (
    <motion.div animate={{ y: 60 }} className="w-56 h-28 bg-white border-2 border-blue-300 absolute top-0 right-10 shadow-md rounded-lg flex flex-col p-2">
      <input type="file" className="w-full" onChange={inputChangeHandler} />
      {!isFilePicked && (
        <span className="text-red-500 text-[13px] mb-3 mx-2">
          Please select a photo
        </span>
      )}
      <div className="btns flex justify-between w-full absolute bottom-2 left-0 px-2">
        <button
          className="border-2 bg-gray-100 w-20 h-9 rounded hover:bg-gray-200"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </button>
        <Link href="/postPage">
          <button
            className="bg-blue-500 hover:bg-blue-600 w-20 h-9 rounded text-white font-semibold"
            disabled={!isPostBtnEnabled}
            onClick={handlePost}
          >
            Post
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Modal;

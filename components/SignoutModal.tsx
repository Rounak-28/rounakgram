import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

const SignoutModal = ({ setIsSignoutModalOpen }: any) => {
  return (
    <motion.div
      animate={{ y: 60 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0 }}
      className="w-56 h-28 bg-white dark:bg-[#1e293b] border-2 border-blue-300 absolute top-0 right-2 shadow-md rounded-lg flex flex-col px-2 pt-2"
    >
      <button
        className="bg-blue-500 dark:bg-[#114394] dark:hover:bg-[#032f77] text-white py-2 rounded"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
      <button
        className="border-2 mx-auto my-2 bg-gray-100 dark:bg-[#1e293b] w-20 h-9 rounded hover:bg-gray-200  dark:hover:bg-gray-700"
        onClick={() => setIsSignoutModalOpen(false)}
      >
        Cancel
      </button>
    </motion.div>
  );
};

export default SignoutModal;

import { useAtom } from "jotai";
import { dltCommentId, isDeleteCommentModalOpen } from "../jotai/atom";
import { AnimatePresence, motion } from "framer-motion";

const DeleteCommentModal = ({ deleteComment }: any) => {
  const [isDeleteCmntModalOpen, setisDeleteCmntModalOpen] = useAtom(
    isDeleteCommentModalOpen
  );
  const [deleteCommentId, setDeleteCommentId] = useAtom(dltCommentId);

  return (
    <AnimatePresence>
      <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-brightness-50 z-[50000]">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
          exit={{ opacity: 0 }}
          className="w-80 border-2 dark:border-[1px] border-blue-300 dark:border-gray-200 rounded-xl bg-white   dark:bg-[#1e293b] text-xl flex flex-col overflow-hidden"
        >
          <button
            className="text-red-500 hover:bg-gray-300 dark:hover:bg-[#344867] w-full h-12"
            onClick={() => deleteComment(deleteCommentId)}
          >
            Delete
          </button>
          <hr />
          <button
            className="hover:bg-gray-300 dark:hover:bg-[#344867] w-full h-12"
            onClick={() => setisDeleteCmntModalOpen(false)}
          >
            Cancel
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteCommentModal;

import { useAtom } from "jotai";
import { dltCommentId, isDeleteCommentModalOpen } from "../jotai/atom";

const DeleteCommentModal = ({ deleteComment }: any) => {
  const [isDeleteCmntModalOpen, setisDeleteCmntModalOpen] = useAtom(
    isDeleteCommentModalOpen
  );
  const [deleteCommentId, setDeleteCommentId] = useAtom(dltCommentId);

  return (
    <div className="w-screen h-screen fixed top-0 left-0 flex justify-center items-center backdrop-brightness-50 z-[50000]">
      <div className="w-80 border-2 border-blue-300 rounded-xl bg-white text-xl flex flex-col overflow-hidden">
        <button
          className="text-red-500 hover:bg-gray-300 w-full h-12"
          onClick={() => deleteComment(deleteCommentId)}
        >
          Delete
        </button>
        <hr />
        <button
          className="hover:bg-gray-300 w-full h-12"
          onClick={() => setisDeleteCmntModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteCommentModal;

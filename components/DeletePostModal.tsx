import { useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import EditPost from "./EditPost";

const DeletePostModal = ({ deletePost, id, setIsDeleteModalOpen, fetchData }: any) => {
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);

  return (
    <>
      <div className="absolute top-12 right-4 w-40 h-28 bg-white flex flex-col items-center shadow-md border-2 border-blue-300 rounded-md">
        <div
          className="flex items-center justify-center space-x-2 rounded-t-md hover:bg-gray-200 w-full h-full cursor-pointer"
          onClick={deletePost}
        >
          <AiOutlineDelete className="text-2xl" />
          <span>Delete Post</span>
        </div>
        <div className="flex items-center justify-center space-x-2 rounded-b-md hover:bg-gray-200 w-full h-full cursor-pointer"
        onClick={() => setIsEditPostModalOpen(true)}>
          <AiOutlineEdit className="text-2xl" />
          <span>Edit Post</span>
        </div>
      </div>
      {isEditPostModalOpen && <EditPost setIsEditPostModalOpen={setIsEditPostModalOpen} id={id} setIsDeleteModalOpen={setIsDeleteModalOpen} fetchData={fetchData} />}
    </>
  );
};

export default DeletePostModal;

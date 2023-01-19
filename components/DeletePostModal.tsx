import { AiOutlineDelete } from "react-icons/ai";

const DeletePostModal = ({ deletePost }: any) => {
  return (
    <div
      className="absolute top-12 right-4 w-40 h-14 bg-white flex items-center justify-center shadow-md border-2 border-blue-300 rounded-md space-x-2 hover:text-[#5a5757] cursor-pointer"
      onClick={deletePost}
    >
      <AiOutlineDelete className="text-2xl" />
      <span>Delete Post</span>
    </div>
  );
};

export default DeletePostModal;

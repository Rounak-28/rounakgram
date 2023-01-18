import { formatDistance } from "date-fns";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { dummyProfile } from "../jotai/atom";

const SingleComment = ({
  username,
  userImage,
  comment_text,
  like_count,
  created_at,
  setisDeleteCmntModalOpen,
  id,
  setDeleteCommentId,
}: any) => {
  const time = formatDistance(new Date(created_at), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });
  // console.log(id)
  return (
    <>
      <section className="min-h-[50px] flex px-3 my-5">
        <aside className="w-12 h-12">
          <div className="w-10 h-10 rounded-full overflow-hidden mt-3">

          <img
            src={userImage || dummyProfile}
            alt=""
            />
            </div>
        </aside>
        <aside className="w-full mx-2">
          <span className="text-sm font-semibold">{username}</span>
          <span className="text-sm text-gray-600 mx-3">{time}</span>
          <p className="text-sm my-1">{comment_text}</p>
          <div className="text-sm text-gray-700 space-x-7">
            <button>Reply</button>
            <button>Send</button>
          </div>
        </aside>
        <aside className="flex items-center space-x-5 mr-1">
          <BsThreeDotsVertical className="text-xl mt-5 hover:text-[#7c7979] cursor-pointer" onClick={() => {
            setisDeleteCmntModalOpen(true)
            setDeleteCommentId(id)
            }} />
          <div>

          <AiOutlineHeart className="text-xl mt-5 hover:text-[#7c7979] cursor-pointer" />
          <span className="text-sm ml-[6px]">{like_count}</span>
          </div>
        </aside>
      </section>
    </>
  );
};

export default SingleComment;

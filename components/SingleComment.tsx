import { formatDistance } from "date-fns";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { dummyProfile } from "../jotai/atom";

const SingleComment = ({ username, userImage, comment_text, like_count, created_at }: any ) => {

  const time = formatDistance(new Date(created_at), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <>
      <section className="min-h-[50px] flex px-3 mt-1">
        <aside className="w-12 h-12">
          <img src={userImage || dummyProfile} alt="" className="w-10 h-10 rounded-full"></img>
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
        <aside>
          <AiOutlineHeart className="text-xl mt-5 hover:text-gray-500 cursor-pointer" />
          <span className="text-sm ml-[6px]">{like_count}</span>
        </aside>
      </section>
    </>
  );
};

export default SingleComment;

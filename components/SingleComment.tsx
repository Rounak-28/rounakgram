import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const SingleComment = () => {
  return (
    <>
      <section className="min-h-[50px] flex px-3 mt-1">
        <aside className="py-2">
          <div className="w-10 h-10 bg-red-500 rounded-full"></div>
        </aside>
        <aside className="w-full mx-2">
          <span className="text-sm font-semibold">Rounak Kumbhakar</span>
          <span className="text-sm text-gray-600 mx-3">2d</span>
          <p className="text-sm my-1">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae
            inventore id quia.
          </p>
          <div className="text-sm text-gray-700 space-x-7">
            <button>Reply</button>
            <button>Send</button>
          </div>
        </aside>
        <aside>
          <AiOutlineHeart className="text-xl mt-5" />
          <span className="text-sm ml-[2px]">10</span>
        </aside>
      </section>
    </>
  );
};

export default SingleComment;

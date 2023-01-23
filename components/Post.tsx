import React, { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { formatDistance } from "date-fns";
import { BsBookmark, BsThreeDots } from "react-icons/bs";
import Image from "next/image";
import DeletePostModal from "./DeletePostModal";
import { supabase } from "../lib/supabase-client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { dummyProfile } from "../jotai/atom";
import { AnimatePresence } from "framer-motion";

const Post = ({
  username,
  userImage,
  description,
  created_at,
  id,
  image,
  fetchData,
  likes,
}: any) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isThisUserLiked, setIsThisUserLiked] = useState(false);
  const time = formatDistance(new Date(created_at), new Date(), {
    addSuffix: true,
    includeSeconds: true,
  });
  const { data: session } = useSession();

  const deletePost = async () => {
    const { error } = await supabase.from("posts").delete().eq("id", id);

    const { error: idc } = await supabase
      .from("comments")
      .delete()
      .eq("post_id", id);

    const { data, error: err } = await supabase.storage
      .from("postimages")
      .remove([`${image}`]);

    if (error) {
      console.log(error);
    }
    if (err) {
      console.log(err);
    }
    if (!error && !err) {
      fetchData();
    }
  };
  useEffect(() => {
    likes?.likeUsers?.includes(session?.user?.name)
      ? setIsThisUserLiked(true)
      : setIsThisUserLiked(false);
  }, []);

  const addLike = async () => {
    likes?.likeUsers?.push(session?.user?.name);
    setIsThisUserLiked(true);
    const { data, error } = await supabase
      .from("posts")
      .update({ likes: likes })
      .eq("id", id)
      .select();
  };

  const removeLike = async () => {
    likes?.likeUsers?.pop(username);
    setIsThisUserLiked(false);
    const { data, error } = await supabase
      .from("posts")
      .update({ likes: likes })
      .eq("id", id)
      .select();
  };

  let altArray = username.split(" ");
  let alt: string = "";
  for (let idk in altArray) {
    alt += altArray[idk].slice(0, 1);
  }

  return (
    <div className="w-full max-w-[420px] bg-[#ffffff] rounded-lg outline outline-1 outline-gray-400 dark:bg-[#1e293b] mx-auto">
      <div className="top w-full h-14 flex items-center px-4 relative">
        <img
          src={userImage || dummyProfile}
          className="w-10 h-10 rounded-full cursor-pointer flex justify-center items-center outline outline-1 outline-blue-200"
          alt={alt}
        />
        <p className="mx-3 text-[15px] font-semibold hover:text-[#696767]">
          {username}
        </p>
        <BsThreeDots
          className="absolute right-7 text-xl cursor-pointer"
          onClick={() =>
            isDeleteModalOpen
              ? setIsDeleteModalOpen(false)
              : setIsDeleteModalOpen(true)
          }
        />
        <AnimatePresence>
          {isDeleteModalOpen && username === session?.user?.name && (
            <DeletePostModal
              deletePost={deletePost}
              id={id}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              fetchData={fetchData}
            />
          )}
        </AnimatePresence>
      </div>
      <Image
        src={`https://gmmwporpmnptcveaewtu.supabase.co/storage/v1/object/public/postimages/${image}`}
        className="w-full lg:max-h-[400px]"
        width={300}
        height={0}
        alt=""
      />
      <div className="h-14 px-4 flex items-center space-x-5 relative">
        {isThisUserLiked ? (
          <FcLike
            className="text-[27px] hover:text-[#7c7979]"
            onClick={removeLike}
          />
        ) : (
          <AiOutlineHeart
            className="text-[27px] hover:text-[#7c7979]"
            onClick={addLike}
          />
        )}
        <Link href={`post/${id}`}>
          <FaRegComment className="text-2xl hover:text-[#7c7979]" />
        </Link>
        <FiSend className="text-2xl hover:text-[#7c7979]" />
        <BsBookmark className="text-2xl hover:text-[#7c7979] absolute right-6" />
      </div>
      <Link href={`post/${id}`}>
      <p className="px-4 text-sm">{likes?.likeUsers?.length} likes</p>
      <span className="pl-4 pr-2 text-sm font-semibold cursor-pointer">
        {username}
      </span>
      <span className="text-sm">{description}</span>
      <p className="text-sm px-4 my-2 text-[#5b5858] dark:text-gray-300">
        {time.toUpperCase()}
      </p>
      </Link>
    </div>
  );
};

export default Post;

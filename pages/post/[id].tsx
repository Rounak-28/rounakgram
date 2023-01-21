import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import SingleComment from "../../components/SingleComment";
import {
  dltCommentId,
  dummyProfile,
  isDeleteCommentModalOpen,
} from "../../jotai/atom";
import { supabase } from "../../lib/supabase-client";
import Lottie from "lottie-react";
import groovyWalkAnimation from "../../public/groovyWalk.json";
import DeleteCommentModal from "../../components/DeleteCommentModal";
import { useAtom } from "jotai";
import { AnimatePresence } from "framer-motion";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: session } = useSession();

  const [singlePostData, setSinglePostData]: any = useState("");
  const [commentsData, setCommentsData] = useState<any[]>([]);

  const [isAllLoaded, setIsAllLoaded] = useState(false);

  const [deleteCommentId, setDeleteCommentId] = useAtom(dltCommentId);

  const fetchSingleData = async () => {
    const { data, error } = await supabase.from("posts").select().eq("id", id);

    if (error) {
      console.log(error);
    }

    const { data: idk, error: idc }: any = await supabase
      .from("comments")
      .select()
      .order("id", { ascending: false })
      .eq("post_id", id);

    if (idc) {
      console.log(idc);
    }

    setCommentsData(idk);
    setSinglePostData(data);
    setInputText("");
    setIsAllLoaded(true);
  };

  useEffect(() => {
    if (!router.isReady) return;

    fetchSingleData();
  }, [router.isReady]);

  const [inputText, setInputText] = useState("");

  const [isCmntBtnEnabled, setIsCmntBtnEnabled] = useState(false);

  const [isDeleteCmntModalOpen, setisDeleteCmntModalOpen] = useAtom(
    isDeleteCommentModalOpen
  );

  useEffect(() => {
    inputText.length != 0
      ? setIsCmntBtnEnabled(true)
      : setIsCmntBtnEnabled(false);
  }, [inputText]);

  const postComment = async () => {
    const { error } = await supabase.from("comments").insert({
      post_id: id,
      username: session?.user?.name,
      userImage: session?.user?.image,
      comment_text: inputText,
      like_count: 0,
    });

    if (error) {
      console.log(error);
    }
    if (!error) {
      fetchSingleData();
    }
  };

  const deleteComment = async (comment_id: any) => {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", comment_id);
    if (error) {
      console.log(error);
    } else {
      fetchSingleData();
      setisDeleteCmntModalOpen(false);
    }
  };
  // console.log(deleteCommentId)

  if (!isAllLoaded) {
    return (
      <>
        <Lottie
          animationData={groovyWalkAnimation}
          className="dark:bg-[#1e293b] h-screen"
        />
      </>
    );
  }

  let alt: string = "";
  if (singlePostData) {
    let altArray = singlePostData[0]?.username?.split(" ");
    for (let idk in altArray) {
      alt += altArray[idk]?.slice(0, 1);
    }
  }

  return (
    <div className="min-h-screen pb-20 dark:bg-[#1e293b]">
      <nav className="h-14 flex justify-between items-center text-2xl px-4 sticky bg-[#fafafa] dark:bg-[#1e293b] top-0">
        <Link href="/">
          <BsArrowLeft />
        </Link>
        <span className="text-xl font-semibold">Comments</span>
        <FiSend className="hover:text-[#7c7979]" />
      </nav>
      <section className="min-h-[80px] flex px-3 space-x-3">
        <aside className="py-3 w-12 h-12">
          <img
            src={singlePostData[0]?.userImage || dummyProfile}
            alt={alt}
            className="w-10 h-10 rounded-full flex justify-center items-center outline outline-1 outline-blue-300"
          />
        </aside>
        <aside className="w-full">
          <span className="text-sm font-semibold">
            {singlePostData[0]?.username}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300 mx-3">
            2d
          </span>
          <p className="text-sm my-1">{singlePostData[0]?.description}</p>
        </aside>
      </section>
      <div className="hr w-full h-[1px] bg-gray-100 dark:bg-slate-700"></div>
      <main>
        {commentsData.map((data: any) => {
          return <SingleComment {...data} key={data.id} />;
        })}
        {isDeleteCmntModalOpen && (
          <DeleteCommentModal deleteComment={deleteComment} />
        )}
      </main>
      {/* <p>Post: {id}</p> */}
      <footer className="h-16 bg-white border-t-2 dark:border-t-slate-700 fixed w-full bottom-0 pl-2 pr-4 dark:bg-[#1e293b]">
        <div className="h-full flex items-center space-x-5">
          <div className="w-14 h-12">
            <img
              src={session?.user?.image! || dummyProfile}
              className="w-10 h-10 rounded-full"
            ></img>
          </div>
          <div className="w-full h-[80%]">
            <input
              type="text"
              className="w-full h-full indent-2 outline-none rounded-sm dark:bg-slate-700 dark:border-gray-800"
              placeholder="Add a comment..."
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              onKeyDown={(evt) => evt.key === "Enter" && postComment()}
            />
          </div>
          <button
            className={isCmntBtnEnabled ? "text-blue-500" : "text-blue-300"}
            disabled={!isCmntBtnEnabled}
            onClick={postComment}
          >
            Post
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Post;

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import SingleComment from "../../components/SingleComment";
import { dummyProfile } from "../../jotai/atom";
import { supabase } from "../../lib/supabase-client";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: session } = useSession();

  const [singlePostData, setSinglePostData]: any = useState("");
  const [commentsData, setCommentsData] = useState<any[]>([]);

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
  };

  useEffect(() => {
    if (!router.isReady) return;

    fetchSingleData();
  }, [router.isReady]);

  const [inputText, setInputText] = useState("");

  const [isCmntBtnEnabled, setIsCmntBtnEnabled] = useState(false);

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

  return (
    <div className="min-h-screen pb-20">
      <nav className="h-14 flex justify-between items-center text-2xl px-4 sticky bg-[#fafafa] top-0">
        <Link href="/">
          <BsArrowLeft />
        </Link>
        <span className="text-xl font-semibold">Comments</span>
        <FiSend />
      </nav>
      <section className="min-h-[100px] flex px-3 space-x-3">
        <aside className="py-3 w-12 h-12">
          <img
            src={singlePostData[0]?.userImage || dummyProfile}
            alt=""
            className="w-10 h-10 rounded-full"
          ></img>
        </aside>
        <aside className="w-full">
          <span className="text-sm font-semibold">
            {singlePostData[0]?.username}
          </span>
          <span className="text-sm text-gray-600 mx-3">2d</span>
          <p className="text-sm my-1">{singlePostData[0]?.description}</p>
        </aside>
      </section>
      <hr />
      <main className="space-y-6">
        {commentsData.map((data: any) => {
          return <SingleComment {...data} key={data.id} />;
        })}
      </main>
      {/* <p>Post: {id}</p> */}
      <footer className="h-16 bg-white border-t-2 fixed w-full bottom-0 pl-2 pr-4">
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
              className="w-full h-full indent-1 outline-none"
              placeholder="Add a comment..."
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
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

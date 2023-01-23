import { useAtom } from "jotai";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Script from "next/script";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { allPostData } from "../jotai/atom";
import { supabase } from "../lib/supabase-client";

export default function Home() {
  const { data: session } = useSession();
  // console.log(session)

  const [postData, setPostData]: any = useAtom(allPostData);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select()
      .order("id", { ascending: false });

    setPostData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(postData)

  if (!session) {
    return (
      <>
        <Navbar session={session} />
        <div className="w-screen h-screen flex justify-center dark:bg-[#2b333f]">
          <button
            className="bg-[#4ab2f7] dark:bg-[#114394] dark:hover:bg-[#032f77] rounded-md w-[80%] h-12 mt-36 text-white"
            onClick={() => signIn()}
          >
            Login / Signup to access
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <Navbar session={session} />
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:gap-5 content-between space-y-3 min-h-screen max-w-[500px] lg:max-w-none px-2 py-2 mt-14 dark:bg-[#2b333f]">
        {postData.map((post: any) => {
          return <Post {...post} key={post.id} fetchData={fetchData} />;
        })}
      </div>
    </>
  );
}

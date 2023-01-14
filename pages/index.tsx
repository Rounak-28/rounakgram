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
        <div className="w-screen h-screen flex justify-center">
          <button
            className=" bg-[#4ab2f7] rounded-md w-[80%] h-12 mt-36 text-white"
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
      <div className="w-screen flex flex-col space-y-3 justify-center min-h-screen max-w-[500px] px-2 py-2 mt-14">
        {postData.map((post: any) => {
          return <Post {...post} key={post.id} fetchData={fetchData} />;
        })}
      </div>
    </>
  );
}

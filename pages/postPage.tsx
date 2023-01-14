import { useAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { postFile } from "../jotai/atom";
import Router from "next/router";
import { useSession } from "next-auth/react";
import { supabase } from "../lib/supabase-client";

const postPage = () => {
  const { data: session }: any = useSession();

  // const formData = new FormData();
  const [selectedFile] = useAtom(postFile);
  const [fileBlobUrl, setFileBlobUrl] = useState("");
  const [caption, setCaption] = useState("");

  const post = async () => {
    // formData.append("username", session?.user?.name);
    // formData.append("userImage", session?.user?.image);
    // formData.append("description", caption);
    // formData.append("image", selectedFile);

    // const record = await pb.collection("posts").create(formData);
    const { data, err }: any = await supabase.storage
      .from("postimages")
      .upload(`${session?.user?.name}/image${Math.random()}.png`, selectedFile);

    const { error } = await supabase.from("posts").insert({
      username: session?.user?.name,
      userImage: session?.user?.image,
      description: caption,
      image: data?.path,
      likes: {
        likeUsers: []
      }
    });

    // console.log(data)
    if (error) {
      console.log(error);
    }
    if (err) {
      console.log(err);
    }
    if (!error && !err) {
      Router.push("/");
    }
    // if (record) {
    //   Router.push("/");
    // }
  };

  useEffect(() => {
    // create the preview
    const objectUrl = URL.createObjectURL(new Blob([selectedFile]));

    setFileBlobUrl(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const changeCaption = (event: any) => setCaption(event.target.value);

  return (
    <div className="h-screen">
      <div className="topbar flex items-center justify-between border-2 h-12 w-full border-b-[1px] border-b-[#b5b2b2]">
        <Link href="/">
          <AiOutlineLeft className="text-3xl ml-2" />
        </Link>
        <span>New post</span>
        <button className="text-blue-500 mr-3 text-lg" onClick={post}>
          Share
        </button>
      </div>
      <div>
        <div className="h-24 flex items-center justify-between">
          <img
            src={session?.user?.image}
            className="w-8 h-8 rounded-full mx-2"
          ></img>
          <textarea
            className="border-2 w-80 h-full outline-none p-2 resize-none bg-[#fafafa]"
            placeholder="write a caption..."
            onChange={changeCaption}
          />
          <img
            src={fileBlobUrl}
            alt=""
            className="img max-w-[48px] max-h-[48px] mx-3"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default postPage;

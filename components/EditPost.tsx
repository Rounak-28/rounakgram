import React, { useState } from "react";
import { supabase } from "../lib/supabase-client";

const EditPost = ({ setIsEditPostModalOpen, id, setIsDeleteModalOpen, fetchData }: any) => {
const [textData, setTextData] = useState("")

  const updateTitle = async () => {
    const { error } = await supabase
      .from("posts")
      .update({ description: textData })
      .eq("id", id);
    if (error) {
      console.log(error);
    }
    if(!error){
        setIsEditPostModalOpen(false)
        setIsDeleteModalOpen(false)
        fetchData()
    }
  };
  
  return (
    <div className="w-full h-52 z-[9999999] absolute top-24 left-0">
      <div className="w-4/5 bg-white h-full mx-auto flex flex-col items-center py-4 space-y-2 border-2 border-blue-300 rounded-md">
        <p className="">Enter New Title:</p>
        <textarea
          className="rounded w-[90%] h-24 outline-none resize-none px-3 py-1 border-2 border-gray-200"
          placeholder="New title..."
          onChange={event => setTextData(event?.target?.value)}
        />
        <div className="w-3/5 flex justify-between">
          <button
            className="border-2 w-20 h-9 rounded-md hover:bg-gray-200"
            onClick={() => setIsEditPostModalOpen(false)}
          >
            Cancel
          </button>
          <button className="border-2 border-blue-500 w-20 h-9 rounded-md bg-blue-500 hover:bg-blue-600 hover:border-blue-600 text-white"
          onClick={updateTitle}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

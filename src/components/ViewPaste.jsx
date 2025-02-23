import React from "react";
import { useState  , useEffect  } from "react";
import { useParams, useSearchParams } from "react-router";
import { useDispatch , useSelector } from "react-redux";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";
// import {useState} from React
const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final Paste: ",paste)
  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between ">
        <input
          
          className="p-1 rounded-2xl mt-2 w-[66%] pl-5"
          type="text"
          placeholder="Enter Title: "
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* <button className="p-2 rounded-2xl mt-2" onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button> */}
      </div>
      <div className="mt-8">
        <textarea
          className="rounded-2xl mt-4 min-w-[500px] p-4"
          value={paste.content}
          placeholder="Enter Content here"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;

import React, { useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Paste = () => {
  // for getting data from local storage
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(paste_Id) {
    console.log("Deleting paste with ID:", paste_Id);
    dispatch(removeFromPastes(paste_Id));
  }

  function handleCopy(content) {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        toast.success("Copied to clipboard");
      })
      .catch((err) => {
        toast.error("Failed to copy");
        console.error("Failed to copy text: ", err);
      });
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        })
        .then(() => {
          toast.success("Shared successfully");
        })
        .catch((err) => {
          toast.error("Failed to share");
          console.error("Failed to share: ", err);
        });
    } else {
      toast.error("Web Share API is not supported in your browser");
    }
  }

  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-5"
        type="search"
        placeholder="search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-5 mt-5">
        {filterData.length >= 0 &&
          filterData.map((paste) => {
            console.log("Paste object:", paste);
            return (
              <div className="border" key={paste?._id}>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className="flex flex-row gap-4 place-content-evenly">
                  <button>
                    <Link to={`/?pasteId=${paste._id}`}>Edit</Link>
                  </button>
                  <button>
                    <Link to={`/?pasteId=${paste._id}`}>View</Link>
                  </button>
                  <button onClick={() => handleDelete(paste?._id)}>
                    Delete
                  </button>
                  <button onClick={() => handleCopy(paste?.content)}>
                    Copy
                  </button>
                  <button onClick={() => handleShare(paste)}>Share</button>
                </div>
                <div>{paste.createdAt}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;

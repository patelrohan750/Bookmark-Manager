import React from "react";
import "./NoBookmark.css";
import noBookmark from './noBookmark.svg'
const NoBookmark = () => {
  return (
    <div className='nobookmark'>
      <div className="noBookmarkImage">
         <img src={noBookmark} alt="noBookmark" />
      </div>
      <div className="noBookmarkText">No bookmarks</div>
    </div>
  );
};

export default NoBookmark;

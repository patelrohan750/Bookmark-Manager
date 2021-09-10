import React, { useEffect, useState } from "react";
import "./Bookmarkes.css";
import BookmarkHeader from "./Bookmark Header/BookmarkHeader";
import Bookmark from "./Bookmark/Bookmark";

import { useParams } from "react-router";
import axios from '../../http/index'
import Notification from "../../components/shared/Notification/Notification";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import { Spinner } from 'react-bootstrap'
import NoBookmark from "../../components/shared/No Bookmark/NoBookmark";
import { getAllBookmarks, getBookmarkByCategory,searchBookmarksByCategory,getAllBookmarksCount } from "../../redux/Actions/bookamrk-action";
const Bookmarkes = () => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(state => state.user)
  const { selectedBookmarks,categorySelect } = useSelector(state => state.bookmark)
  
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log("id:", id);
  useEffect(() => {
    getBookmarksByCategoryChange()
  }, [id]);

  useEffect(()=>{
    dispatch(getAllBookmarksCount())
  },[])
 

 


 
  const getBookmarksByCategoryChange = () => {
    // setLoading(true)
    if (!id) {
      dispatch(getAllBookmarks())
     
    } else {
      dispatch(getBookmarkByCategory(id))
     
    }
   
    
  }

 

  const saveBookmark = (url) => {

    axios.post('/api/bookmark', {
      url,
      category: categorySelect === "All Bookmarks" ? "Uncategorized" : categorySelect,
      categoryId: id,
      created: moment().format('MMM D YYYY hh:mm:ss A'),
      userBy: user._id
    }).then((result) => {
      console.log(result);
      toast.success('😀 Bookmark saved successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      getBookmarksByCategoryChange()
      dispatch(getAllBookmarksCount())
    }).catch((e) => {
      console.log(e);
      toast.error('⚠️please try again ', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  }

  const searchBookmarkes=(searchText)=>{
    console.log(searchText)
    const data={
      searchField:searchText,
      categoryId:id ? id: ""
    }
    dispatch(searchBookmarksByCategory(data))
  }


  // if (!bookmarks) {
  //   return (
  //     <div className='bookmark_spiner'>
  //       <Spinner animation="border" role="status" className='text-white'>
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     </div>
  //   )
  // }

  return (
    <React.Fragment>
      <Notification />
      <BookmarkHeader  saveBookmark={saveBookmark} searchBookmarkes={searchBookmarkes}/>

      <div className="bookmark_container">

        {
          loading ? (
            <div className='bookmark_spiner'>
              <Spinner animation="border" role="status" className='text-white'>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            selectedBookmarks.length === 0 ? <NoBookmark /> : (

              selectedBookmarks.map((bookmark, index) => {
                return <Bookmark key={bookmark._id} bookmark={bookmark} />;
              })

            )
          )
        }


        {/* {   bookmarks.length === 0 ? <NoBookmark /> : (
              
                bookmarks.map((bookmark, index) => {
                  return <Bookmark key={bookmark._id} bookmark={bookmark} />;
                })

          )
          } */}



      </div>
    </React.Fragment>
  );
};

export default Bookmarkes;



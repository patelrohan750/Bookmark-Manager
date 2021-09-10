import React from 'react'
import './Bookmark.css'
import { IoEarth } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineEye,AiFillFolder } from "react-icons/ai";
import EditBookmark from '../Edit Bookmark/EditBookmark';
import {toast} from 'react-toastify'
import axios from '../../../http/index'
import {useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getAllBookmarks,getBookmarkByCategory } from '../../../redux/Actions/bookamrk-action';
const Bookmark = ({bookmark}) => {
    const {id}=useParams()
    const dispatch = useDispatch();
    const setTitleContent=(text,number)=>{
        if(text.length<number) {
            return text;
        }
        else{
            return `${text.substring(0,number)}...`
        }
    }
    const refreshBookmark=()=>{
        if(!id){
            dispatch(getAllBookmarks())
        }else{
            dispatch(getBookmarkByCategory(id))
        }
    }
    const deleteBookmark=(id)=>{
        axios.delete(`/api/bookmark/${id}`).then((result)=>{
            console.log("Bookmark Deleted: ",result);
            refreshBookmark()
            toast.success('😀 Bookmark deleted successfully', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
        }).catch((e)=>{
            console.log(e)
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
    return (
      
        <div className='bookmark_card'>
            <div className="bookmark_card_banner">
                <img src={bookmark.imageURL} alt={bookmark.title} className='bookmark_card_banner_img' />
            </div>
            <div className='bookmark_actions'>
            <div className='d-flex align-items-center'>
                <div className="icon_box">
                <a href={bookmark.url} target="_blank">
                <AiOutlineEye/>
                </a>
                   
                </div>
                <div className="icon_box">
                    <EditBookmark bookmarkId={bookmark._id} refreshBookmark={refreshBookmark}/>
                </div>
                <div className="icon_box">
                    <RiDeleteBin6Line onClick={()=>deleteBookmark(bookmark._id)}/>
                </div>
            </div>

            </div>
            <div className="bookmark_card_body ">
            <h2 className="bookamrk_card_title ">{bookmark.title}</h2>  
            <p className="bookamrk_card_description">{setTitleContent(bookmark.description,100)}</p>
            <div className="bookmark_category">
            <AiFillFolder className='me-1'/>
                {bookmark.category}
            </div>
            <p className="bookamrk_card_hostname">
            <IoEarth className='me-1'/>
            {bookmark.hostname}</p>
            </div>
        
        </div>
   
    )
}

export default Bookmark

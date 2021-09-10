import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavDropdown, Dropdown } from "react-bootstrap";
import { IoExitOutline } from "react-icons/io5";
import { IoIosAdd } from "react-icons/io";
import { AiOutlineCloud, AiOutlineFolder } from "react-icons/ai";
import { useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLoginUser } from "../../../redux/Actions/user-action";
import { setCategoriesRedux } from "../../../redux/Actions/bookamrk-action";
import axios from '../../../http/index';
import './Sidebar.css'
import AddCategory from "../../../Pages/Bookmarkes/AddCategory";
import OutsideClickHandler from 'react-outside-click-handler';
import moment from "moment";
import Category from "./Category";
const Sidebar = () => {
  const [shouldShowCategory, setShouldShowCategory] = useState(false)
  // const [categories, setCategories] = useState([])
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { allBookmarks,categories } = useSelector((state) => state.bookmark);
  console.log("categories from redux store: ",categories)
  
  useEffect(() => {
    dispatch(setCategoriesRedux())
  }, [])

  const logOutUser = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");
      dispatch(setCategoriesRedux([]))
      dispatch(setLoginUser(data));
     
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  }
  // const getCategories = () => {
  //   axios.get('/api/categories').then((result) => {
  //     console.log(result.data.categories);
  //     // setCategories(result.data.categories)
  //     dispatch(setCategoriesRedux(result.data.categories))
  //   }).catch((e) => {
  //     console.log(e);
  //   })
  // }

  const addCategory=(e)=>{
    e.preventDefault()
    axios.post('/api/category',{
        created:moment().format('MMM D YYYY hh:mm:ss A'),
        category:e.target[0].value,
        userBy:user._id
    }).then((result)=>{
        console.log(result);
        dispatch(setCategoriesRedux())
    }).catch(e=>{
        console.log(e);
    })
  }

  const getBookmarkCount=(categoryId)=>{
   if(!categoryId){
     return allBookmarks.length
   }
   const newBookmarks=allBookmarks.filter((bookmark,index)=>{
     return bookmark.categoryId ===categoryId
   })
   return newBookmarks.length
  
  }
  


  return (
    <React.Fragment>
      <div className="side_menu">
        <div className="top_section">
          <div className="profile_info d-flex align-items-center">
            <FaUserCircle />
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={user.name}
              menuVariant="dark"
            >
              <NavDropdown.Item onClick={logOutUser}>
                <IoExitOutline /> Logout
              </NavDropdown.Item>
            </NavDropdown>
          </div>

          <div className="add_collecation" onClick={() => setShouldShowCategory(true)}>
            <IoIosAdd />
          </div>

        </div>
        <Dropdown.Divider />
        <div className="all">
        <NavLink exact activeClassName='active_category_link' to='/bookmarks' className='category_links d-flex justify-content-between align-items-center'>
              <div><AiOutlineCloud className='all_icon' /> All Bookmarks</div> 
              <div className='count'> {getBookmarkCount('')}</div>
               
          </NavLink>
        </div>
        <div className="main_menu">
          <p>Collections</p>
          <OutsideClickHandler onOutsideClick={() => setShouldShowCategory(false)}>
            {
              shouldShowCategory && (
                <AddCategory shouldShow={shouldShowCategory}  addCategory={addCategory}/>
              )
            }
          </OutsideClickHandler>

          <ul className='mt-2'>
            {
              categories.map((item, index) => {
                return (
                  <li key={index}>
                 <Category category={item} 
                  getBookmarkCount={getBookmarkCount}
                 />
                  </li>
                )
              })
            }

          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;

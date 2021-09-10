import React, { useEffect, useRef } from "react";
import { BsBookmarksFill } from "react-icons/bs";
import "./CustomNavbar.css";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AddBookmark from "../../../Pages/Bookmarkes/Add Bookmark/Add Bookmark";
import { Button } from 'react-bootstrap'
import { setLoginUser } from "../../../redux/Actions/user-action";
import axios from '../../../http/index'
import lottie from 'lottie-web'
const CustomNavbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.user);
    const logo = useRef(null)
    useEffect(() => {
        lottie.loadAnimation({
            container: logo.current, // the dom element
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('./logo-bookmark.json'), // the animation data
        })
    }, [])
    console.log("Navbar Auth: ", isAuth);
    const logOutUser = async () => {
        try {
            const { data } = await axios.post("/api/user/logout");
            dispatch(setLoginUser(data));
            history.push("/", { replace: true });
        } catch (err) {
            console.log(err);
        }
    }
    const RenderMenu = () => {
        if (isAuth) {
            return (
                <>
                    <div className="add__bookmark">
                        <AddBookmark />
                    </div>
                    <div className="user__info d-flex align-items-center justify-content-center">
                        <div className="user__name ">
                            <p className="mb-0 me-3">{user.name}</p>
                        </div>
                        <div className="user__avtar__wrapper">
                            <img
                                className="user__avtar__image"
                                src="https://cdn.pixabay.com/photo/2015/09/02/13/24/man-919045__340.jpg"
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <Button type='submit' variant="outline-danger" onClick={logOutUser}>Log out</Button>

                </>
            );
        } else {
            return (
                <>

                    <Link to="/login" className="navbar__login me-3">
                        <button className="navbar_login_btn">Login</button>
                    </Link>
                    <Link to="/register" className="navbar__register">
                        <button className="navbar_register_btn">Register</button>
                    </Link>
                </>
            );
        }
    };

    return (
        <nav className='custom__nav'>
            <div className="container custom__navbar">
                <Link to="/" className="navbar__brand">
                    <div className="logo" ref={logo}>

                    </div>
                    {/* <BsBookmarksFill className="logo" /> */}
                    <span className="logo__text">Bookmark Manager</span>
                </Link>
                {
                    RenderMenu()
                }
            </div>
        </nav>

    );
};

export default CustomNavbar;

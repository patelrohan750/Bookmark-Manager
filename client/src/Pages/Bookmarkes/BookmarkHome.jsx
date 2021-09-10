import React, { useEffect, useState } from 'react'
import Bookmark from './Bookmark/Bookmark'
import axios from '../../http/index'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import Loader from '../../components/shared/Loader/Loader'
import Pusher from 'pusher-js'
import Bookmarkes from './Bookmarkes'

const RouteWithSidebar = ({ component: Component, allProps }) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    if (!loaded) return <Loader message='Please wait....' />
    return (
        <>
            <Sidebar/>
            <main className="content">
                {/* <Navbar /> */}
                <Component />
                {/* <Footer toggleSettings={toggleSettings} showSettings={showSettings} /> */}
            </main>
        </>
    )

}

const BookmarkHome = () => {
    // const [bookmarks, setBookmarks] = useState([])
    // const [categories, setCategories] = useState([])
    // useEffect(() => {
    //     // var pusher = new Pusher('9d550468e871289eaf3e', {
    //     //     cluster: 'ap2'
    //     // });

    //     // var channel = pusher.subscribe('bookmarks');
    //     // channel.bind('inserted', function (data) {
    //     //     getAllBookmarks();
    //     // });
    //     // getAllBookmarks();
    //     allCategories();
    // }, [])
    // const getAllBookmarks = () => {
    //     axios.get('/api/bookmarks').then((result) => {
    //         console.log(result);
    //         setBookmarks(result.data.bookmarks)
    //     }).catch((e) => {
    //         console.log(e);
    //     })

    // }
    // const allCategories = () => {
    //     axios.get('/api/category').then((result) => {
    //         console.log(result);
    //         setCategories(getUniqueListBy(result.data.categories, 'category'))
    //     }).catch(e => {
    //         console.log(e);
    //     })
    // }
    // function getUniqueListBy(arr, key) {
    //     return [...new Map(arr.map(item => [item[key], item])).values()]
    // }
    // const searchBookmarks = (bookmarks, searchItem) => {
    //     // console.log("searchItem: ",searchItem)
    //     axios.post('/api/search', { searchText: searchItem }).then((result) => {
    //         console.log(result)
    //         setBookmarks(result.data.serchResult)
    //     }).catch(e => {
    //         console.log(e)
    //     })


    //     // setBookmarks(filterBookmarks)
    // }

    // const onChangeHandler = (e) => {
    //     // console.log(e.target.value);
    //     const searchTerm = e.target.value;
    //     if (!searchTerm) {
    //         getAllBookmarks();
    //     }
    //     searchBookmarks(bookmarks, searchTerm)

    // }
    // const onChangeCategory = (e) => {
    //     const category = e.target.value
    //     // console.log(e.target.value)
    //     if (category === 'select category') {
    //         getAllBookmarks();
    //     } else {
    //         axios.post('/api/filter/category', {
    //             category
    //         }).then((result) => {
    //             console.log(result);
    //             setBookmarks(result.data.filterResult)
    //         }).catch(e => {
    //             console.log(e);
    //         })
    //     }


    // }
  
    return (
        <div>
            <RouteWithSidebar component={Bookmarkes}/>
        </div>
    )
}

export default BookmarkHome

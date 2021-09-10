import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Pages/Home/Home'
import CustomNavbar from './components/shared/Navbar/CustomNavbar';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Activate from './Pages/Activate/Activate';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Bookmarkes from './Pages/Bookmarkes/Bookmarkes'
import BookmarkHome from './Pages/Bookmarkes/BookmarkHome';
// const isAuth = false
// const user={
//   isActivated:false
// }
function App() {
  const { loading } = useLoadingWithRefresh()
 
  return loading ? (
    <Loader message="Loading please wait..."/>
  ) :

    (
      <BrowserRouter>
       
        <Switch>


          <GuestRoute exact path="/register" >
            <Register />
          </GuestRoute>

          <GuestRoute path="/" exact>
            <Home />
          </GuestRoute>
          <GuestRoute path="/login" exact >
            <Login />
          </GuestRoute>
          <Route path="/api/user/register/verify/:id">
            <Activate />
          </Route>
          {/* <SemiProtectedRoute path="/activate" exact>
          <Activate />
        </SemiProtectedRoute> */}
      
          <ProtectedRoute path="/bookmarks">
              <BookmarkHome/>
          </ProtectedRoute>
          <ProtectedRoute path="/api/category/:id">
          <BookmarkHome/>
          </ProtectedRoute>
        </Switch>

      </BrowserRouter>
    );
}



const GuestRoute = ({ children, ...props }) => {
  const { isAuth } = useSelector(state => state.user)
  // console.log(isAuth);
  return (
    <Route {...props} render={({ location }) => {
      return isAuth ? (
        <Redirect to={
          {
            pathname: '/bookmarks',
            state: { from: location }
          }
        } />
      ) :
        (
          children
        )



    }}>

    </Route>
  )

}

const SemiProtectedRoute = ({ children, ...props }) => {
  const { user, isAuth } = useSelector(state => state.user)
  return (
    <Route {...props} render={({ location }) => {
      return (
        !isAuth ? (
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
        ) : isAuth && !user.isVerified ?
          (
            children
          ) :
          (
            <Redirect to={{
              pathname: '/bookmarks',
              state: { from: location }
            }} />
          )
      )
    }}>

    </Route>
  )
}


const ProtectedRoute = ({ children, ...props }) => {
  const { user, isAuth } = useSelector(state => state.user)
  console.log("isAuth: ", isAuth);
  console.log("user: ", user);


  return (
    <Route {...props} render={({ location }) => {
      return (
        !isAuth ? (
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }} />
        ) : isAuth && !user.isVerified ?
          (
            <Redirect to={{
              pathname: '/activate',
              state: { from: location }
            }} />
          ) :
          (
            children
          )
      )
    }}>

    </Route>
  )
}
export default App;

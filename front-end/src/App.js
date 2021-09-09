import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom"
import Main from "./components/Main";
import AppReducer from "./reduces/AppReducer";
import { useCallback, useEffect, useReducer } from "react";
import AppContext from "./components/AppContext";
import axios from "axios";
function App() {
  const initiallState = {user:null, posts:[]};
  const [state, dispatch] = useReducer(AppReducer, initiallState);
  const checkCurrentUser = useCallback(async () =>{
    try{
      const token =localStorage.getItem("token");
      const option ={
        method:"get",
        url:"/api/v1/auth/",
        headers:{
          Authorization:`Bearer ${token}`,
        },
      };
      const response = await axios(option);
      console.log('data new',response);
      if(response.data.data.user){
        const{userName} = response.data.data.user;
        dispatch({type:"CURRENT_USER",payload:{userName}})
      }
    }catch(error){
      console.log(error)
    }
  },[dispatch]);
  useEffect(() =>{
    checkCurrentUser();
  },[checkCurrentUser])
  return (
    <Router>
      <AppContext.Provider value={{state,dispatch}}>
        <div className="container">
          <Header/>
          <Switch>
            <Route exact path="/login">
              <Login/>
            </Route>
            <Route exact path="/register">
              <Register/>
            </Route>
            <Route exact path="/">
              <Main/>
            </Route>
            <Route exact path="*">
              <div>Page Not Found</div>
            </Route>          
          </Switch>
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;

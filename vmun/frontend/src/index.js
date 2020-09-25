import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "../src/main/home";
import Feedback from "../src/main/feedback";
import Development from "../src/main/development";
import Articles from "../src/main/articles";
import Login from "../src/auth/login-dom";
import Signup from "../src/auth/signup-dom";
import Navbar from "../src/common/navbar";
import VmunContextProvider from './vmun/context';
import Vmun from './vmun/dom';
import { ConfigContext } from "antd/lib/config-provider";


fetch("http://127.0.0.1:8000/accounts/teststate")
  .then(res => res.json())
  .then(
    (data) => {
      const initialState = {
        user: data.user,
        todos: JSON.parse(data.todos),
      };
      console.log(initialState);
      const App = () => {
        return (
          <VmunContextProvider initState={initialState}>
            <Vmun/>
          </VmunContextProvider>
        )
      };
      ReactDOM.render(<App />, document.getElementById('root'));
    }
  )
  


// function Main() {
//   const [user, dispatch] = useContext(UserContext);
//   return (
//     <>
//       <Router>
//         {Object.entries(user).map(([key, value]) => (
//           <ul>
//             <li>hey{key}: {value}</li>
//           </ul>
//         ))}
//         <Switch>
//           <Route exact path="/"><Home/></Route>
//           <Route path="/accounts/login"><Login/></Route>
//           <Route path="/accounts/signup"><Signup/></Route>
//           <Route path="/feedback"><Feedback/></Route>
//           <Route path="/development"><Development/></Route>
//           <Route path="/articles"><Articles/></Route>
//         </Switch>
//       </Router>
//     </>
//   )
// }


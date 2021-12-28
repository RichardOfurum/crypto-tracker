
import './App.css';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from './components/home/Home';
import Header from './components/header/Header';
import Coin from './components/coin/Coin';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));


function App() {


const classes = useStyles();


  return (
    <BrowserRouter>
      <div className={classes.App} >
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/coin/:id" element={<Coin/>} />
          
          <Route path="*" element={<h4> 404 page not found</h4>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

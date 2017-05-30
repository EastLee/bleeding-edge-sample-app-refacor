import React,{Component} from "react";
import {Link} from "react-router";

class MainNav extends Component{
    render() {
        return (
          <nav className='main-nav' role='navigation'>
            <ul className='nav navbar-nav'>
              <li><Link to="/">All Surveys</Link></li>
              <li><Link to="/surveys">Add Survey</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
        );
    }
}

export default MainNav;

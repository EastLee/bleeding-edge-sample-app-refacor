import React,{Component} from "react";
import {Link} from "react-router";
import MainNav from './main_nav';


class MainHeader extends Component{
    render() {
        return (
          <header className='main-header navbar navbar-static-top container'>
            <div className='container-fluid'>
              <Link to="list" className='navbar-brand logo'>SurveyBuilder</Link>
              <MainNav />
            </div>
          </header>
        );
    }
}

export default MainHeader;

import React,{Component} from "react";
import MainHeader from "./main_header";


class App extends Component {
  render() {
    return (
      <div className='app'>
        <MainHeader/>
        <div className='main-content container'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = App;

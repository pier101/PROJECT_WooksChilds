import React, { Component } from "react";
import "./main.css";

import { Route, Link, Switch } from "react-router-dom";
import { List, Write, View } from "./index.js";

import { Right_Write } from "./right/index.js";

class main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      category : '',
      category_change : false,
      contents : "",
      title : ""
    }
  }

  _withProps = function (Component, props) {
    return function(matchProps) {
      return <Component {...props} {...matchProps} />
    }
  }

  render() {
    const { _changeState, _getContents, _getTitles, _getModifyData } = this;
    const { contents, title } = this.state;
    return (
      <div className="Mains">
        <div id="Mains-left">
          <h3> </h3>
        </div>

        <div>
          <Switch>
            <div>
              <Route path="/board" component={List} exact />
            </div>
          </Switch>
          <Switch>
          <Route path='/board/write/modify/:data' 
                    component={this._withProps(Write, { 
                      _getContents : _getContents,
                      _getTitles : _getTitles,
                      contents : contents,
                      title : title,
                      _getModifyData : _getModifyData
                      })} />


          <Route path="/board/write" component={Write} />
          </Switch>
          <Route path='/board/view/:data' component={View}/>
        </div>

        <div id="Mains-right">
          <Route path="/board/write" component={Right_Write} />
        </div>
      </div>
    );
  }
}

export default main;
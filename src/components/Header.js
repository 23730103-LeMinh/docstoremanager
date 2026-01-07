import React, { Component } from "react";
import Menu from "./Menu";

export default class Header extends Component {
  render() {
    return (
      <header className="d-flex flex-row py-3 border-bottom">
        <h2 className="px-5">DocStores</h2>
        <Menu className=""/>
      </header>
    );
  }
}

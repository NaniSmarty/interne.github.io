import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: null,
    };
  }
  componentDidMount = async () => {
    var clientjson = JSON.parse(sessionStorage.getItem('Userdetails'))
    this.setState({ Username: clientjson[0].Username });
  }
  render() {
    return (
      <>
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">Dashboard</li>
              </ol>
            </nav>
            <div className="" id="navbar">
              <ul className="navbar-nav  justify-content-end float-end">                
                                
                <li className="nav-item d-flex align-items-right">
                  <div className="nav-link text-body font-weight-bold px-0">
                    <i className="fa fa-user me-sm-1"></i>
                    <span className="d-sm-inline d-none">{this.state.Username}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    )
  }
}
export default Header;


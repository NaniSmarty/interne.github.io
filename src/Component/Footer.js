import React, { Component } from 'react';
class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return( 
        <>
        <footer className="footer py-4">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-lg-between">
            <div className="col-12 col-md-6 my-auto">
              <div className="copyright text-center text-sm text-muted text-lg-start">
                © 2024,
                made with <i className="fa fa-heart" aria-hidden="true"></i> by
                <a href="https://www.creative-tim.com" className="font-weight-bold" target="_blank"> Creative Time </a>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                <li className="nav-item">
                  <a href="https://www.creative-tim.com" className="nav-link" target="_blank"> Creative Time </a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/presentation" className="nav-link" target="_blank">About Us</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/blog" className="nav-link" target="_blank">Blog</a>
                </li>
                <li className="nav-item">
                  <a href="https://www.creative-tim.com/license" className="nav-link pe-0" target="_blank">License</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
        </>
    )   
  }
}
export default Footer;
  

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Left extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
                <div className="sidenav-header">
                    <i className="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav"></i>
                    <a className="navbar-brand m-0" target="_blank">
                        <span className="ms-1 font-weight-bold text-white ">Intern</span>
                    </a>
                </div>
                <hr className="horizontal light mt-0 mb-2" />
                <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/Home" className="nav-link text-white active bg-gradient-primary">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">dashboard</i>
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Addquestion" className="nav-link text-white">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">table_view</i>
                                </div>
                                <span className="nav-link-text ms-1">Add Questions</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Salaryadvances" className="nav-link text-white">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">receipt_long</i>
                                </div>
                                <span className="nav-link-text ms-1">Salary Advances</span>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/Notification" className="nav-link text-white">
                                <div class="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i class="material-icons opacity-10">notifications</i>
                                </div>
                                <span class="nav-link-text ms-1">Notifications</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}
export default Left; 
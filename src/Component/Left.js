import React, { Component } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

class Left extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null,
            isSidenavOpen: false
        };
        this.toggleSidenav = this.toggleSidenav.bind(this);
    }
    toggleSidenav() {
        const { isSidenavOpen } = this.state;
        const className = 'g-sidenav-pinned'; // Replace with your actual class name
        const body = document.body;
        const sidenav = document.querySelector('.sidenav'); // Update selector if needed
        //const iconSidenav = document.querySelector('.icon-sidenav'); // Update selector if needed
    
        if (body.classList.contains(className)) {
          body.classList.remove(className);
          setTimeout(() => {
            sidenav.classList.remove('bg-white');
          }, 100);
          sidenav.classList.remove('bg-transparent');
        } else {
          body.classList.add(className);
          sidenav.classList.add('bg-white');
          sidenav.classList.remove('bg-transparent');
        //  iconSidenav.classList.remove('d-none');
        }
    
        // Update state to reflect the change
        this.setState({ isSidenavOpen: !isSidenavOpen });
      }
    componentDidMount = async () => {
        const clientjson = JSON.parse(sessionStorage.getItem('Userdetails'));
        this.setState({ status: clientjson[0].Status });
    };

    handleLogout = () => {
        sessionStorage.removeItem('Userdetails');
        window.location.href = '/interne.github.io';
    };

    render() {
        return (
            <>
                <div className="sidenav-header">
                    <i class="fas fa-times p-3 cursor-pointer text-white opacity-5 position-absolute end-0 top-0 d-xl-none" aria-hidden="true" id="iconSidenav" onClick={this.toggleSidenav}></i>
                    <a className="navbar-brand m-0" rel="noopener noreferrer">
                        <span className="ms-1 font-weight-bold text-white">Intern</span>
                    </a>
                </div>
                <hr className="horizontal light mt-0 mb-2" />
                <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                to="/Home"
                                className={({ isActive }) =>
                                    `nav-link text-white ${isActive ? 'bg-gradient-primary' : ''}`
                                }
                            >
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">dashboard</i>
                                </div>
                                <span className="nav-link-text ms-1">Dashboard</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/Addquestion"
                                className={({ isActive }) =>
                                    `nav-link text-white ${isActive ? 'bg-gradient-primary' : ''}`
                                }
                            >
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">table_view</i>
                                </div>
                                <span className="nav-link-text ms-1">Add Questions</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/Salaryadvances"
                                className={({ isActive }) =>
                                    `nav-link text-white ${isActive ? 'bg-gradient-primary' : ''}`
                                }
                            >
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">receipt_long</i>
                                </div>
                                <span className="nav-link-text ms-1">Salary Advances</span>
                            </NavLink>
                        </li>
                        {this.state.status === 0 && (
                            <>
                                <li className="nav-item">
                                    <NavLink
                                        to="/Incomeamount"
                                        className={({ isActive }) =>
                                            `nav-link text-white ${isActive ? 'bg-gradient-primary' : ''}`
                                        }
                                    >
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="material-icons opacity-10">account_balance</i>
                                        </div>
                                        <span className="nav-link-text ms-1">Incoming Amounts</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/Outcomeamount"
                                        className={({ isActive }) =>
                                            `nav-link text-white ${isActive ? 'bg-gradient-primary' : ''}`
                                        }
                                    >
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="material-icons opacity-10">format_textdirection_r_to_l</i>
                                        </div>
                                        <span className="nav-link-text ms-1">Outgoing Amounts</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/SalaryAmounts"
                                        className={({ isActive }) =>
                                            `nav-link text-white ${isActive ? 'bg-gradient-primary' : ''}`
                                        }
                                    >
                                        <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                            <i className="material-icons opacity-10">account_balance_wallet</i>
                                        </div>
                                        <span className="nav-link-text ms-1">Salary Amounts</span>
                                    </NavLink>
                                </li>
                            </>
                        )}
                        <li className="nav-item">
                            <NavLink
                                to="/Notification"
                                className={({ isActive }) =>
                                    `nav-link text-white ${isActive ? 'bg-gradient-primary' : ''}`
                                }
                            >
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">notifications</i>
                                </div>
                                <span className="nav-link-text ms-1">Notifications</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <a onClick={this.handleLogout} className="nav-link text-white" href="#">
                                <div className="text-white text-center me-2 d-flex align-items-center justify-content-center">
                                    <i className="material-icons opacity-10">login</i>
                                </div>
                                <span className="nav-link-text ms-1">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </>
        );
    }
}

export default Left;

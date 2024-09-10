import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: null,
      pageTitle: 'Dashboard',
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
  updatePageTitle = (title) => {
    this.setState({ pageTitle: title });
  }
  componentDidMount = async () => {
    var clientjson = JSON.parse(sessionStorage.getItem('Userdetails'))
    this.setState({ Username: clientjson[0].Username });
    const titles = {
      '/': 'Login',
      '/login': 'Login',
      '/Home': 'Home',
      '/Addquestion': 'Add Question',
      '/Salaryadvances': 'Salary Advances',
      '/Notification': 'Notification',
      '/Register': 'Register',
      '/Outcomeamount': 'Outgoing Amounts',
      '/Incomeamount': 'Incoming Amounts',
      '/SalaryAmounts': 'Salary Amounts'
    };
    this.setState({ pageTitle: titles[window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]] })
  }
  render() {
    return (
      <>
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
          <div className="container-fluid py-1 px-3">
            <nav aria-label="breadcrumb">
              {/* <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
                <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{this.state.pageTitle}</li>
              </ol> */}
            </nav>
            <div className="" id="navbar">
              <ul className="navbar-nav  justify-content-end float-end">
              <li class="nav-item d-xl-none ps-3 d-flex align-items-center" onClick={this.toggleSidenav} style={{"padding-right":"20px"}}> 
                      <a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
                        <div class="sidenav-toggler-inner">
                          <i class="sidenav-toggler-line"></i>
                          <i class="sidenav-toggler-line"></i>
                          <i class="sidenav-toggler-line"></i>
                        </div>
                      </a>
                    </li>
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


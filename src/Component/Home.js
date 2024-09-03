import React, { Component, useRef } from 'react';
import Left from './Left';
import { Link } from 'react-router-dom';
import MyChart from './MyChart';
import Footer from './Footer';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: null,
      income: [],
      outcome: [],
    };
  }
  componentDidMount = async () => {
    var clientjson = JSON.parse(sessionStorage.getItem('Userdetails'))
    this.setState({ status: clientjson[0].Status });
    const response = await fetch('https://node.lrnaveen.me/Incoming');
    const userincome = await response.json();
    this.setState({ income: userincome });
    const responseOutgoing = await fetch('https://node.lrnaveen.me/Outgoing');
    const useroutcome = await responseOutgoing.json();
    this.setState({ outcome: useroutcome });

  }
  calculateTotalIncome() {
    if (this.state.income && this.state.income.length > 0) {
      return this.state.income.reduce((total, user) => total + parseFloat(user.Amount || 0), 0).toFixed(2);
    }
    return '0';
  }
  calculateTotalOutcome() {
    if (this.state.outcome && this.state.outcome.length > 0) {
      return this.state.outcome.reduce((total, user) => total + parseFloat(user.Amount || 0), 0).toFixed(2);
    }
    return '0';
  }
  Remainingsalary() {
    if (this.state.outcome && this.state.outcome.length > 0 && this.state.income && this.state.income.length > 0) {
      return (this.state.income.reduce((total, user) => total + parseFloat(user.Amount || 0), 0).toFixed(2) - this.state.outcome.reduce((total, user) => total + parseFloat(user.Amount || 0), 0).toFixed(2));
    }
    return '0';
  }
  render() {
    return (
      <>
        <div className="container-fluid py-4">
          <div className="row">
            <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">person</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{this.state.status == "1" ? "Total Earnings" : "Total Income"}</p>
                    <h4 className="mb-0">{this.calculateTotalIncome()}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">person</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{this.state.status == "1" ? "Advance Taken" : "Total Outgoing"}</p>
                    <h4 className="mb-0">{this.calculateTotalOutcome()}</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-sm-6">
              <div className="card">
                <div className="card-header p-3 pt-2">
                  <div className="icon icon-lg icon-shape bg-gradient-info shadow-info text-center border-radius-xl mt-n4 position-absolute">
                    <i className="material-icons opacity-10">weekend</i>
                  </div>
                  <div className="text-end pt-1">
                    <p className="text-sm mb-0 text-capitalize">{this.state.status == "1" ? "Remaining Salary" : "Balance"}</p>
                    <h4 className="mb-0">{this.Remainingsalary()}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-lg-4 col-md-6 mt-4 mb-4">
              <div className="card z-index-2 ">
                {/* <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <div className="chart"> */}
                {/* <canvas id="chart-bars" className="chart-canvas" height="170"></canvas> */}
                {/* <MyChart /> */}
                {/* </div>
                    </div>
                  </div> */}
                <div className="card-body">
                  <h6 className="mb-0 ">Total Tasks</h6>
                  <p className="text-sm ">100</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mt-4 mb-4">
              <div className="card z-index-2  ">
                {/* <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                    <div className="bg-gradient-success shadow-success border-radius-lg py-3 pe-1">
                      <div className="chart">
                        {/* <canvas id="chart-line" className="chart-canvas" height="170"></canvas> */}
                {/* <MyChart /> */}
                {/*  </div>
                    </div>
                  </div> */}
                <div className="card-body">
                  <h6 className="mb-0 "> Pending Tasks </h6>
                  <p className="text-sm "> 20 </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-4 mb-3">
              <div className="card z-index-2 ">
                <div className="card-body">
                  <h6 className="mb-0 ">Completed Tasks</h6>
                  <p className="text-sm ">80</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-8 col-md-6 mb-md-0 mb-4">
              <div className="card">
                <div className="card-header pb-0">
                  <div className="row">
                    <div className="col-lg-6 col-7">
                      <h6>Users</h6>
                    </div>
                    <div className="col-lg-6 col-5 my-auto text-end">
                      <div className="dropdown float-lg-end pe-4">
                        <a className="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
                          <i className="fa fa-ellipsis-v text-secondary"></i>
                        </a>
                        <ul className="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
                          <li><a className="dropdown-item border-radius-md" href="javascript:;">Action</a></li>
                          <li><a className="dropdown-item border-radius-md" href="javascript:;">Another action</a></li>
                          <li><a className="dropdown-item border-radius-md" href="javascript:;">Something else here</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive">
                    <table className="table align-items-center mb-0">
                      <thead>
                        <tr>
                          <th className="text-secondary  text-center font-weight-bolder opacity-7">User Name</th>
                          <th className="text-secondary text-center font-weight-bolder opacity-7">Salaries</th>
                          <th className="text-center text-secondary text-center font-weight-bolder opacity-7">Completed Tasks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">Sam</span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold"> $14,000 </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">60%</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">Chaitu</span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold"> $11,000 </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">50%</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">Kanna</span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold"> $21,000 </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">40%</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">Mr</span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold"> $18,000 </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">30%</span>
                          </td>
                        </tr>
                        <tr>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">Kokila</span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold"> $19,000 </span>
                          </td>
                          <td className="align-middle text-center">
                            <span className="text-xs font-weight-bold">20%</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card h-100">
                <div className="card-header pb-0">
                  <h6>Orders overview</h6>
                  <p className="text-sm">
                    <i className="fa fa-arrow-up text-success" aria-hidden="true"></i>
                    <span className="font-weight-bold">24%</span> this month
                  </p>
                </div>
                <div className="card-body p-3">
                  <div className="timeline timeline-one-side">
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-icons text-success text-gradient">notifications</i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">$2400, Design changes</h6>
                        <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">22 DEC 7:20 PM</p>
                      </div>
                    </div>
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-icons text-danger text-gradient">code</i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">New order #1832412</h6>
                        <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">21 DEC 11 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

}


export default Home;


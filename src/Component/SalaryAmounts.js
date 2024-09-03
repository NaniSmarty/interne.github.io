import React, { Component } from 'react';
import { json } from 'react-router-dom';
class SalaryAmounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Subjects: '',
            Count: '',
            onex: '',
            onefourx: '',
            Email: null,
            Userid: null,
            userprofile: []
        };
    }
    componentDidMount = async () => {
        var clientjson = JSON.parse(sessionStorage.getItem('Userdetails'))
        this.setState({ Userid: clientjson[0].Userid });
        const response = await fetch('https://node.lrnaveen.me/salarydetails');
        const usersdet = await response.json();
        this.setState({ userprofile: usersdet });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        var Sucessres;
        const { Subjects, Count, onex, onefourx } = this.state;
        if (!Subjects && !Count && !onefourx && !onex) {
            alert('Please Fill All Details');
            return;
        }
        this.setState({ isLoading: true });
        const now = new Date().toISOString();
        Sucessres = await fetch('https://node.lrnaveen.me/salarydetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Subjects: Subjects,
                Count: Count,
                onex: onex,
                onefourx: onefourx
            })
        })
        try {
            if (Sucessres.ok) {
                const response = await fetch('https://node.lrnaveen.me/salarydetails');
                const usersdet = await response.json();
                this.setState({ userprofile: usersdet });
                this.setState({ Subjects: '' });
                this.setState({ Count: '' });
                this.setState({ onex: '' });
                this.setState({ onefourx: '' });
                alert("Sucessfully Added");
            }
            else { alert('Please Try Again'); }
        } catch (error) { alert('Error:'); } finally {
            this.setState({ isLoading: false });
        }
    };

    handleChange = (event) => {
        const newValue = event.target.value;
        if (/^\d*$/.test(newValue)) {
            this.setState({ Amount: newValue });
        }
    };
    calculateTotalAmount() {
        if (this.state.userprofile && this.state.userprofile.length > 0) {
            return this.state.userprofile.reduce((total, user) => total + parseFloat(user.Count || 0), 0).toFixed(2);
        }
        return '0'; // Default to zero if no data
    }
    calculateTotalAmountonex() {
        if (this.state.userprofile && this.state.userprofile.length > 0) {
            return this.state.userprofile.reduce((total, user) => total + parseFloat(user.onex || 0), 0).toFixed(2);
        }
        return '0'; // Default to zero if no data
    }
    calculateTotalAmountonefourx() {
        if (this.state.userprofile && this.state.userprofile.length > 0) {
            return this.state.userprofile.reduce((total, user) => total + parseFloat(user.onefourx || 0), 0).toFixed(2);
        }
        return '0'; // Default to zero if no data
    }
    handleChangermk = (event) => { this.setState({ Remarks: event.target.value }); };
    handleChangedesctxt = (event) => { this.setState({ Description: event.target.value }); };
    render() {
        return (
            <>
                <div className="container-fluid py-4  d-flex justify-content-center align-items-center">
                    <div className="row w-100">
                        <div className="col-xl-12 col-sm-6 mb-xl-0 mb-4 d-flex justify-content-center">
                            <div className="container py-4">
                                <div className="row justify-content-Left">
                                    <div className="col-md-8 col-lg-12">
                                        <div class="col-sm-12 d-flex ">
                                            <div className='input-group input-group-outline'>
                                                <div className="col-lg-2 mx-3">
                                                    <input
                                                        className="form-control"
                                                        value={this.state.Subjects}
                                                        onChange={this.handleChangedesctxt}
                                                        type="text"
                                                        placeholder="Subjects"
                                                    />
                                                </div>
                                                <div className="col-lg-2 mx-3">
                                                    <input
                                                        className="form-control"
                                                        value={this.state.Count}
                                                        onChange={this.handleChange}
                                                        type="text"
                                                        placeholder="Count"
                                                    />
                                                </div>
                                                <div className="col-lg-2 mx-3">
                                                    <input
                                                        className="form-control"
                                                        value={this.state.onex}
                                                        onChange={this.handleChange}
                                                        type="text"
                                                        placeholder="1X"
                                                    />
                                                </div>
                                                <div className="col-lg-2 mx-3">
                                                    <input
                                                        className="form-control"
                                                        value={this.state.onefourx}
                                                        onChange={this.handleChangermk}
                                                        type="text"
                                                        placeholder="1.4X"
                                                    />
                                                </div>
                                                <div className="col-lg-2">
                                                    <button
                                                        type="button"
                                                        className={`btn btn-info mx-2 ${this.state.isLoading ? 'disabled' : ''}`}
                                                        onClick={this.handleSubmit}                                                >
                                                        {this.state.isLoading ? (
                                                            <span>
                                                                <span className="spinner-border spinner-border-sm mr-3" role="status" aria-hidden="true"></span>
                                                                Please wait.....</span>
                                                        ) : (
                                                            'ADD'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row p-4">
                            <div class="col-12">
                                <div class="card my-4">
                                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                            <h6 class="text-white text-capitalize ps-3">Salary Amounts</h6>
                                        </div>
                                    </div>
                                    <div class="card-body px-0 pb-2">
                                        <div class="table-responsive p-0">
                                            <table class="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">S.NO</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Subjects</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Count</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">1X</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">1.4X</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.userprofile && this.state.userprofile.length > 0 ? (
                                                        <>
                                                            {this.state.userprofile.map((user, index) => (
                                                                <tr key={index}>
                                                                    <td className="align-middle text-center">
                                                                        <span className="text-secondary text-xs font-weight-bold">{index + 1}</span>
                                                                    </td>
                                                                    <td className="align-middle text-center">
                                                                        <span className="text-secondary text-xs font-weight-bold">{user.Subjects}</span>
                                                                    </td>
                                                                    <td className="align-middle text-center">
                                                                        <span className="text-secondary text-xs font-weight-bold">{user.Count}</span>
                                                                    </td>
                                                                    <td className="align-middle text-center">
                                                                        <span className="text-secondary text-xs font-weight-bold">{user.onex}</span>
                                                                    </td>
                                                                    <td className="align-middle text-center">
                                                                        <span className="text-secondary text-xs font-weight-bold">{user.onefourx}</span>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                            <tr className=" bg-gradient-primary shadow-primary border-radius-lg pt-2 pb-2 text-white text-center text-uppercase text-secondary font-weight-bolder opacity-9">
                                                                <td colSpan="1" class="text-white bg-gradient-primary text-center text-uppercase text-secondary font-weight-bolder opacity-9">
                                                                    <span>Total</span>
                                                                </td>
                                                                <td></td>
                                                                <td className="text-center text-white text-uppercase text-secondary font-weight-bolder opacity-9">
                                                                    <span>{this.calculateTotalAmount()}</span>
                                                                </td>
                                                                <td className="text-center text-white text-uppercase text-secondary font-weight-bolder opacity-9">
                                                                    <span>{this.calculateTotalAmountonex()}</span>
                                                                </td>
                                                                <td className="text-center text-white text-uppercase text-secondary font-weight-bolder opacity-9">
                                                                    <span>{this.calculateTotalAmountonefourx()}</span>
                                                                </td>
                                                            </tr>
                                                        </>
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4" className="text-center text-secondary text-xs font-weight-bold p-3 no-data-message">
                                                                NO DATA FOUND
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
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
export default SalaryAmounts;


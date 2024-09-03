import React, { Component } from 'react';
import { json } from 'react-router-dom';
class Outcomeamount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Amount: '',
            Description: '',
            Remarks: '',
            Email: null,
            Userid: null,
            userprofile: []
        };
    }
    componentDidMount = async () => {
        var clientjson = JSON.parse(sessionStorage.getItem('Userdetails'))
        this.setState({ Userid: clientjson[0].Userid });
        const response = await fetch('https://node.lrnaveen.me/Outgoing');
        const usersdet = await response.json();
        this.setState({ userprofile: usersdet });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        var Sucessres;
        const { Amount, Description, Remarks } = this.state;
        if (!Amount && !Description && !Remarks) {
            alert('Please Fill All Details');
            return;
        }
        this.setState({ isLoading: true });
        const now = new Date().toISOString();
        Sucessres = await fetch('https://node.lrnaveen.me/Outgoing', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Amount: Amount,
                Description: Description,
                Remarks: Remarks,
                Datetime: new Date().toISOString()
            })
        })
        try {
            if (Sucessres.ok) {
                const response = await fetch('https://node.lrnaveen.me/Outgoing');
                const usersdet = await response.json();
                this.setState({ userprofile: usersdet });
                this.setState({ Amount: '' });
                this.setState({ Description: '' });
                this.setState({ Remarks: '' });
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
            return this.state.userprofile.reduce((total, user) => total + parseFloat(user.Amount || 0), 0).toFixed(2);
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
                                                <div className="col-lg-3 mx-3">
                                                    <input
                                                        className="form-control"
                                                        value={this.state.Description}
                                                        onChange={this.handleChangedesctxt}
                                                        type="text"
                                                        placeholder="Description"
                                                    />
                                                </div>
                                                <div className="col-lg-3 mx-3">
                                                    <input
                                                        className="form-control"
                                                        value={this.state.Amount}
                                                        onChange={this.handleChange}
                                                        type="text"
                                                        placeholder="Amount"
                                                    />
                                                </div>
                                                <div className="col-lg-3 mx-3">
                                                    <input
                                                        className="form-control"
                                                        value={this.state.Remarks}
                                                        onChange={this.handleChangermk}
                                                        type="text"
                                                        placeholder="Remarks"
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
                                            <h6 class="text-white text-capitalize ps-3">Outgoing Amount</h6>
                                        </div>
                                    </div>
                                    <div class="card-body px-0 pb-2">
                                        <div class="table-responsive p-0">
                                            <table class="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">S.NO</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Description</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Amount</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Remarks</th>
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
                                                                        <span className="text-secondary text-xs font-weight-bold">{user.Description}</span>
                                                                    </td>
                                                                    <td className="align-middle text-center">
                                                                        <span className="text-secondary text-xs font-weight-bold">{user.Amount}</span>
                                                                    </td>
                                                                    <td className="align-middle text-center">
                                                                        <span className="text-secondary text-xs font-weight-bold">{user.Remarks}</span>
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
                                                                <td></td>
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
export default Outcomeamount;


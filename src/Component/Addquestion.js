import React, { Component } from 'react';
class Addquestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Amount: '',
            Email: null,
            Userid: null,
            userprofile: []
        };
    }
    componentDidMount = async () => {
        var clientjson = JSON.parse(sessionStorage.getItem('Userdetails'))
        this.setState({ Email: clientjson[0].Email });
        this.setState({ Userid: clientjson[0].Userid });
        const response = await fetch('https://node.lrnaveen.me/userdetails');
        const usersdet = await response.json();
        let userData = null;
        usersdet.forEach(obj => {
            if (obj[clientjson[0].Userid] !== undefined) {
                userData = obj[clientjson[0].Userid];
            }
        });
        this.setState({ userprofile: userData.Salarydetails });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        const { Amount } = this.state;
        if (!Amount) {
            alert('Please Enter Amount');
            return;
        }
        this.setState({ isLoading: true });
        const now = new Date().toISOString();
        const Sucessres = await fetch('https://node.lrnaveen.me/userdetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                [this.state.Userid]: {
                    Salarydetails: [...this.state.userprofile,
                    {
                        Emailid: this.state.Email,
                        Advanceamount: Amount,
                        Datetime: now,
                        Status: 0,
                        Approvedby: '-'
                    }
                    ]
                }
            })
        })
        try {
            if (true) {
                const response = await fetch('https://node.lrnaveen.me/userdetails');
                const usersdet = await response.json();
                let userData = null;
                usersdet.forEach(obj => {
                    if (obj[this.state.Userid] !== undefined) {
                        userData = obj[this.state.Userid];
                    }
                });
                this.setState({ userprofile: userData.Salarydetails });
                this.setState({ Amount: '' });
                alert("Sucess");
            }
            else {
                alert('Invalid credentials');
            }
        } catch (error) {
            alert('Error during login:');
        } finally {
            this.setState({ isLoading: false });
        }
    };
    render() {
        const handleChange = (event) => {
            const newValue = event.target.value;
            if (/^\d*$/.test(newValue)) {
                this.setState({ Amount: newValue });
            }
        };
        return (
            <>
                <div className="container-fluid py-4  d-flex justify-content-center align-items-center">
                    <div className="row w-100">
                        <div className="col-xl-12 col-sm-6 mb-xl-0 mb-4 d-flex justify-content-center">
                            {/* <form role="form" className="text-start bg-white p-3 rounded shadow-sm"> */}
                            <div className="container py-4">
                                <div className="row justify-content-Left">
                                    <div className="col-md-8 col-lg-12">
                                        <div class="col-sm-12 d-flex ">
                                            <div className='input-group input-group-outline'>
                                                <div className="col-lg-3 mx-4">
                                                    <input class="form-control " value={this.state.Email} onChange={handleChange} type="text" name="SearchString" placeholder="Email-ID"></input>
                                                </div><div className="col-lg-3 mx-4">
                                                    <input class="form-control" value={this.state.Amount} onChange={handleChange} type="text" name="SearchString" placeholder="Number of Questions"></input>
                                                </div> <div className="col-lg-4">
                                                <button
                                                        type="button"
                                                        className={`btn btn-info mx-2 ${this.state.isLoading ? 'disabled' : ''}`}
                                                        onClick={this.handleSubmit}                                                >
                                                        {this.state.isLoading ? (
                                                            <span>
                                                                <span className="spinner-border spinner-border-sm mr-3" role="status" aria-hidden="true"></span>
                                                                Please wait.....</span>
                                                        ) : (
                                                            'Request'
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <form className="form-inline"> */}
                                        {/* <div className="form-group me-2">
                                                    <label className="form-label">Email</label>
                                                </div>
                                                <div className="form-group me-2">
                                                    <input type="email" className="form-control" placeholder="Enter your email" />
                                                </div>
                                                <div className="form-group">
                                                    <button type="button" className="btn bg-gradient-primary">
                                                        Sign in
                                                    </button>
                                                </div> */}
                                        {/* </form> */}
                                    </div>
                                </div>
                            </div>
                            {/* </form> */}
                        </div>
                        <div class="row p-4">
                            <div class="col-12">
                                <div class="card my-4">
                                    <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                        <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                            <h6 class="text-white text-capitalize ps-3">Add Questions</h6>
                                        </div>
                                    </div>
                                    <div class="card-body px-0 pb-2">
                                        <div class="table-responsive p-0">
                                        <table class="table align-items-center mb-0">
                                                <thead>
                                                    <tr>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Email</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Advance Amount</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Date</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Status</th>
                                                        <th class="text-center text-uppercase text-secondary font-weight-bolder opacity-9">Approved By</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.userprofile && this.state.userprofile.length > 0 ? (
                                                        this.state.userprofile.map((user, index) => (
                                                            <tr key={index}>
                                                                <td className="align-middle text-center">
                                                                    <span className="text-secondary text-xs font-weight-bold">{user.Emailid}</span>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <span className="text-secondary text-xs font-weight-bold">{user.Advanceamount}</span>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <span className="text-secondary text-xs font-weight-bold">{user.Datetime}</span>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <span className={`badge badge-sm bg-gradient-${user.Status === 1 ? 'success' : 'success'}`}>
                                                                        Approved
                                                                    </span>
                                                                </td>
                                                                <td className="align-middle text-center">
                                                                    <span className="text-secondary text-xs font-weight-bold">{user.Approvedby}</span>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" className="text-center text-secondary text-xs font-weight-bold p-3" style={{ fontSize: '20px !important' }}>
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
export default Addquestion;


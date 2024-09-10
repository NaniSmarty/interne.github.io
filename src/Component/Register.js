import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Uname: null,
            Pwd: null,
            Email: null,
            Status: 1,
            Type: 1
        };
    }
    componentDidMount() { }

    handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const { navigate } = this.props;
            const { Uname, Pwd, Email } = this.state;
            if (!Uname || !Pwd || !Email) {
                alert("Please Fill Required Field");
                return;
            }
            this.setState({ isLoading: true });
            try {
                var userdet = (Math.floor(Math.random() * 900000) + 100000);
                const response = await fetch('https://node.lrnaveen.me/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        Username: Uname,
                        Password: Pwd,
                        Email: Email,
                        Type: this.state.Type,// 1 -agent 0-admin
                        Status: this.state.Status,//0-Active 1-block
                        Userid: userdet
                    })
                });
                if (response.ok) {
                    const Sucessres = await fetch('https://node.lrnaveen.me/userdetails', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            [userdet]: {
                                Salarydetails: [],
                                Addquestion: []
                            }
                        })
                    })  
                    if (Sucessres.ok) {
                        alert('Registration successful');
                        window.location.href = '/interne.github.io';
                    }
                    else { alert('Failed to register'); }
                } else { alert('Failed to register'); }
            } catch (error) {  }
        }
        catch (error) { }
        finally { this.setState({ isLoading: false }); }
    };
    getRandomFloat = (min, max) => {
        return Math.random() * (max - min) + min;
    }
    render() {

        const styles = {
            backgroundImage: "url('../interne.github.io/assets/img/illustrations/illustration-signup.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        };
        return (
            <>
                <main className="main-content  mt-0">
                    <div class="page-header min-vh-100">
                        <div class="container">
                            <div class="row">
                                <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                                    <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center" style={styles}>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                                    <div class="card card-plain">
                                        <div class="card-header">
                                            <h4 class="font-weight-bolder">Sign Up</h4>
                                            <p class="mb-0">Enter your email and password to register</p>
                                        </div>
                                        <div class="card-body">
                                            <form role="form">
                                                <div class="input-group input-group-outline mb-3">
                                                    <input type="text" class="form-control" placeholder='UserName' value={this.state.Uname} onChange={(e) => this.setState({ Uname: e.target.value })} required></input>
                                                </div>
                                                <div class="input-group input-group-outline mb-3">
                                                    <input type="email" class="form-control" value={this.state.Email} placeholder='E-mail' onChange={(e) => this.setState({ Email: e.target.value })} required></input>
                                                </div>
                                                <div class="input-group input-group-outline mb-3">
                                                    <input type="password" class="form-control" value={this.state.Pwd} placeholder='Password' onChange={(e) => this.setState({ Pwd: e.target.value })} required></input>
                                                </div>
                                                <div className="form-check form-switch d-flex align-items-center mb-3">
                                                    <input className="form-check-input" type="checkbox" id="rememberMe" checked />
                                                    <label className="form-check-label mb-0 ms-3" for="rememberMe">I agree to the Terms and Conditions</label>
                                                </div>
                                                <div class="text-center">
                                                    <button
                                                        type="button"
                                                        className={`btn bg-gradient-primary w-100 my-4 mb-2 ${this.state.isLoading ? 'disabled' : ''}`}
                                                        onClick={this.handleSubmit}>
                                                        {this.state.isLoading ? (<span><span className="spinner-border spinner-border-sm mr-3" role="status" aria-hidden="true"></span> Please wait.....</span>) : ('Sign UP')}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <div class="card-footer text-center pt-0 px-lg-2 px-1">
                                            <p class="mb-2 text-sm mx-auto">
                                                Already have an account ?
                                                <Link to="/Login" class="text-primary text-gradient font-weight-bold"> Sign in</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </>
        );
    }
}
export default Register;

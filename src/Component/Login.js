import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withNavigate from './withNavigate';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
      isLoading: false,
    };
  }

  handleInputChange = (event) => { const { name, value } = event.target; this.setState({ [name]: value }); };
  handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) { alert('Username and password are required'); return; }
    this.setState({ isLoading: true });
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();
      const user = users.find(u => u.Username === username && u.Password === password);
      const lfltuser = users.filter(user => user.Username === username);
      sessionStorage.setItem('Userdetails', JSON.stringify(lfltuser));
      if (user) { this.props.navigate('/Home'); }
      else { alert('Invalid credentials'); }
    }
    catch (error) { alert('Error during login'); }
    finally { this.setState({ isLoading: false }); }
  };

  render() {
    const headerStyle = { backgroundImage: "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh', display: 'flex', alignItems: 'start' };
    return (
      <main className="main-content mt-0">
        <div className="page-header align-items-start min-vh-100" style={headerStyle}>
          <span className="mask bg-gradient-dark opacity-6"></span>
          <div className="container my-auto">
            <div className="row">
              <div className="col-lg-4 col-md-8 col-12 mx-auto">
                <div className="card z-index-0 fadeIn3 fadeInBottom">
                  <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                      <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Login</h4>
                      <div className="row mt-3"></div>
                    </div>
                  </div>
                  <div className="card-body">
                    <form role="form" className="text-start">
                      <div className="input-group input-group-outline my-3">
                        <input type="text" placeholder='username' className="form-control" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} required />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <input type="password" id="password" placeholder="password" className="form-control" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} required />
                      </div>
                      <div className="form-check form-switch d-flex align-items-center mb-3">
                        <input className="form-check-input" type="checkbox" id="rememberMe" checked />
                        <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Remember me</label>
                      </div>
                      <div className="text-center">
                        <button
                          type="button"
                          className={`btn bg-gradient-primary w-100 my-4 mb-2 ${this.state.isLoading ? 'disabled' : ''}`}
                          onClick={this.handleSubmit}
                        >
                          {this.state.isLoading ? (<span><span className="spinner-border spinner-border-sm mr-3" role="status" aria-hidden="true"></span> Please wait.....</span>) : ('Sign in')}
                        </button>
                      </div>
                      <p className="mt-4 text-sm text-center">
                        Don't have an account ?
                        <Link to="/Register" className="text-primary text-gradient font-weight-bold"> Sign up</Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default withNavigate(Login);

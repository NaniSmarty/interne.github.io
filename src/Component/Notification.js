import React, { Component } from 'react';
import Left from './Left';
import Footer from './Footer';

class Notification extends Component {
  render() {
    return (      
        <main className="main-content position-relative flex-fill">
          <div className="container-fluid py-4">
            <div className="row">
              <div class="col-lg-12 col-md-10 mx-auto">
                <div class="card mt-4">
                  <div class="card-body p-3 pb-0">
                    <div class="alert alert-primary alert-dismissible text-white" role="alert">
                      <span class="text-sm">A simple primary alert with <a href="javascript:;" class="alert-link text-white">an example link</a>. Give it a click if you like.</span>
                      <button type="button" class="btn-close text-lg py-3 opacity-10" data-bs-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
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

export default Notification;

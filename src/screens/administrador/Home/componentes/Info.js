import React, { Component } from "react";
export default class Info extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-lg-3 col-md-3">
                    <center>
                        <h4 style={{ color: '#212121' }} className="display-1 mb-0">3</h4>
                        <h5 style={{ color: '#212121' }}>Usuários</h5>
                    </center>
                </div>
                <div className="col-lg-3 col-md-3">
                    <center>
                        <h4 style={{ color: '#212121' }} className="display-1 mb-0">3</h4>
                        <h4 style={{ color: '#212121' }} >Questões</h4>
                    </center>
                </div>
                <div className="col-lg-3 col-md-3">
                    <center>
                        <h4 style={{ color: '#212121' }} className="display-1 mb-0">3</h4>
                        <h4 style={{ color: '#212121' }}>Quizzes</h4>
                    </center>
                </div>
                <div className="col-lg-3 col-md-3">
                    <center>
                        <h4 style={{ color: '#212121' }} className="display-1 mb-0">3</h4>
                        <h4 style={{ color: '#212121' }}>Cifras</h4>
                    </center>
                </div>
            </div>
        );
    }
}





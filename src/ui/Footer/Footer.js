import React, { Component } from "react";
export default class Footer extends Component{
    render(){
        return(
            <footer className="footer has-cards mobile">
                <div className="container">
                    <hr/>
                    <div className="row align-items-center justify-content-md-between">
                        <div className="offset-md-3 col-md-6">
                            <div className="copyright">
                                <center>
                                    &copy; 2018 De$cifre - Todos os direitos reservados.
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}





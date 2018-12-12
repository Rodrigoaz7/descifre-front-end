import React, { Component } from "react";
import providerContadorHome from '../../../../providers/administrador/contadores/contadorHome';
import { browserHistory } from "react-router";

export default class Info extends Component {
    constructor(){
        
        super();
        this.state = {
            numeros:{
                qntdUsuarios: 0,
                qntdQuestao: 0,
                qntdRodada: 0,
                qntdTransacoes: 0,
                qntdRequisicoesSaque: 0
            }
        }
    }
    async componentDidMount(){
        const responseGetNumeros = await providerContadorHome.getNumerosHome();

        if(responseGetNumeros.data.status) {
            await this.setState({ numeros: responseGetNumeros.data.numeros});
        }

    }

    redirect = async(e) =>{
        browserHistory.push({
            pathname: '/administrador/cifras',
            state: { saque: true }
        })
        window.location.reload()
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-4 col-md-3">
                    <center>
                        <h4 style={{ color: '#212121' }} className="display-1 mb-0">
                            {this.state.numeros.qntdUsuarios}
                        </h4>
                        <h5 style={{ color: '#212121' }}>Usuários</h5>
                    </center>
                </div>
                <div className="col-lg-4 col-md-3">
                    <center>
                        <h4 style={{ color: '#212121' }} className="display-1 mb-0">
                            {this.state.numeros.qntdQuestao}
                        </h4>
                        <h4 style={{ color: '#212121' }} >Questões</h4>
                    </center>
                </div>
                <div className="col-lg-4 col-md-3">
                    <center>
                        <h4 style={{ color: '#212121' }} className="display-1 mb-0">
                            {this.state.numeros.qntdRodada}
                        </h4>
                        <h4 style={{ color: '#212121' }}>Rodadas</h4>
                    </center>
                </div>
                <div className="col-lg-6 col-md-3">
                    <center>
                        <h4 style={{ color: '#212121' }} className="display-1 mb-0">
                            {this.state.numeros.qntdTransacoes}
                        </h4>
                        <h4 style={{ color: '#212121' }}>Transações de cifras</h4>
                    </center>
                </div>
                <div className="col-lg-6 col-md-3">
                    <center onClick={this.redirect} style={{cursor: 'pointer'}}>
                        {
                            this.state.numeros.qntdRequisicoesSaque > 0 && 
                            <div>
                                <h4 style={{ color: 'red' }} className="display-1 mb-0">
                                    {this.state.numeros.qntdRequisicoesSaque}
                                </h4>
                                <h4 style={{ color: '#212121' }}>Requisições de saque   </h4>
                            </div>
                        }
                        {
                            this.state.numeros.qntdRequisicoesSaque == 0 &&
                            <div>
                                <h4 style={{ color: '#212121' }} className="display-1 mb-0">
                                    {this.state.numeros.qntdRequisicoesSaque}
                                </h4>
                                <h4 style={{ color: '#212121' }}>Requisições de saque   </h4>
                            </div>
                        }
                    </center>
                </div>
            </div>
        );
    }
}





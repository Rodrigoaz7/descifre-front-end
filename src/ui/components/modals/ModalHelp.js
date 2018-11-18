/*
*   Autor: Marcus Dantas
*/

import React, { Component } from "react";

export default class ModalHelp extends Component {
    constructor(props) {
        super();
        this.state = {
            nome: ''
        }
    }
    async componentDidMount(){
        await this.setState({
            nome: this.props.nome
        });
    }
    render() {
        return (
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Solução de dúvidas</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div className="modal-body">
                        {this.state.nome},<br />
                        <p style={{ textAlign: 'justify' }}>
                            Estamos aqui para explicar a você o funcionamento da rodada do De$cifre:
                                            <br />
                        </p>
                        <center>
                            <i style={{ fontSize: '2em' }} className="fas fa-lock-open"></i><br />
                        </center>

                        <p style={{ textAlign: 'justify' }}>
                            O cadeado aberto representa o horário de abertura da rodada. A partir desse horário
                            você já pode clicar em "Jogar agora"  e iniciar sua rodada.
                                        </p>

                        <center>
                            <i style={{ fontSize: '2em' }} className="fas fa-lock"></i><br />
                        </center>

                        <p style={{ textAlign: 'justify' }}>
                            O cadeado fechado representa o horário máximo que você pode entrar na rodada. Depois desse horário
                            a rodada será processada e você não poderá mais entrar nela.
                                        </p>

                        <center>
                            <i style={{ fontSize: '2em' }} className="fas fa-clock"></i><br />
                        </center>

                        <p style={{ textAlign: 'justify' }}>
                            O relógio representa quanto tempo você tem para responder as perguntas: quando você entrar na rodada você terá um minuto para responder o máximo de questões possíeis.
                                        </p>
                        <center><strong>Detalhes importantes</strong></center>
                        <p style={{ textAlign: 'justify' }}>
                            A prêmiação das rodadas padrões do De$cifre são distribuídas da seguinte forma:<br />
                            <strong>1º</strong> Lugar -> 5 cifras<br />
                            <strong>2º</strong> Lugar -> 3 cifras<br />
                            <strong>3º</strong> Lugar -> 2 cifras<br />
                            <strong>Em caso de empate o jogador que iniciou a rodada primeiro irá ganhar no critério de desempate.</strong>
                            <br />
                            <strong>O JOGO</strong><br />
                            Ao clicar em jogar agora o usuário terá 1 minuto para responder o máximo de perguntas que conseguir, ao final desse minuto ele não poderá mais responder perguntas
                            e so conseguirá ver a classificação dessa rodada.
                                        </p>

                    </div>

                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Sair</button>
                    </div>

                </div>
            </div>
        )
    }

}



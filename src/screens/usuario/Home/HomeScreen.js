/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerListarRodadasAbertas from '../../../providers/usuario/rodadas/obterRodadasInicio';
import utilUser from '../../../util/localStorage';
import providerCriarQuiz from '../../../providers/usuario/quiz/criarQuiz';
import { browserHistory } from "react-router/lib";
import Swal from 'sweetalert2';
import providerQuantidadeCifras from '../../../providers/usuario/cifras/quantidadeCifras';
import ModalHelp from '../../../ui/components/modals/ModalHelp';
export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            rodadas: [],
            idUsuario: '',
            carregando: false,
            nome: '',
            cifras: 0,
            modalRefresh: 0
        }
    }
    async componentDidMount() {
        document.title = "Home usuário - Bem vindo ao De$cifre.";
        const rodadasPost = await providerListarRodadasAbertas.listarRodadas();
        const requestCifras = await providerQuantidadeCifras.quantidadeCifras();
        const rodadas = rodadasPost.data.rodadas;
        let usuario = utilUser.getUser();
        await this.setState({
            rodadas: rodadas,
            idUsuario: usuario._id,
            nome: usuario.pessoa.nome,
            cifras: requestCifras.data.quantidadeCifras,
            modalRefresh: 1
        });
        console.log(this.state.rodadas)
        await this.setState({
            carregando: true
        });
    }
    handleClick = async (e) => {
        e.preventDefault();
        const idRodada = e.target.value;
        const usuario = utilUser.getUser();
        const requestCriarQuiz = await providerCriarQuiz.criarQuiz({ idRodada: idRodada, idUsuario: usuario._id });
        localStorage.setItem('idRodadaAtiva', idRodada);
        if (requestCriarQuiz.data !== undefined && requestCriarQuiz.data.status && !requestCriarQuiz.data.resultados) {
            localStorage.setItem('idQuizAtivo', requestCriarQuiz.data.idQuiz);

            if (requestCriarQuiz.data.valorTransacao !== undefined) {
                usuario.quantidade_cifras = parseFloat(usuario.quantidade_cifras) - parseFloat(requestCriarQuiz.data.valorTransacao);
                localStorage.setItem('descifre_userData', JSON.stringify(usuario));
            }
            if (localStorage.getItem('jogoDescifre') !== null) localStorage.removeItem('jogoDescifre');
            browserHistory.push('/usuario/jogo');
            window.scroll(0, -1);
        } else if (requestCriarQuiz.data !== undefined && requestCriarQuiz.data.status && requestCriarQuiz.data.resultados) {
            localStorage.setItem('resultadoQuiz', JSON.stringify(requestCriarQuiz.data.quiz.jogadas));
            localStorage.setItem('idRodadaEntrar', idRodada);
            browserHistory.push('/usuario/resultados');
        } else {
            Swal({
                type: 'error',
                title: 'Oops...',
                text: `${requestCriarQuiz.msg}`,
                footer: '<a href>Voltar para tela de rodadas</a>'
            });
            return;
        }
        /* Chamar provider de criação de jogo */
    }
    render() {
        return (
            <div className="position-relative alt">
                <section className="section section-shaped section-lg my-0">
                    <div className="shape shape-style-1 bg-gradient-default">
                        <span className="span-150"></span>
                        <span className="span-50"></span>
                        <span className="span-50"></span>
                        <span className="span-75"></span>
                        <span className="span-100"></span>
                        <span className="span-75"></span>
                        <span className="span-50"></span>
                        <span className="span-100"></span>
                        <span className="span-50"></span>
                        <span className="span-100"></span>
                        <span className="span-75"></span>
                        <span className="span-100"></span>
                        <span className="span-75"></span>
                        <span className="span-50"></span>
                        <span className="span-100"></span>
                        <span className="span-50"></span>
                    </div>
                    <div className="container-fluid pt-lg-md">
                        <div className="row justify-content-center">
                            <div className="modal" id="myModal">
                                <ModalHelp key={this.state.modalRefresh} nome={this.state.nome} />
                            </div>
                            {this.state.carregando && <div className="col-lg-12">
                                {
                                    this.state.rodadas.length === 0 &&
                                    <div>
                                        <div className="card bg-secondary shadow border-0">
                                            <div className="card-body px-lg-5 py-lg-5">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <center>
                                                            <img className="img-fluid" alt="Menino triste" src="/img/public/menino-triste.gif" />
                                                            <h4 style={{ color: '#212121' }}><br />
                                                                Não exite nenhuma rodada aberta.
                                                            </h4>
                                                        </center>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <br />
                                    </div>}
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="row">
                                            <div className="col-lg-5 col-5">

                                                <h2>
                                                    <center>
                                                        {this.state.cifras} <span style={{ fontSize: '12px' }}>cifras</span>
                                                    </center>
                                                </h2>

                                            </div>
                                            <div className="col-lg-2 col-2">
                                                <hr className="hr-vertical" />
                                            </div>
                                            <div className="col-lg-5 col-5">
                                                <button onClick={() => { browserHistory.push('/usuario/comprar/') }} type="button" className="btn btn-success btn-block btn-md" disabled={this.state.cifras < 150}>
                                                    sacar
                                                    </button>

                                            </div>

                                        </div>
                                    </div>
                                </div><br />
                                {
                                    this.state.rodadas.length > 0 &&
                                    this.state.rodadas.map((rodada, index) => {
                                        const dataAbertura = new Date(rodada.dataAbertura);
                                        const dataFinalizacao = new Date(rodada.dataFinalizacao);
                                        return (
                                            <div key={index}>
                                                <div className="card bg-secondary shadow border-0">
                                                    <div className="card-body px-lg-5 py-lg-5">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <center>
                                                                    <h4>
                                                                        {rodada.titulo.toUpperCase()}
                                                                    </h4>
                                                                </center>
                                                                <hr />
                                                                <center>
                                                                    <div className="row">
                                                                        <div className="col-4">
                                                                            <i style={{ fontSize: '2em' }} className="fas fa-lock-open"></i><br />
                                                                            {dataAbertura.toLocaleTimeString()}<br />
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <i style={{ fontSize: '2em' }} className="fas fa-clock"></i><br />
                                                                            {rodada.duracao} minuto
                                                                        </div>
                                                                        <div className="col-4">
                                                                            <i style={{ fontSize: '2em' }} className="fas fa-lock"></i><br />
                                                                            {dataFinalizacao.toLocaleTimeString()}
                                                                        </div>
                                                                    </div>

                                                                </center>
                                                                <hr />
                                                                <center>
                                                                    {rodada.pagamentoEmCifras &&
                                                                        <div className="row">
                                                                            <div className="col-lg-6 col-6">
                                                                                <i className="fas fa-money-bill-alt" style={{ color: "#81C784", fontSize: '2em' }}></i>
                                                                                <table>
                                                                                    <tbody>
                                                                                        {rodada.ganhadores.map((ganhador, index) => {
                                                                                            return (

                                                                                                <tr key={index}>
                                                                                                    <td>{index + 1}º</td>
                                                                                                    <td>{rodada.premiacao * ganhador.porcentagemPremio / 100 < 10 ? '0' : ''}{(rodada.premiacao * ganhador.porcentagemPremio / 100)} cifras</td>
                                                                                                </tr>
                                                                                            )
                                                                                        })}
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                            <div className="col-lg-6 col-6">
                                                                                <i className="fas fa-users" style={{ color: "#424242", fontSize: '2em' }}></i>
                                                                                <h4 style={{ color: '#525f7f', marginTop: '0.3em' }}>{rodada.jogadores.length}</h4>
                                                                                <center>JOGADORES</center>
                                                                            </div>

                                                                        </div>
                                                                    }
                                                                    {!rodada.pagamentoEmCifras &&
                                                                        <div className="row">
                                                                            <div className="col-lg-6 col-6">
                                                                                <i className="fas fa-ticket-alt" style={{ color: "#FDD835", fontSize: '2em' }}></i>
                                                                                <br/><h4 style={{ color: '#525f7f', marginTop: '1em' }}>{rodada.premioVoucher.toUpperCase()}</h4>
                                                                            </div>
                                                                            <div className="col-lg-6 col-6">
                                                                                <i className="fas fa-users" style={{ color: "#424242", fontSize: '2em' }}></i>
                                                                                <h4 style={{ color: '#525f7f', marginTop: '0.3em' }}>{rodada.jogadores.length}</h4>
                                                                                <center>JOGADORES</center>
                                                                            </div>

                                                                        </div>
                                                                    }

                                                                </center>
                                                                <hr />
                                                                <div className="row">
                                                                    <div className="col-lg-10 col-8">
                                                                        <button value={rodada._id} onClick={e => this.handleClick(e)} type="button" className="btn btn-success btn-block">
                                                                            Jogar agora<br />
                                                                            {rodada.taxa_entrada === 0 && <span>(Grátis)</span>}
                                                                            {rodada.taxa_entrada > 0 && <span>({rodada.taxa_entrada} Cifras)</span>}
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-lg-2 col-4">
                                                                        <button type="button" className="btn btn-secondary btn-block" data-toggle="modal" data-target="#myModal">
                                                                            <strong><span style={{ fontSize: '1.97em' }}>?</span></strong>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />
                                            </div>
                                        )
                                    })
                                }
                            </div>}
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
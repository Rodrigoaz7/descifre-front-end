/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import utilUser from '../../../util/localStorage';
import { browserHistory } from "react-router/lib";
import providerBuscarRodadasEmQuiz from '../../../providers/usuario/quiz/buscarRodadasEmQuiz';
import providerSolicitarTransacao from '../../../providers/administrador/transacoes/cadastrarTransacao';
import utilLocalStorage from '../../../util/localStorage';
import Erros from '../../../ui/components/erros';
import swal from 'sweetalert2';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            quantidadeSaque: 0.0,
            quantidadeCompra: 0,
            quantidadeCifras: 0,
            cifrasParaSaque: 0,
            senhaParaCompra: '',
            senhaParaSaque: '',
            botaoSacarIndisponivel: true,
            botaoComprarIndisponivel: true,
            errosSaque: [],
            errosCompra: []
        }
    }
    async componentDidMount() {
        document.title = "Compra de cifras - compre suas próprias cifras.";
    }

    handleCalculaCifras = async (e) => {
        let cifras = e.target.value;
        if (cifras === "" || parseFloat(cifras) <= 0) {
            this.setState({ quantidadeSaque: 0 , cifrasParaSaque: 0});
        } else {
            //posso chamar alguma funcao do back para calcular a quantidade de cifras, p.e 10
            this.setState({ quantidadeSaque: parseInt(parseFloat(cifras) * 10), cifrasParaSaque: parseInt(cifras) });
        }
    }

    handleDinheiro = async (e) => {
        let preco = e.target.value;
        this.setState({ quantidadeCompra: preco });
        this.setState({ quantidadeCifras: parseFloat(preco) * 10.0 });
    }

    handleSenhaSaque = async (e) => {
        let senha = e.target.value;
        if(senha !== ""){
            this.setState({botaoSacarIndisponivel: false, senhaParaSaque: senha});
        } else {
            this.setState({botaoSacarIndisponivel: true, senhaParaSaque: ""});
        }
    }

    handleSubmitCompra = async (e) => {
        e.preventDefault();
        // Aqui sera redirecionado para o pagseguro
    }

    handleSubmitSaque = async (e) => {
        e.preventDefault();

        let idUsuario = utilLocalStorage.getUser()._id;
        let token = utilLocalStorage.getToken();

        let data = {
            token: token,
            id_enviado_por: idUsuario,
            id_recebido_por: idUsuario,
            senha: this.state.senhaParaSaque,
            tipo: "saque",
            quantia_transferida: this.state.cifrasParaSaque
        }

        let response = await providerSolicitarTransacao.criarTransacoes(data);

        if (!response.status) {
            this.setState({ errosSaque: response.erros });
        } else {
            swal(
                'Solicitação de saque enviada!',
                'Analisaremos seu pedido em breve. Aguarde ;)',
                'success'
            ).then(() => {
                window.scrollTo(0, 0);
                //localStorage.setItem('descifre_tokenUsuario', JSON.stringify(postCadastro.data.token));
                //localStorage.setItem('descifre_userData', JSON.stringify(postCadastro.data.userInfor));

                browserHistory.push('/usuario/transacoes/');
                window.location.reload();
            });
        }
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
                            <div className="col-lg-12">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <center>
                                                    <h4>
                                                        Compre suas próprias cifras
                                                    </h4>
                                                </center>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-6">
                                                Escolha a plataforma de pagamento
                                                <select className="form-control">
                                                    <option>
                                                        Pagseguro
                                                    </option>
                                                </select>
                                            </div>
                                            <div className="col-lg-6">
                                                Valor da compra que você deseja pagar (em R$)
                                                <input type="text" className="form-control" onChange={this.handleDinheiro} />
                                                <br />
                                                {
                                                    this.state.quantidadeCifras > 0 &&
                                                    (
                                                        <center><h6>Esta quantidade resultará em {this.state.quantidadeCifras} cifras ! </h6>
                                                        </center>
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Continuar compra</button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <center>
                                                    <h4>
                                                        Ou solicite seu dinheiro
                                                    </h4>
                                                </center>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-lg-6">
                                                ATENÇÃO: Você possui {utilLocalStorage.getUser().quantidade_cifras} cifras
                                                <input type="number" className="form-control" onChange={this.handleCalculaCifras} />
                                            </div>
                                            <div className="col-lg-6">
                                                Quantidade que será recebida (em R$)
                                                <input type="text" className="form-control" readOnly value={this.state.quantidadeSaque} />
                                                <br />
                                            </div>
                                        </div>
                                        {this.state.cifrasParaSaque > 0 &&
                                            <div className="row justify-content-center">
                                                <div className="col-lg-6">
                                                    Informe sua senha, por segurança.
                                                <input type="password" class="form-control" onChange={this.handleSenhaSaque}/>
                                                </div>
                                            </div>
                                        }
                                        <br />
                                        <Erros erros={this.state.errosSaque} />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmitSaque} disabled={this.state.botaoSacarIndisponivel}>Solicitar saque</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
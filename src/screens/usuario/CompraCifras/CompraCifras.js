/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import utilUser from '../../../util/localStorage';
import Swal from 'sweetalert2';
import { browserHistory } from "react-router/lib";
import providerRealizarSaque from '../../../providers/usuario/transacoes/realizarSaque';
import providerCheckoutPagseguro from '../../../providers/usuario/pagseguro/obterCodigoCheckout';
import providerQuantCifras from '../../../providers/usuario/cifras/quantidadeCifras';
import utilLocalStorage from '../../../util/localStorage';
import Erros from '../../../ui/components/erros';
import variables from "../../../variables";
export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            cifrasUsuario: 0,
            quantidadeSaque: 0.0,
            quantidadeCompra: 0,
            quantidadeCifras: 0,
            cifrasParaSaque: 0,
            senhaParaCompra: '',
            senhaParaSaque: '',
            botaoSacarIndisponivel: true,
            botaoComprarIndisponivel: true,
            errosSaque: [],
            errosCompra: [],
            loading: false
        }
    }
    async componentDidMount() {
        document.title = "Compra de cifras - compre suas próprias cifras.";
        let quantCifras = await providerQuantCifras.quantidadeCifras();
        this.setState({cifrasUsuario: quantCifras.data.quantidadeCifras})
        
    }

    handleCalculaCifras = async (e) => {
        let cifras = e.target.value;
        if (cifras === "" || parseFloat(cifras) <= 0) {
            this.setState({ quantidadeSaque: 0 , cifrasParaSaque: 0});
        } else {
            //posso chamar alguma funcao do back para calcular a quantidade de cifras, p.e 10
            this.setState({ quantidadeSaque: (parseFloat(cifras) * 0.1).toFixed(2), cifrasParaSaque: parseFloat(cifras) });
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
        this.setState({loading: true})
        let usuario = utilUser.getUser();

        if (this.state.quantidadeCifras <= 0) {
            Swal({
                type: 'error',
                title: 'Oops...',
                text: 'Você deve comprar pelo menos uma cifra!',
                footer: '<a href>Voltar para página de compras</a>'
            });
            return;
        }

        let valorReal = parseFloat(this.state.quantidadeCifras)/10;
        let idUsuario = usuario._id;
        //let email = usuario.email;
        
        const requestCheckout = await providerCheckoutPagseguro.obterCodigoCheckout({preco:valorReal, idUsuario: idUsuario, quantidadeCifras: this.state.quantidadeCifras});
        if(requestCheckout.data.status) window.location.href= `${variables.pagseguroUrl}/v2/checkout/payment.html?code=${requestCheckout.data.checkout.code}`;
        
        // Aqui sera redirecionado para o pagseguro
    }

    handleSubmitSaque = async (e) => {
        e.preventDefault();

        let idUsuario = utilLocalStorage.getUser()._id;
        let token = utilLocalStorage.getToken();

        let data = {
            token: token,
            idUsuario: idUsuario,
            senha: this.state.senhaParaSaque,
            tipo: "saque",
            quantiaTransferida: this.state.cifrasParaSaque
        }

        let response = await providerRealizarSaque.processarSaque(data);

        if (!response.status) {
            let erros = '';
            response.erros.map(erro=>{
                erros += erro.msg + '\n'
                return null;
            });
            Swal("Erro ao processar saque", erros, "error");
        } else {
            Swal(
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
                                                    <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmitCompra} disabled={this.state.loading}>
                                                    { this.state.loading ? "Redirecionando para pagseguro..." : "Continuar compra" }</button>
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
                                                ATENÇÃO: Você possui {this.state.cifrasUsuario} cifras
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
                                                <input type="password" className="form-control" onChange={this.handleSenhaSaque}/>
                                                </div>
                                            </div>
                                        }
                                        <br />
                                        <div>
                                            <Erros erros={this.state.errosSaque}/>
                                        </div>
                                        
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
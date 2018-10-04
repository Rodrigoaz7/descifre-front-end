/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Swal from 'sweetalert2';
import {browserHistory} from "react-router/lib";

import providerCadastro from '../../../providers/public/autenticacao/providerCadastro';
import Erros from '../../../ui/components/erros';

export default class LoginScreen extends Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            senha: '',
            repetirSenha: '',
            termos: false,
            erros: []
        };
        this.erros = [];
    }

    componentDidMount() {
        document.title = "Cadastre-se - Tela de cadastro";
        
    }

    handleChange = async (event) => await this.setState({senha: event.target.value});
    
    handleRepetirSenhaChange = async (event) => await this.setState({repetirSenha: event.target.value});
    
    handleCheckBox = async () => await this.setState({termos: !this.state.termos});
   
    handleSubmit = async (e) => {
        e.preventDefault();
        await this.setState({nome: this.nome.value, email: this.email.value, senha: this.senha.value, repetirSenha: this.repetirSenha.value, erros:[]});

        if(!this.state.termos){
            Swal({
                type: 'error',
                title: 'Oops...',
                text: 'Para se cadastrar no De$cifre você precisa aceitar os nossos termos!',
                footer: '<a href>Voltar para página de cadastro</a>'
            });
            return;
        };

        const data = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            repetirSenha: this.state.repetirSenha,
            termos: this.state.termos
        };

        let postCadastro = await providerCadastro.realizarCadastro(data);
        this.erros = [];

        /* Caso ocorra algum erro */
        if(!postCadastro.status){
            if(postCadastro.code===11000){
                this.erros = [{msg:postCadastro.msg +"\nE-mail já utilizado para cadastro."}].slice();
            }else{
                this.erros = postCadastro.erros.slice();
            }
            await this.setState({ erros: this.erros });
            return;
        } 

        localStorage.setItem('descifre_tokenUsuario', JSON.stringify(postCadastro.data.token));
        localStorage.setItem('descifre_userData', JSON.stringify(postCadastro.data.usuario));

        postCadastro.data.usuario.permissoes.map((permissao, index) =>{
            if(permissao==="Administrador") browserHistory.push(`administrador/`);
            return false;
        });

        browserHistory.push(`/usuario/`);
    }

    render() {
        return (
            <div className="position-relative">
                <section  className="section section-shaped section-lg my-0">
                    <div  className="shape shape-style-1 bg-gradient-default">
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
                    <div className="container pt-lg-md altura-mobile">
                        <div className="row justify-content-center">
                            <div className="col-lg-5">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="text-muted text-center mb-3">
                                            <small>Junte-se a comunidade De$cifre agora</small>
                                        </div>
                                        <div className="form-group">
                                            <Erros erros={this.state.erros}/>
                                        </div>
                                        <form onSubmit={this.handleSubmit}>
                                            
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-hat-3"></i></span>
                                                    </div>
                                                     <input ref={input => this.nome = input} className="form-control" placeholder="Nome" type="text"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-email-83"></i></span>
                                                    </div>
                                                    <input ref={input => this.email = input} className="form-control" placeholder="E-mail" type="email"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                    </div>
                                                    <input className="form-control" placeholder="Senha" ref={input => this.senha = input} value={this.state.tamanhoSenha} onChange={this.handleChange} type="password"/>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group input-group-alternative">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text"><i className="ni ni-lock-circle-open"></i></span>
                                                    </div>
                                                    <input className="form-control" placeholder="Repita sua senha" ref={input => this.repetirSenha = input} value={this.state.tamanhoRepetirSenha} onChange={this.handleRepetirSenhaChange} type="password"/>
                                                </div>
                                            </div>
                                            <div className="text-muted font-italic">
                                                {this.state.senha.length>=1 && this.state.senha.length<=5 && <small>Qualidade da senha:
                                                        <span className="text-danger font-weight-700"> fraca</span>
                                                        </small>}
                                                {this.state.senha.length>5 && this.state.senha.length<=7 && <small>Qualidade da senha:
                                                    <span className="text-warning font-weight-700"> média</span>
                                                    </small>}
                                                {this.state.senha.length>7 && <small>Qualidade da senha:
                                                 <span className="text-success font-weight-700"> forte</span>
                                                </small>}
                                            </div>
                                            <div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-lg" role="document">
                                                    <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Política de privacidade</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <h2>Política de privacidade para <a href='http://www.descifre.com'>De$cifre</a></h2><p>Todas as suas informações pessoais recolhidas, serão usadas para o ajudar a tornar a sua visita no nosso site o mais produtiva e agradável possível.</p><p>A garantia da confidencialidade dos dados pessoais dos utilizadores do nosso site é importante para o De$cifre.</p><p>Todas as informações pessoais relativas a membros, assinantes, clientes ou visitantes que usem o De$cifre serão tratadas em concordância com a Lei da Proteção de Dados Pessoais de 26 de outubro de 1998 (Lei n.º 67/98).</p><p>A informação pessoal recolhida pode incluir o seu nome, e-mail, número de telefone e/ou telemóvel, morada, data de nascimento e/ou outros.</p><p>O uso do De$cifre pressupõe a aceitação deste Acordo de privacidade. A equipa do De$cifre reserva-se ao direito de alterar este acordo sem aviso prévio. Deste modo, recomendamos que consulte a nossa política de privacidade com regularidade de forma a estar sempre atualizado.</p><h2>Os anúncios</h2><p>Tal como outros websites, coletamos e utilizamos informação contida nos anúncios. A informação contida nos anúncios, inclui o seu endereço IP (Internet Protocol), o seu ISP (Internet Service Provider, como o Sapo, Clix, ou outro), o browser que utilizou ao visitar o nosso website (como o Internet Explorer ou o Firefox), o tempo da sua visita e que páginas visitou dentro do nosso website.</p><h2>Cookie DoubleClick Dart</h2><p>O Google, como fornecedor de terceiros, utiliza cookies para exibir anúncios no nosso website;</p><p>Com o cookie DART, o Google pode exibir anúncios com base nas visitas que o leitor fez a outros websites na Internet;</p><p>Os utilizadores podem desativar o cookie DART visitando a Política de <a href='http://politicaprivacidade.com/' title='privacidade da rede de conteúdo'>privacidade da rede de conteúdo</a> e dos anúncios do Google.</p><h2>Os Cookies e Web Beacons</h2><p>Utilizamos cookies para armazenar informação, tais como as suas preferências pessoas quando visita o nosso website. Isto poderá incluir um simples popup, ou uma ligação em vários serviços que providenciamos, tais como fóruns.</p><p>Em adição também utilizamos publicidade de terceiros no nosso website para suportar os custos de manutenção. Alguns destes publicitários, poderão utilizar tecnologias como os cookies e/ou web beacons quando publicitam no nosso website, o que fará com que esses publicitários (como o Google através do Google AdSense) também recebam a sua informação pessoal, como o endereço IP, o seu ISP, o seu browser, etc. Esta função é geralmente utilizada para geotargeting (mostrar publicidade de Lisboa apenas aos leitores oriundos de Lisboa por ex.) ou apresentar publicidade direcionada a um tipo de utilizador (como mostrar publicidade de restaurante a um utilizador que visita sites de culinária regularmente, por ex.).</p><p>Você detém o poder de desligar os seus cookies, nas opções do seu browser, ou efetuando alterações nas ferramentas de programas Anti-Virus, como o Norton Internet Security. No entanto, isso poderá alterar a forma como interage com o nosso website, ou outros websites. Isso poderá afetar ou não permitir que faça logins em programas, sites ou fóruns da nossa e de outras redes.</p><h2>Ligações a Sites de terceiros</h2><p>O De$cifre possui ligações para outros sites, os quais, a nosso ver, podem conter informações / ferramentas úteis para os nossos visitantes. A nossa política de privacidade não é aplicada a sites de terceiros, pelo que, caso visite outro site a partir do nosso deverá ler a politica de privacidade do mesmo.</p><p>Não nos responsabilizamos pela política de privacidade ou conteúdo presente nesses mesmos sites.</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-danger" data-dismiss="modal">Sair</button>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row my-4">
                                                <div className="col-12">
                                                    <div className="custom-control custom-control-alternative custom-checkbox">
                                                        <input onChange={this.handleCheckBox} className="custom-control-input" id="customCheckRegister" type="checkbox"/>
                                                        <label className="custom-control-label" htmlFor="customCheckRegister">
                                                            <span>Aceito os termos da 
                                                                <a href="" data-toggle="modal" data-target="#exampleModal"> Politica de privacidade</a>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-primary mt-4">Criar minha conta</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
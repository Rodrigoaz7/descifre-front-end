/*
*   Autor: Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';
import utilLocalStorage from '../../../../util/localStorage';
import providerPerfil from '../../../../providers/administrador/perfil/atualizarPerfil';
import swal from 'sweetalert2';
import { browserHistory } from "react-router";
import Erros from '../../../../ui/components/erros';
import variables from '../../../../variables';

export default class PerfilScreen extends Component {
    constructor() {
        super();
        this.state = {
            idUsuario: '',
            idPessoa: '',
            nome: '',
            email: '',
            contaBancaria: '',
            agencia: '',
            sexo: '',
            telefone: '',
            senha: '',
            repetirSenha: '',
            foto: '',
            fotoName: '',
            fotoInicial: '',
            permissoes: [],
            erros: []
        }
    }
    componentDidMount() {
        let usuario = utilLocalStorage.getUser();
        console.log(usuario)
        this.setState({
            idUsuario: usuario._id,
            idPessoa: usuario.pessoa._id,
            nome: usuario.pessoa.nome,
            email: usuario.email,
            conta: usuario.pessoa.conta,
            agencia: usuario.pessoa.agencia,
            sexo: usuario.pessoa.sexo,
            telefone: usuario.pessoa.telefone,
            permissoes: usuario.permissoes,
            fotoInicial: usuario.pessoa.foto
        });

        document.title = "Perfil - Tela de administração de$cifre.";
    }

    handlerFotoChange = (e) => {
        this.setState({ fotoName: e.target.files[0].name, foto: e.target.files[0] })
    }

    handlerNomeChange = async (e) => {
        this.setState({ nome: e.target.value })
    }

    handlerEmailChange = async (e) => {
        this.setState({ email: e.target.value })
    }

    handlerTelefoneChange = async (e) => {
        this.setState({ telefone: e.target.value })
    }

    handlerContaChange = async (e) => {
        this.setState({ conta: e.target.value })
    }

    handlerAgenciaChange = async (e) => {
        this.setState({ agencia: e.target.value })
    }

    handlerSexoChange = async (e) => {
        this.setState({ sexo: e.target.value })
    }

    handlerSenhaChange = async (e) => {
        this.setState({ senha: e.target.value })
    }

    handlerRepetirSenhaChange = async (e) => {
        this.setState({ repetirSenha: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        let usuario = utilLocalStorage.getUser();

        let data = {
            nome: this.state.nome,
            email: this.state.email,
            conta: this.state.conta,
            agencia: this.state.agencia,
            sexo: this.state.sexo,
            telefone: this.state.telefone,
            permissoes: usuario.permissoes,
            idUsuario: usuario._id,
            idPessoa: usuario.pessoa._id,
            senha: this.state.senha,
            repetirSenha: this.state.repetirSenha,
            dataEdicao: Date.now(),
            foto: this.state.foto,
            token: utilLocalStorage.getToken()
        };

        let postCadastro = await providerPerfil.realizarAtualizacao(data);
        console.log(postCadastro)
        if (!postCadastro.status) {
            this.setState({ erros: postCadastro.erros });
        } else {
            swal(
                'Perfil editado!',
                'Seu perfil foi editada com sucesso.',
                'success'
            ).then(() => {
                window.scrollTo(0, 0);
                localStorage.setItem('descifre_tokenUsuario', JSON.stringify(postCadastro.data.token));
                localStorage.setItem('descifre_userData', JSON.stringify(postCadastro.data.userInfor));

                browserHistory.push('/administrador/perfil');
                window.location.reload();
            });
        }
    }
    handlePermissao = (e) =>{
        e.preventDefault();
        let permissao = e.target.value==="Public" ? "usuario":e.target.value;
        browserHistory.push(`/${permissao}/`);
        window.location.reload();
    }
    render() {
        return (
            <div className="position-relative">
                <section className="section section-shaped section-lg my-0">
                    <div className="shape shape-style-1 bg-gradient-dark">
                    </div>
                    <form>
                        <div className="container pt-lg-md" style={{ marginTop: '20%' }}>
                            <div className="card card-profile shadow mt--300">
                                <div className="px-4">
                                    <div className="row justify-content-center">
                                        <div className="order-lg-1 col-lg-3 order-lg-2">
                                            <div className="card-profile-image">
                                                {this.state.fotoInicial !== '' && this.state.fotoInicial !== undefined  ? (
                                                    
                                                    <img src={`${variables.urlFoto}/imagem/${utilLocalStorage.getToken()}?tipo=usuario&id=${this.state.idPessoa}`} name="logomarca" className="img-fluid rounded-circle" style={{ width: '100%', marginTop: '-15%', boxShadow: '0 4px 10px 0' }} alt="imagem-perfil" />
                                                    
                                                ) :
                                                    <img src="/img/public/person.png" className="img-fluid rounded-circle" style={{ width: '100%', marginTop: '-15%', boxShadow: '0 4px 10px 0' }} alt="imagem-perfil" />
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                                            <div className="card-profile-actions py-4 mt-lg-0">
                                                {
                                                    this.state.permissoes.map((permissao, index) => {
                                                        return (<button onClick={this.handlePermissao} key={index} value={permissao} className="btn btn-sm btn-default mr-4 float-right">{permissao}</button>)
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="col-lg-4 order-lg-1 text-lg-right align-self-lg-center">
                                            <div className="card-profile-actions py-4 mt-lg-0" style={{float: 'left'}}>
                                                <button type="button" className="btn btn-sm btn-default mr-4 float-right">Você possui {utilLocalStorage.getUser().quantidade_cifras} cifras</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-5">
                                        <h3>Seus dados</h3>

                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Nome</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.nome} onChange={this.handlerNomeChange} />
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Email</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.email} onChange={this.handlerEmailChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row justify-content-center">
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <div className="row">
                                                        <div className="col-lg-9">
                                                            <center><small className="d-block text-uppercase font-weight-bold mb-3">Conta bancária</small></center>
                                                            <input type="text" className="form-control form-control-alternative" value={this.state.conta == null ? "" : this.state.conta} onChange={this.handlerContaChange} />
                                                        </div>
                                                        <div className="col-lg-3">
                                                            <center><small className="d-block text-uppercase font-weight-bold mb-3">Agência</small></center>
                                                            <input type="text" className="form-control form-control-alternative" value={this.state.agencia == null ? "" : this.state.agencia} onChange={this.handlerAgenciaChange} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Telefone</small></center>
                                                    <input type="text" className="form-control form-control-alternative" value={this.state.telefone == null ? "" : this.state.telefone} onChange={this.handlerTelefoneChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row justify-content-center">

                                            <div className="col-lg-2">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Masculino</small></center>
                                                <center><input type="radio" id="Masculino" name="sexo" value="Masculino" checked={this.state.sexo === "Masculino"} onClick={this.handlerSexoChange} /></center>
                                            </div>
                                            <div className="col-lg-2">
                                                <center><small className="d-block text-uppercase font-weight-bold mb-3">Feminino</small></center>
                                                <center><input type="radio" id="Feminino" name="sexo" value="Feminino" checked={this.state.sexo === "Feminino"} onClick={this.handlerSexoChange} /></center>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <label className="input-group-btn">
                                                            <span className="btn btn-primary">
                                                                Foto<input type="file" style={{ display: 'none' }} onChange={this.handlerFotoChange} />
                                                            </span>
                                                        </label>

                                                        <input type="text" className="form-control" value={this.state.fotoName} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Linha tamanho={8} />
                                        <h3>Alterar senha</h3>
                                        <Erros erros={this.state.erros} />
                                        <div className="row justify-content-center">

                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Nova senha</small></center>
                                                    <input type="password" className="form-control form-control-lg form-control-alternative" placeholder="Sua nova senha" onChange={this.handlerSenhaChange} />
                                                </div>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-group">
                                                    <center><small className="d-block text-uppercase font-weight-bold mb-3">Repetir senha</small></center>
                                                    <input type="password" className="form-control form-control-lg form-control-alternative" placeholder="Sua nova senha" onChange={this.handlerRepetirSenhaChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Linha tamanho={8} />
                                    <div className="row justify-content-center">
                                        <div className="col-lg-5">
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Alterar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        );
    }
}
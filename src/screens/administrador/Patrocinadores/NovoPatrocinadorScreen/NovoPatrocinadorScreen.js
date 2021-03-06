/*
*   Autor: Marcus Dantas e Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';
import toastr from "toastr";
import providerCadastro from '../../../../providers/administrador/patrocinadores/cadastroPatrocinador';
import providerListarRodadas from '../../../../providers/administrador/rodadas/listarRodada';
import Erros from '../../../../ui/components/erros';
import utilLocalStorage from '../../../../util/localStorage';

export default class NovoPatrocinadorScreen extends Component {

    constructor() {
        super();
        this.state = {
            rodadas: [],
            FileInputValue: '',
            logomarca: '',
            nome: '',
            email: '',
            telefone: '',
            tipo_patrocinador: '',
            rodadas_patrocinadas: [],
            quantia_paga: 0,
            erros:[]
        };
    }

    async componentDidMount() {
        document.title = "Adicionar novo patrocinador - Tela de administração de$cifre."
        let rodadas = await providerListarRodadas.listarRodadas("", "Aberto", "", "");
        await this.setState({ rodadas: rodadas.data.rodadas })
    }

    handleChange = (e) => {
        this.setState({ FileInputValue: e.target.files[0].name,  logomarca: e.target.files[0]})
    }

    handlerSubmit = async (e) => {
        e.preventDefault();
        let rodadas_a_patrocinar = [];
        let inputs_rodada = document.getElementsByName("rodadas");
        for(let i=0; i<inputs_rodada.length;i++){
            if (inputs_rodada[i].checked){
                rodadas_a_patrocinar.push(inputs_rodada[i].id);
            }
        }
        await this.setState({rodadas_patrocinadas: rodadas_a_patrocinar})
        let localizacao = this.localizacao.value;
        //let usuario = utilLocalStorage.getUser()
        let data = {
            nome: this.state.nome,
            email: this.state.email,
            telefone: this.state.telefone,
            tipo_patrocinador: this.state.tipo_patrocinador,
            quantia_paga: this.state.quantia_paga,
            rodadas_patrocinadas: this.state.rodadas_patrocinadas,
            logomarca: this.state.logomarca,
            localizacao: localizacao,
            token: utilLocalStorage.getToken()
        };

        let postCadastro = await providerCadastro.realizarCadastro(data);
        
        if (!postCadastro.status) {
            if(postCadastro.erros!==undefined){
                this.setState({ erros: postCadastro.erros });
            }else{
                this.setState({ erros: [{msg:postCadastro.msg},{msg:postCadastro.mensagemErro}] });
            }
            
        } else {
            toastr.success("Patrocinador adicionado com sucesso.", "Sucesso!");
            this.setState({
                // Alternativas da questão.
                FileInputValue: '',
                logomarca: '',
                nome: '',
                email: '',
                telefone: '',
                tipo_patrocinador: '',
                rodadas_patrocinadas: [],
                quantia_paga: 0
            });
            window.scrollTo(0, 0);
        }
    }

    handlerNome = async(e) => {
        await this.setState({nome: e.target.value})
    }

    handlerEmail = async(e) => {
        await this.setState({email: e.target.value})
    }

    handlerTelefone = async(e) => {
        await this.setState({telefone: e.target.value})
    }

    handlerQuantia = async(e) => {
        await this.setState({quantia_paga: e.target.value})
    }

    handlerTipo = async(e) => {
        await this.setState({tipo_patrocinador: e.target.value})
    }

    render() {
        return (
            <div className="position-relative alt">
                <section className="section section-shaped section-lg my-0">
                    <div className="shape shape-style-1 bg-gradient-dark">
                    </div>
                    <div className="container-fluid pt-lg-md">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="col-lg-1 col-lg-10">
                                            <h3 style={{ color: '#212121' }}>Adicionar um novo patrocinador</h3>
                                        </div>
                                        <Linha tamanho={10} />
                                        <form>  
                                            <Erros erros={this.state.erros}/>
                                            <div className="row">
                                                <div className="col-lg-10 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Nome do patrocinador" onChange={this.handlerNome}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-5 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Tipo de patrocinador" onChange={this.handlerTipo} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="form-group">
                                                        <div className="input-group">

                                                            <label className="input-group-btn">
                                                                <span className="btn btn-primary">
                                                                    Logo<input type="file" style={{ display: 'none' }} onChange={this.handleChange} />
                                                                </span>
                                                            </label>

                                                            <input type="text" className="form-control" value={this.state.FileInputValue} readOnly />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Linha tamanho={10} />
                                            <center><h4>Dados extras</h4></center>
                                            <br />
                                            <div className="row">
                                                <div className="col-lg-3 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Telefone de contato" onChange={this.handlerTelefone}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-md form-control-alternative" placeholder="Email de contato" onChange={this.handlerEmail}/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <input type="number" className="form-control form-control-md form-control-alternative" placeholder="Quantia paga" step="100" onChange={this.handlerQuantia}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="offset-lg-1 col-lg-10">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Localização do patrocinador" ref={input=>this.localizacao=input}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <center><h4>Rodadas Abertas</h4></center>
                                            <br />
                                            <div className="row justify-content-center">
                                                <div className="col-lg-5">
                                                    
                                                    <table className="table table-striped">
                                                        <tbody className="">
                                                            {this.state.rodadas.map((rodada, index) => {
                                                                return (
                                                                    <tr value={index} key={index}>
                                                                        <td>{rodada.titulo} ( Premiação de {rodada.premiacao} cifras)</td>
                                                                        <td>
                                                                            <input type="checkbox" name="rodadas" className="form-control" id={rodada._id}/>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <Linha tamanho={10} />
                                            <div className="row">
                                                <div className="offset-lg-1 col-lg-10">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <button className="btn btn-primary btn-block" type="submit" onClick={this.handlerSubmit}>Cadastrar</button>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <button className="btn btn-danger btn-block" type="submit">Cancelar</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        );
    }
}
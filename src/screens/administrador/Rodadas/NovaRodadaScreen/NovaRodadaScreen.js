/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Linha from "../../../../ui/components/linha";

const adicionarPremicao = (numeroParaPremiar) => {
    let usuarioPremiado = {
        porcentagemPremio: ""
    };
    let usuariosPremiados = [];
    for(let i =0; i < numeroParaPremiar; i++) usuariosPremiados.push(usuarioPremiado);
    return usuariosPremiados;
};

export default class NovaRodadaScreen extends Component {
    
    constructor() {
        super();
        this.state = {
            tempoParaResposta: 10,
            quantidadeUsuariosPremiados: []
        };
        this.numeroPremiados = null;
        this.usuariosPremiados = [];
    }

    componentDidMount() {
        document.title = "Adicionar nova rodada - Tela de administração de$cifre.";
        
    }

    handleTempo = async (input) => this.setState({tempoParaResposta:input.target.value});
    
    handleUsuariosPremiados = async () => {
        this.setState({quantidadeUsuariosPremiados: adicionarPremicao(this.numeroPremiados.value)});
        this.usuariosPremiados = adicionarPremicao(this.numeroPremiados.value);
    }
    
    handleValorPremiacao = async (input, index) => {
        let that = this.state;
        let premiados = that.quantidadeUsuariosPremiados;

        premiados[index].porcentagemPremio = input.target.value;
        this.setState({quantidadeUsuariosPremiados: premiados});
        
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
                                            <h3 style={{color: '#212121'}}>Nova rodada</h3>
                                        </div>
                                        <hr />
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-10 offset-lg-1">
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control form-control-lg form-control-alternative"  placeholder="Titulo da rodada"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <center>
                                                                <h3>Horários</h3>
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <Linha tamanho={8} />

                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <small className="d-block text-uppercase font-weight-bold mb-3">Data de abertura da rodada</small>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
                                                                    </div>
                                                                    <input className="form-control " placeholder="Select date" type="datetime-local"/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <small className="d-block text-uppercase font-weight-bold mb-3">Data de finalização da rodada</small>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                    <span className="input-group-text"><i className="ni ni-calendar-grid-58"></i></span>
                                                                    </div>
                                                                    <input className="form-control " placeholder="Select date" type="datetime-local"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <center>
                                                                <h3>Duração e premiação</h3>
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <Linha tamanho={8} />
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <small className="d-block text-uppercase font-weight-bold mb-3">Duração da rodada para o usuário</small>
                                                                </div>
                                                                <div className="col-lg-8">
                                                                
                                                                    <input id="rangeTempo" className="form-control " placeholder="Duração da rodada em min" 
                                                                    value={this.state.tempoParaResposta}
                                                                    onChange={input => this.handleTempo(input) }
                                                                    type="range" min="5" max="25"/>
                                                                </div>  
                                                                <div style={{padding: "10px"}} className="col-lg-4">
                                                                    <center>
                                                                        <span className="d-block text-uppercase font-weight-bold mb-3">{this.state.tempoParaResposta} minutos</span>
                                                                    </center>
                                                                </div>
                                                            </div>
                                                        </div>
                                                   
                                                        <div className="col-lg-6">
                                                            <small className="d-block text-uppercase font-weight-bold mb-3">Prêmiação: </small>
                                                            <input className="form-control " placeholder="Digite o valor do prêmio em cifras" type="number"/>  
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <center>
                                                                <h3>Configurações da premiação</h3>
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <Linha tamanho={8}/>
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <small className="d-block text-uppercase font-weight-bold mb-3">Usuarios que serão premiados: </small>
                                                            <input className="form-control " placeholder="Digite a quantidade de usuários que serão premiados" type="number"
                                                            ref={input => this.numeroPremiados = input}
                                                            onChange={()=>this.handleUsuariosPremiados()}
                                                            />  
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    {
                                                        this.state.quantidadeUsuariosPremiados.map((usuario, index) =>{
                                                            return(
                                                                <div key={index}>
                                                                    <Linha tamanho={6}/>
                                                                    <div className="row">
                                                                        <div className="col-lg-1">
                                                                            <h3 className="d-block text-uppercase font-weight-bold mb-3">{index+1}º </h3>
                                                                        </div>
                                                                        <div className="col-lg-11">
                                                                            <input className="form-control " placeholder="Porcentagem que o usuário irá receber"
                                                                            value={this.state.quantidadeUsuariosPremiados[index].porcentagemPremio}
                                                                            onChange={
                                                                                input => this.handleValorPremiacao(input, index)
                                                                            } 
                                                                            
                                                                            type="number"/> 
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <br/>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <button className="btn btn-success btn-block" type="button">Cadastrar </button>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <button className="btn btn-danger btn-block" type="button">Cancelar</button>
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
            </div>
                );
            }
}
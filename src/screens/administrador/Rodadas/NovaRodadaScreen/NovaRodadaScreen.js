/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Linha from "../../../../ui/components/linha";
import providerCadastrarRodada from '../../../../providers/administrador/rodadas/cadastroRodada';
import utilLocalStorage from '../../../../util/localStorage';
import Erros from '../../../../ui/components/erros';
import toastr from "toastr";

const adicionarPremicao = (numeroParaPremiar) => {
    let usuariosPremiados = [];
    for (let i = 0; i < numeroParaPremiar; i++) usuariosPremiados.push({ porcentagemPremio: "" });
    return usuariosPremiados;
};

export default class NovaRodadaScreen extends Component {

    constructor() {
        super();
        this.state = {
            tempoParaResposta: 10, // Tempo para usuários responderem.
            quantidadeUsuariosPremiados: [],  // Quantidade de usuários premiados.
            tituloRodada: '', // Titulo da rodada
            dataAbertura: '',
            dataFinalizacao: '',
            premiacao: '',
            taxa_entrada: '',
            premiacaoVoucher: false,
            premiacaoTextoVoucher: '',
            erros: [],
            emailPatrocinador:''
        };
        this.numeroPremiados = null; // Variavel para ajudar na adição dos inputs.
        this.usuariosPremiados = []; // Array de usuários premiados.
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    }
    clearForm = () => {
        this.setState({
            tempoParaResposta: 10, // Tempo para usuários responderem.
            quantidadeUsuariosPremiados: [],  // Quantidade de usuários premiados.
            tituloRodada: '', // Titulo da rodada
            dataAbertura: '',
            dataFinalizacao: '',
            premiacao: '',
            taxa_entrada: '',
            erros: [],
            premiacaoVoucher: false,
            premiacaoTextoVoucher: '',
            emailPatrocinador: ''

        });
        this.titulo.value = "";
        this.dataAbertura.value = "";
        this.dataFinalizacao.value = "";
        this.premiacao.value = 0;
        this.taxa_entrada.value = 0;
        this.numeroPremiados = null;
    }
    componentDidMount() {
        document.title = "Adicionar nova rodada - Tela de administração de$cifre.";

    }

    /*
    *   Handle que altera o valor do tempo do input.
    *   Autor: Marcus Dantas
    */
    handleTempo = async (input) => this.setState({ tempoParaResposta: input.target.value });

    /*
    *   Handle que cria os inputs de usuários premiados.
    *   Autor: Marcus Dantas
    */
    handleUsuariosPremiados = async () => {
        this.setState({ quantidadeUsuariosPremiados: adicionarPremicao(this.numeroPremiados.value) });
        this.usuariosPremiados = adicionarPremicao(this.numeroPremiados.value);
    }

    /*
    *   Handle que popula o valor do premio para os usuários.
    *   Autor: Marcus Dantas
    */
    handleValorPremiacao = async (input, index) => {
        let that = this.state;
        let premiados = that.quantidadeUsuariosPremiados;
        premiados[index].porcentagemPremio = input.target.value;
        this.setState({ quantidadeUsuariosPremiados: premiados });

    }
    handleSubmit = async (e) => {
        e.preventDefault();
        
        let premiacaoValor = this.premiacao!==null?parseFloat(this.premiacao.value):0;
        
        let premiacaoTextoVoucher = this.premiacaoTextoVoucher===undefined?"":this.premiacaoTextoVoucher.value;

        let emailPatrocinador = this.emailPatrocinador===undefined?"":this.emailPatrocinador.value;

        await this.setState({
            tituloRodada: String(this.titulo.value),
            dataAbertura: new Date(this.dataAbertura.value),
            dataFinalizacao: new Date(this.dataFinalizacao.value),
            premiacao: parseFloat(premiacaoValor),
            taxa_entrada: parseFloat(this.taxa_entrada.value),
            premiacaoVoucher: this.state.premiacaoVoucher,
            premiacaoTextoVoucher: premiacaoTextoVoucher,
            emailPatrocinador: emailPatrocinador
        });

        let data = {
            titulo: this.state.tituloRodada,
            dataAbertura: new Date(this.state.dataAbertura),
            dataFinalizacao: new Date(this.state.dataFinalizacao),
            duracao: this.state.tempoParaResposta,
            premiacao: this.state.premiacao,
            taxa_entrada: this.state.taxa_entrada,
            jogadores: [],
            ganhadores: this.state.quantidadeUsuariosPremiados.map((usuario, index) => {           if(this.state.premiacaoVoucher){
                    return { 
                        porcentagemPremio: parseInt(100, 10) 
                    } 
                }else{
                    return { 
                        porcentagemPremio: parseInt(usuario.porcentagemPremio, 10) 
                    } 
                }
            }),
            token: utilLocalStorage.getToken(),
            premiacaoVoucher: this.state.premiacaoVoucher,
            premiacaoTextoVoucher: this.state.premiacaoTextoVoucher,
            emailPatrocinador: this.state.emailPatrocinador
        };
        
        let response = await providerCadastrarRodada.realizarCadastro(data);
        if (!response.status) {
            await this.setState({ erros: [] });
            await this.setState({ erros: response.erros });
            window.scrollTo(0, 0);
            return;
        }
        toastr.success("Rodada criada com sucesso.", "Rodada cadastrada");
        this.clearForm();
        window.scrollTo(0, 0);
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
                                            <h3 style={{ color: '#212121' }}>Nova rodada</h3>
                                        </div>
                                        <hr />
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="col-lg-10 offset-lg-1">
                                                    <Erros erros={this.state.erros} />

                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control form-control-lg form-control-alternative" placeholder="Titulo da rodada"
                                                                    ref={input => this.titulo = input} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
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
                                                                    <input className="form-control" placeholder="Select date" type="datetime-local"
                                                                        ref={input => this.dataAbertura = input}
                                                                    />
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
                                                                    <input className="form-control" placeholder="Select date" type="datetime-local"
                                                                        ref={input => this.dataFinalizacao = input}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <center>
                                                                <h3>Duração</h3>
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <Linha tamanho={8} />

                                                    <div className="col-lg-12">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <small className="d-block text-uppercase font-weight-bold mb-3">Duração da rodada para o usuário</small>
                                                            </div>
                                                            <div className="col-lg-10">
                                                                <input id="rangeTempo" className="form-control " placeholder="Duração da rodada em min"
                                                                    value={this.state.tempoParaResposta}
                                                                    onChange={input => this.handleTempo(input)}
                                                                    type="range" min="1" max="25" />
                                                            </div>

                                                            <div style={{ padding: "10px" }} className="col-lg-2">
                                                                <center>
                                                                    <span className="d-block text-uppercase font-weight-bold mb-3">{this.state.tempoParaResposta} minutos</span>
                                                                </center>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br />
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <center>
                                                                <h3>Premiação e taxa de entrada</h3>
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <Linha tamanho={8} />
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <center>
                                                                <h4>Premiação em voucher: </h4>
                                                                <br/>
                                                                <label className="custom-toggle">
                                                                    <input type="checkbox"
                                                                    value={this.state.premiacaoVoucher}
                                                                    onChange={()=>{this.setState({premiacaoVoucher: !this.state.premiacaoVoucher})}}
                                                                    />
                                                                    <span className="custom-toggle-slider rounded-circle"></span>
                                                                </label>
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <Linha tamanho={8} />
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <small className="d-block text-uppercase font-weight-bold mb-3">Premiação: </small>
                                                            {   !this.state.premiacaoVoucher &&
                                                                <input className="form-control " placeholder="Digite o valor do prêmio em cifras" type="number"
                                                                step="0.01"
                                                                ref={input => this.premiacao = input} />
                                                            
                                                            }
                                                            {   this.state.premiacaoVoucher &&
                                                                <input className="form-control " placeholder="Descreva a premiação" type="text"
                                                                ref={input => this.premiacaoTextoVoucher = input} />
                                                            
                                                            }
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <small className="d-block text-uppercase font-weight-bold mb-3">Taxa de entrada: </small>
                                                            <input className="form-control " placeholder="Digite o valor da taxa de entrada em cifras" type="number"
                                                                step="0.01"
                                                                ref={input => this.taxa_entrada = input} />
                                                        </div>
                                                    </div>
                                                    <Linha tamanho={8} />
                                                    {
                                                    this.state.premiacaoVoucher &&
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <center>
                                                                    <h3>E-mail patrocinador</h3>
                                                                </center>
                                                                <br/>
                                                                <input className="form-control " placeholder="Digite o e-mail do patrocinador" type="email"
                                                                ref={input => this.emailPatrocinador = input} />
                                                            </div>
                                                        </div>
                                                        <Linha tamanho={8} />
                                                    </div>
                                                    }
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <center>
                                                                <h3>Configurações da premiação</h3>
                                                            </center>
                                                        </div>
                                                    </div>
                                                    <Linha tamanho={8} />
                                                    <div className="row">
                                                        <div className="col-lg-12">
                                                            <small className="d-block text-uppercase font-weight-bold mb-3">Usuarios que serão premiados: </small>
                                                            <input className="form-control " placeholder="Digite a quantidade de usuários que serão premiados" type="number"
                                                                ref={input => this.numeroPremiados = input}
                                                                onChange={() => this.handleUsuariosPremiados()}
                                                            />
                                                        </div>
                                                    </div>
                                                    <br />
                                                    {
                                                        !this.state.premiacaoVoucher &&
                                                        this.state.quantidadeUsuariosPremiados.map((usuario, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <Linha tamanho={6} />
                                                                    <div className="row">
                                                                        <div className="col-lg-1">
                                                                            <h3 className="d-block text-uppercase font-weight-bold mb-3">{index + 1}º </h3>
                                                                        </div>
                                                                        <div className="col-lg-11">
                                                                            <input className="form-control " placeholder="Porcentagem que o usuário irá receber"
                                                                                value={this.state.quantidadeUsuariosPremiados[index].porcentagemPremio}
                                                                                onChange={
                                                                                    input => this.handleValorPremiacao(input, index)
                                                                                }

                                                                                type="number" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    <br />
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <button type="submit" className="btn btn-success btn-block">Cadastrar </button>
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
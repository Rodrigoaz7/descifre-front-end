/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Select from 'react-select';
import toastr from "toastr";
import Linha from '../../../../ui/components/linha';

// Mock inicial para alternativas substituir por um state.
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

export default class NovaQuestaoScreen extends Component {

    constructor() {
        super();
        this.state = {
            // Alternativas da questão.
            alternativas:[{
                descricao: ""
            }],
            selectedOption: null, // Select da categoria
            categoria: '', // Nova categoria se for cadastada.
            estadoCategoria: false // Estado para select ou input de categoria.
        };
    }

    componentDidMount() {
        document.title = "Adicionar nova questão - Tela de administração de$cifre."
    }

    /*
    *   HandleChange de mudança do select da categoria.
    *   Autor: Marcus Dantas
    */
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    /*
    *   HandleChange para  mudar o valor da descrição da alternativa.
    *   Autor: Marcus Dantas
    */
    handleInputChange = async (input, index)=>{
        let that = this.state;
        let alternativas = that.alternativas;

        alternativas[index].descricao = input.target.value;
        this.setState({alternativas: alternativas});
    }

    /*
    *   Função para adicionar um novo input de alternativa.
    *   Autor: Marcus Dantas
    */
    adicionarAlternativa = async () => {
        let that = this.state;

        const novaAlternativa = {
            descricao: ""
        };
        
        let alternativas = [...that.alternativas, novaAlternativa];
        await this.setState({alternativas: alternativas});
    }

    /*
    *   Função para remover um input de alternativa.
    *   Autor: Marcus Dantas
    */
    removerAlternativa = async () => {
        let that = this.state;
        if(!that.alternativas) return;
        if(that.alternativas.length>1){
            that.alternativas.splice(that.alternativas.length-1,1);
        
            let alternativas = [...that.alternativas];
            await this.setState({alternativas: alternativas});
        }else{
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
            toastr.error("Você tem que ter pelo menos um campo para descrição de alternativas", "Erro de remoção");
            
        }
       
    }

    /*
    *   Função alterar o state da varivel que exibe o select ou adição de categoria.
    *   Autor: Marcus Dantas
    */
    mudarEstadoSelect = async () =>{
        await this.setState({estadoCategoria: !this.state.estadoCategoria});
    }

    render() {
        const { selectedOption } = this.state;
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
                                            <h3 style={{color: '#212121'}}>Adicionar uma nova questão</h3>
                                        </div>
                                        <hr />
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-10 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-lg form-control-alternative"  placeholder="Enunciado da questão"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="offset-lg-1 col-lg-8">
                                                    <div className="form-group">
                                                        {!this.state.estadoCategoria && <Select
                                                            value={selectedOption}
                                                            onChange={this.handleChange}
                                                            options={options}
                                                            placeholder="Selecione uma categoria"
                                                        />}
                                                        {this.state.estadoCategoria && 
                                                            <input type="text"
                                                            className="form-control form-control-lg form-control-alternative"  placeholder="Digite sua nova categoria"
                                                            />
                                                        }
                                                    </div>
                                                </div>
                                                <div className="col-lg-2">
                                                    {!this.state.estadoCategoria && 
                                                        <button onClick={()=>this.mudarEstadoSelect()} type="button" className="btn btn-success btn-sm btn-block"><i style={{fontSize: '28px'}} className="fa fa-plus-square" aria-hidden="true"></i></button>
                                                    }
                                                    {this.state.estadoCategoria && 
                                                        <button onClick={()=>this.mudarEstadoSelect()} type="button" className="btn btn-primary btn-lg btn-block"><i style={{fontSize: '28px'}} className="fa fa-search" aria-hidden="true"></i></button>
                                                    }
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <center>
                                                        <br/>
                                                        <span className="dark">Digite as alternativas possiveis para sua questão</span>
                                                    </center>
                                                    <div className="row">
                                                        <div className="offset-lg-2 col-lg-8">
                                                            <hr/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                this.state.alternativas.map((alternativa, index)=>{
                                                    return(
                                                        <div key={index} className="row">
                                                            <div className="col-lg-10 offset-lg-1">
                                                                <div className="form-group">
                                                                    <input type="text"
                                                                    value={this.state.alternativas[index].descricao || ''} className="form-control form-control-lg form-control-alternative"  placeholder="Digite sua alternativa"
                                                                    onChange={input => this.handleInputChange(input, index)}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <div className="row">
                                                <div className="offset-lg-9 col-lg-1">
                                                    <br/>
                                                    <div style={{float: "right"}}>
                                                        <button onClick={() => this.adicionarAlternativa()} type="button" className="btn btn-success">+</button>
                                                    </div>
                                                </div>
                                                <div className="col-lg-1">
                                                    <br/>
                                                    <div style={{float: "right"}}>
                                                        <button onClick={() => this.removerAlternativa()} type="button" className="btn btn-danger">-</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="offset-lg-2 col-lg-8">
                                                    <div className="row">
                                                        <div className="offset-lg-2 col-lg-8">
                                                            <hr/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <center>
                                                        <h3>Selecione a alternativa correta</h3>
                                                    </center>
                                                </div>
                                            </div>
                                            <Linha tamanho={8} />
                                            <div className="row">
                                                <div className="col-lg-10 offset-lg-1">
                                                    <div className="form-group">
                                                        <select className="form-control">
                                                            <option value="Nenhuma alternativa">Nenhuma alternativa</option>
                                                            {this.state.alternativas.map((alternativa,index)=>{
                                                                return(
                                                                    <option value={index} key={index}>{alternativa.descricao}</option>
                                                                )
                                                            })}          
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <Linha tamanho={8}/>
                                            <div className="row">
                                                <div className="offset-lg-1 col-lg-10">
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <button className="btn btn-primary btn-block" type="submit">Cadastrar</button>
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
            </div>
                );
            }
}
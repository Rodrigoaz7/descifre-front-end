/*
*   Autor: Marcus Dantas e Rodrigo Azevedo
*/
import React, { Component } from "react";
import Linha from '../../../../ui/components/linha';

const style_file_input = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '12%',
    opacity: '0',
    padding: '4px 0',
    cursor: 'pointer'
}
const style_file_input_label = {
  
    padding: '14px 25px',
    background:'#39D2B4',
    color: '#fff',
    fontSize: '1em',
    transition: 'all .4s',
    cursor: 'pointer'
}
const style_file_description = {
    margin: '0',
    fontStyle: 'italic',
    fontSize: '.9em',
    fontWeight: 'bold'
}

export default class NovoPatrocinadorScreen extends Component {

    constructor() {
        super();
        this.state = {
            value: ''
        };
    }

    componentDidMount() {
        document.title = "Adicionar novo patrocinador - Tela de administração de$cifre."
    }

    // handleChange (e) {
    //     console.log("asokdsodka")
        
    // }

    // handleClick () {
    //     this.handleChange(new Event)
    // }

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
                                            <h3 style={{ color: '#212121' }}>Adicionar um novo patrocinador</h3>
                                        </div>
                                        <Linha tamanho={10} />
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-10 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Nome do patrocinador" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-5 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Tipo de patrocinador" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="form-group">

                                                        <div class="input-group">
                                                            <label class="input-group-btn">
                                                                <span class="btn btn-primary">
                                                                    Logo<input type="file" style={{ display: 'none'}} multiple onClick={this.handleClick}/>
                                                                </span>
                                                            </label>
                                                            {/* <input type="text" class="form-control" value={this.state.value} readonly onChange={(e) => {this.handleChange}} /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <Linha tamanho={10} />
                                            <center><h4>Dados extras</h4></center>
                                            <br />
                                            <div className="row">
                                                <div className="col-lg-5 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Telefone de contato" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-md form-control-alternative" placeholder="Email de contato" />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-lg-5 offset-lg-1">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control form-control-md form-control-alternative" placeholder="Tipo de patrocínio" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-md form-control-alternative" placeholder="Quantia paga" />
                                                    </div>
                                                </div>
                                            </div>
                                            <Linha tamanho={10}/>
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
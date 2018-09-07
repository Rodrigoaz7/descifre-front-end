/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Select from 'react-select';

import providerListarQuestoes from "../../../../providers/administrador/questoes/listarQuestoes";
import providerDeleteQuestoes from "../../../../providers/administrador/questoes/deletarQuestao";
import jsonutil from "../../../../util/jsonFormat";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];
export default class VerQuestoesScreen extends Component {

    constructor() {
        super();

        this.state = {
            selectedOption: null,
            questoes: [],
            categorias: []
        };
    }

    /*
    *   Função para alterar o valor do select de categorias.
    *   Autor: Marcus Dantas
    */
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    handleClickDelete = (e) => {
        // Faltando ainda modal para confirmação da remoção
        providerDeleteQuestoes.DeleteQuestoes(e.target.id);
    }

    async componentDidMount() {
        const resultado_questoes = await providerListarQuestoes.getQuestoes();
        let categorias_formatado = jsonutil.mutationArrayJson(resultado_questoes.data.categorias, ['_id', 'nome'], ['value', 'label']);
        this.setState({ 
            questoes: resultado_questoes.data.questoes, 
            categorias: categorias_formatado
        });
        console.log(this.state.questoes);
        document.title = "Ver questões - Tela de administração de$cifre."
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
                                            <h3 style={{ color: '#212121' }}>Pesquisar questões</h3>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <Select
                                                        value={selectedOption}
                                                        onChange={this.handleChange}
                                                        options={this.state.categorias}
                                                        placeholder="Selecione uma categoria"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="offset-lg-2 col-lg-8">
                                                <div className="form-group">
                                                    <hr />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <div className="table-responsive">
                                                        <table className="table table-bordered">
                                                            <thead>
                                                                <tr>
                                                                    <th>Enunciado</th>
                                                                    <th>Categoria</th>
                                                                    <th>Cadastrado por</th>
                                                                    <th>Editar</th>
                                                                    <th>Apagar</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {this.state.questoes.map((q,index) =>
                                                                    <tr key={index}>
                                                                        <td style={{ maxWidth: '100px' }}>
                                                                            {q.enunciado}
                                                                        </td>

                                                                        <td>{q.categoria.nome}</td>
                                                                        <td>{q.usuario}</td>

                                                                        <td><center><button className="btn btn-primary" type="button" id={q._id}>editar</button></center></td>

                                                                        <td><center><button className="btn btn-danger" type="button" id={q._id} onClick={this.handleClickDelete}>apagar</button></center></td>
                                                                    </tr>
                                                                )}

                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
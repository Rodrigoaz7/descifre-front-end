/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Select from 'react-select';

import providerListarQuestoes from "../../../../providers/administrador/questoes/listarQuestoes";
import providerDeleteQuestoes from "../../../../providers/administrador/questoes/deletarQuestao";
import jsonutil from "../../../../util/jsonFormat";
import Erros from '../../../../ui/components/erros';
import swal from 'sweetalert2';
import providerListarCategorias from '../../../../providers/administrador/questoes/obterCategorias';
import providerQuantidadeQuestoes from '../../../../providers/administrador/questoes/numeroQuestoes';
import { browserHistory } from "react-router";
import Pagination from "react-ultimate-pagination-bootstrap-4";

export default class VerQuestoesScreen extends Component {

    constructor() {
        super();

        this.state = {
            selectedOption: "",
            questoes: [],
            categorias: [],
            erros: [],
            pagina: 1,
            total: 0
        };
    }

    /*
    *   Função para alterar o valor do select de categorias.
    *   Autor: Marcus Dantas
    */
    handleChange = async (selectedOption) => {
        this.setState({ selectedOption, pagina: 1 });
        const resultado_questoes = await providerListarQuestoes.getQuestoes(selectedOption.value, 1);
        this.setState({ questoes: resultado_questoes.data.questoes });
        const quantidade_questoes = await providerQuantidadeQuestoes.numeroQuestoes(selectedOption.value);
        this.setState({total: quantidade_questoes.data.quantidadeQuestoes})
    }

    handleClickDelete = async (e) => {
        // Faltando ainda modal para confirmação da remoção
        const id = e.target.id;

        swal({
            title: 'Você tem certeza?',
            text: "Se você clicar em sim irá apagar permanentemente essa questão e terar que cadastra-la novamente.",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, quero deletar!',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.value) {
                const resultDelete = await providerDeleteQuestoes.DeleteQuestoes(id);
                if (!resultDelete.status) {
                    if (resultDelete.erros === undefined) {
                        this.erros = [{ msg: resultDelete.msg }];
                    } else {
                        this.erros = resultDelete.erros;
                    }

                    this.setState({ erros: this.erros });
                    return;
                }
                const resultado_questoes = await providerListarQuestoes.getQuestoes();
                this.setState({ questoes: resultado_questoes.data.questoes });
                swal(
                    'Deletada!',
                    'Sua questão foi deletada.',
                    'success'
                )
            }
        });
    }

    handleClickEdit = async (e) => {
        //Armazenando questao clicada em localStorage
        const id_obj = e.target.id;
        let questao = null;
        for (var i = 0; i < this.state.questoes.length; i++) {
            if (String(this.state.questoes[i]._id) === String(id_obj)) questao = this.state.questoes[i];
        }
        browserHistory.push({
            pathname: '/administrador/questoes/editar',
            state: { data: questao }
        })
        window.location.reload()
    }

    handlePageChange = async (pageNumber) => {
        let resultado_questoes = [];
        await this.setState({ pagina: pageNumber });
        if (this.state.selectedOption === "") {
            resultado_questoes = await providerListarQuestoes.getQuestoes("", this.state.pagina);
        } else {
            resultado_questoes = await providerListarQuestoes.getQuestoes(this.state.selectedOption.value, this.state.pagina);
        }
        await this.setState({ questoes: resultado_questoes.data.questoes })
    }

    async componentDidMount() {
        const resultado_questoes = await providerListarQuestoes.getQuestoes("", 1);
        const categorias = await providerListarCategorias.getCategorias();
        const total = await providerQuantidadeQuestoes.numeroQuestoes("");

        let categorias_formatado = jsonutil.mutationArrayJson(categorias.data.categorias, ['_id', 'nome'], ['value', 'label']);

        await this.setState({
            questoes: resultado_questoes.data.questoes,
            categorias: categorias_formatado,
            total: total.data.quantidadeQuestoes
        });

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
                                                <div className="form-group" style={{ height: '40vh' }}>
                                                    <Select
                                                        value={selectedOption}
                                                        onChange={this.handleChange}
                                                        options={this.state.categorias}
                                                        placeholder="Selecione uma categoria"
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="offset-lg-2 col-lg-8">
                                                    <div className="form-group">
                                                        <hr />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {this.state.questoes.length === 0
                                            &&
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <center>
                                                        <h1 style={{ color: '#212121', fontSize: '15px' }}>
                                                            Não existem questões cadastradas.
                                                        </h1>
                                                    </center>
                                                </div>
                                            </div>
                                        }

                                        {this.state.questoes.length > 0 &&
                                            <div style={{ marginTop: '-200px' }}>
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
                                                                        <Erros erros={this.state.erros} />

                                                                        {this.state.questoes.map((q, index) =>
                                                                            <tr key={index}>
                                                                                <td style={{ maxWidth: '100px' }}>
                                                                                    {q.enunciado}
                                                                                </td>

                                                                                <td>{q.categoria.nome}</td>
                                                                                <td>{q.usuario.email}</td>

                                                                                <td><center><button onClick={this.handleClickEdit} className="btn btn-primary" type="button" id={q._id} >editar</button></center></td>

                                                                                <td><center><button onClick={this.handleClickDelete} className="btn btn-danger" type="button" id={q._id}>apagar</button></center></td>
                                                                            </tr>
                                                                        )}

                                                                    </tbody>
                                                                </table>
                                                                <div className="row justify-content-center">

                                                                    <Pagination
                                                                        currentPage = {this.state.pagina}
                                                                        totalPages = {this.state.total}
                                                                        onChange={this.handlePageChange}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

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
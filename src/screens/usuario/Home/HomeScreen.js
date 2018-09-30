/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerListarRodadasAbertas from '../../../providers/usuario/rodadas/obterRodadasInicio';
import utilUser from '../../../util/localStorage';
import providerCriarQuiz from '../../../providers/usuario/quiz/criarQuiz';
import {browserHistory} from "react-router/lib";
import Swal from 'sweetalert2';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            rodadas: [],
            idUsuario: '',
            carregando: false
        }
    }
    async componentDidMount() {
        document.title = "Home usuário - Bem vindo ao De$cifre.";
        const rodadasPost = await providerListarRodadasAbertas.listarRodadas();
        const rodadas = rodadasPost.data.rodadas;
        let usuario = utilUser.getUser();
        
        await this.setState({
            rodadas: rodadas,
            idUsuario: usuario._id
        });
        await this.setState({
            carregando: true
        });
    }
    handleClick = async (e) => {
        e.preventDefault();
        const idRodada = e.target.value;
        const usuario = utilUser.getUser();
        console.log(usuario)
        const requestCriarQuiz = await providerCriarQuiz.criarQuiz({idRodada: idRodada, idUsuario: usuario._id});
       
        if(requestCriarQuiz.data!==undefined && requestCriarQuiz.data.status && !requestCriarQuiz.data.resultados){
            localStorage.setItem('idQuizAtivo', requestCriarQuiz.data.idQuiz);
            if(localStorage.getItem('jogoDescifre')!== null) localStorage.removeItem('jogoDescifre');
            browserHistory.push('/usuario/jogo');
            window.scroll(0,-1);
        } else if(requestCriarQuiz.data!==undefined && requestCriarQuiz.data.status && requestCriarQuiz.data.resultados){
            localStorage.setItem('resultadoQuiz',JSON.stringify(requestCriarQuiz.data.quiz.jogadas));
            localStorage.setItem('idRodadaEntrar', idRodada);
            browserHistory.push('/usuario/resultados');
        }else{
            Swal({
                type: 'error',
                title: 'Oops...',
                text: `${requestCriarQuiz.msg}`,
                footer: '<a href>Voltar para tela de rodadas</a>'
            });
            return;
        }
        /* Chamar provider de criação de jogo */
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
                                {
                                    !this.state.carregando &&
                                    this.state.rodadas.length===0 &&
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <center>
                                                    <img className="img-fluid" alt="Menino triste" src="/img/public/menino-triste.gif"/>
                                                    <h4 style={{color: '#212121'}}><br/>
                                                        Não exite nenhuma rodada aberta.
                                                    </h4>
                                                </center>
                                            </div>
                                        </div>
                                    </div>}
                                    {
                                    
                                    this.state.rodadas.length>0 &&
                                    this.state.rodadas.map((rodada, index)=>{
                                        const dataAbertura = new Date(rodada.dataAbertura);
                                        const dataFinalizacao = new Date(rodada.dataFinalizacao);
                                        return(
                                            <div key={index}>
                                                <div className="card bg-secondary shadow border-0">
                                                    <div  className="card-body px-lg-5 py-lg-5">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <center>
                                                                    <h4>
                                                                        {rodada.titulo.toUpperCase()}
                                                                    </h4>
                                                                </center>
                                                                <center>
                                                                    Abertura: {dataAbertura.toLocaleString()}<br/>
                                                                    Finalização: {dataFinalizacao.toLocaleString()}
                                                                </center>
                                                                <hr/>
                                                                <center>
                                                                    <h4 style={{color:'green'}}>
                                                                        {rodada.premiacao} CIFRAS
                                                                    </h4>
                                                                </center>
                                                                <hr/>
                                                                <button value={rodada._id} onClick={e=>this.handleClick(e)} type="button" className="btn btn-success btn-block">
                                                                    Jogar agora<br/>
                                                                    {rodada.taxa_entrada===0 && <span>(Grátis)</span>}
                                                                    {rodada.taxa_entrada>0 && <span>({rodada.taxa_entrada} Cifras)</span>}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        )
                                    })
                                    }
                                    
                                </div>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                            </div>
                    </div>
                </section>
            </div>
        );
    }
}
/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Apresentacao from './Componentes/Apresentacao';
import Descricao from './Componentes/Descricao';
import Slide from "./Componentes/Slide";
import utilJson from '../../../util/jsonFormat';

export default class TelaInicial extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    componentDidMount() {
        document.title = "De$cifre - Ganhe cifras que podem ser trocadas por dinheiro";
        
    }
    render() {
        return (
            <div className="position-relative">
                <Apresentacao/>
                <Descricao/>
                <Slide/>
            </div>
        );
    }
}
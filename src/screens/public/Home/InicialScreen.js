/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import Apresentacao from './Componentes/Apresentacao';
import Descricao from './Componentes/Descricao';
import Slide from "./Componentes/Slide";

export default class TelaInicial extends Component {
    constructor() {
        document.title = "De$cifre - Ganhe cifras que podem ser trocadas por dinheiro";
        super();
        this.state = {
            
        }
    }
    componentDidMount() {
        
        
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
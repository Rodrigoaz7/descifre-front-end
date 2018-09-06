/*
*   Autor: Marcus Dantas
*/

import React, { Component } from "react";

export default class BotaoErros extends Component {
    constructor(props){
        super(); 
    }
    render(){
        return(
            <button type={this.props.tipo} className={this.props.classeBotao}>
                {!this.props.carregando && this.props.nome}
                {this.props.carregando && this.props.nomeCarregando}
            </button>
        )
    }
    
}



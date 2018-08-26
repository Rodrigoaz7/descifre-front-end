/*
*   Autor: Marcus Dantas
*/

import React, { Component } from "react";

export default class NovaRodadaScreen extends Component {
    constructor(props){
        super();
    }

    render(){
        const tamanhoOffset = parseInt((12 - this.props.tamanho)/2, 10);
        const configLinha = `offset-lg-${tamanhoOffset} col-lg-${this.props.tamanho}`
        return(
            <div className="row">
                <div className={configLinha}>
                    <hr />
                </div>
            </div>
        )
    }
    
}
/*
*   Autor: Marcus Dantas
*/

import React, { Component } from "react";

export default class Erros extends Component {
    constructor(props){
        super(); 
    }
    render(){
        const objErro = (props)=>{
            return (
                <div  className="alert alert-warning alert-dismissible fade show" role="alert">
                    <span className="alert-inner--text">{props}</span>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            );
        }
        return(
            this.props.erros.map((erro, index)=>{
                return(
                    <div key={index}>
                        <span style={{display: 'none'}}>{erro.msg}</span>
                        {objErro(erro.msg)}
                    </div>
                )
            })
        )
    }
    
}



/*
*   Autor: Marcus Dantas
*/

import React, { Component } from "react";
import style from './circuloPontos.css';
export default class CirculoPontos extends Component {
    constructor(props){
        super(); 
        this.state ={
            pontos: props.pontos,
            color: '#bbb'
        }
    }
    async componentDidMount(){
        let cor = "#bbb";
        if(this.state.pontos<=0) cor = '#B71C1C';
        else if(this.state.pontos>=0 && this.state.pontos<=15) cor = '#3F51B5';
        else if(this.state.pontos>15 && this.state.pontos<=22) cor = '#4DB6AC';
        else if(this.state.pontos>22) cor = '#2E7D32';
        await this.setState({
            color:cor
        });
    }
    render(){
        return(
            <div style={style}>
                <span style={{backgroundColor:`${this.state.color}`}} className="dot">
                    <div style={{padding:'0.3em'}}>
                        {this.state.pontos<100 &&
                            <span style={{fontWeight:'900', color:'#ffffff', fontSize:'1.5em'}}>{this.state.pontos}</span>
                        }
                        {this.state.pontos>100 &&
                            <span style={{fontWeight:'900', color:'#ffffff', fontSize:'1em'}}>{this.state.pontos}</span>
                        }
                    </div>
                </span>
            </div>
            
        )
    }
    
}



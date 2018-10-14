import React, { Component } from "react";
import { Link } from "react-router";
export default class MenuNavPublic extends Component{
    constructor(){
        super();
        this.state = {
            width: 768
        }
    }
    async componentDidMount(){
        await this.setState({
            width: window.innerWidth
        });
        window.addEventListener("resize", async ()=>{
            await this.setState({
                width: window.innerWidth
            });
        })
    }
    render(){
        return(
            
            <ul className="navbar-nav align-items-lg-center ml-lg-auto" data-toggle="collapse" data-target={this.state.width>990 ?"" :"#navbar_global"} aria-controls="navbar_global" aria-expanded="false" aria-label="Toggle navigation" role="button">
                <li className="nav-item" >
                    <Link to='/' className="nav-link" >
                        <span className="nav-link-inner--text">Início</span>
                    
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/cadastro' className="nav-link">Cadastrar-se</Link>
                </li>
                <li className="nav-item">
                    <Link to='/usuario/login' className="nav-link">Entrar</Link>
                </li>
            </ul>
        );
    }
}
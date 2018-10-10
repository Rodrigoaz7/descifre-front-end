import React, { Component } from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from "recharts";
import providerContadorHome from '../../../../providers/administrador/contadores/contadorHome';

export default class SimpleLineChart extends Component {
    constructor(){
        super();

        this.state = {
            contadorUsuariosSemana: [],
            contadorCifrasSemana: [],
            data: []
        }
    }

    async componentDidMount(){
        const responseGetNumeros = await providerContadorHome.getNumerosHome();

        if(responseGetNumeros.data.status) {
            await this.setState({ contadorUsuariosSemana: responseGetNumeros.data.numeros.contadorUsuariosSemana});
            await this.setState({ contadorCifrasSemana: responseGetNumeros.data.numeros.contadorCifrasSemana});
        }

        await this.setState({ 
            data:
            [
                {name: 'Domingo', usuarios: this.state.contadorUsuariosSemana[0], cifras: this.state.contadorCifrasSemana[0], amt: 2400},
                {name: 'Segunda', usuarios: this.state.contadorUsuariosSemana[1], cifras: this.state.contadorCifrasSemana[1], amt: 2210},
                {name: 'Terça', usuarios: this.state.contadorUsuariosSemana[2], cifras: this.state.contadorCifrasSemana[2], amt: 2290},
                {name: 'Quarta', usuarios: this.state.contadorUsuariosSemana[3], cifras: this.state.contadorCifrasSemana[3], amt: 2000},
                {name: 'Quinta', usuarios: this.state.contadorUsuariosSemana[4], cifras: this.state.contadorCifrasSemana[4], amt: 2181},
                {name: 'Sexta', usuarios: this.state.contadorUsuariosSemana[5], cifras: this.state.contadorCifrasSemana[5], amt: 2500},
                {name: 'Sábado', usuarios: this.state.contadorUsuariosSemana[6], cifras: this.state.contadorCifrasSemana[6], amt: 2100}
            ]
        })
    }

    render () {
        return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart width={600} height={300} data={this.state.data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="usuarios" name="Usuários" stroke="#212121" activeDot={{r: 8}} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="cifras" name="Cifras" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
            </LineChart>
        </ResponsiveContainer>
      );
    }
}
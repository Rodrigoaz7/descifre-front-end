/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerVerificarVoucher from '../../../providers/patrocinador/voucher/verificarVoucher';
import providerAtivarVoucher from '../../../providers/patrocinador/voucher/ativarVoucher';
import providerGetVoucher from '../../../providers/patrocinador/voucher/getVouchers';
import Erros from '../../../ui/components/erros';
import Swal from 'sweetalert2';
export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            codigo: '',
            erros: [],
            reloadErros: 0,
            vouchers: []
        }
    }
    async componentDidMount() {
        document.title = "Patrocinador - Tela de verificação de vouchers.";
        const requestVouchers = await providerGetVoucher.obterVouchers();
        await this.setState({
            vouchers: requestVouchers.data.vouchers
        });
        console.log(this.state.vouchers)
    }
    submitForm = async (e) => {
        e.preventDefault();
        await this.setState({
            codigo: this.codigo.value,
            erros: [],
            reloadErros: 0
        });
        const requestVerificarVoucher = await providerVerificarVoucher.realizarVerificao(this.state.codigo);
        if (requestVerificarVoucher.status) {

            const swalWithBootstrapButtons = Swal.mixin({
                confirmButtonClass: 'btn btn-success',
                cancelButtonClass: 'btn btn-danger',
                buttonsStyling: false,
            })

            swalWithBootstrapButtons({
                title: 'Você tem certeza que quer ativar esse voucher?',
                text: `Esse voucher vale: ${requestVerificarVoucher.data.voucher.premio}`,
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim, Ativar o voucher!',
                cancelButtonText: 'Não, cancelar!',
                reverseButtons: true
            }).then(async (result) => {
                if (result.value) {
                    const idVoucher = requestVerificarVoucher.data.voucher._id;
                    const requestAtivarVoucher = await providerAtivarVoucher.realizarAtivacao({ idVoucher: idVoucher });
                    if (requestAtivarVoucher.data.status) {
                        swalWithBootstrapButtons(
                            'Ativado!',
                            'O voucher do usuário foi ativado com sucesso.',
                            'success'
                        )
                    } else {
                        Swal({
                            type: 'error',
                            title: 'Oops...',
                            text: `${requestAtivarVoucher.data.msg}`,
                        })
                    }
                    await this.setState({
                        codigo: ''
                    })
                    this.codigo.value = ''
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons(
                        'Nenhuma operação realizada',
                        'Esse voucher não foi ativado, pode ficar tranquilo :)',
                        'error'
                    )
                }
            })
        } else if (requestVerificarVoucher.erros !== undefined) {
            await this.setState({
                erros: requestVerificarVoucher.erros,
                reloadErros: this.state.reloadErros + 1
            });
        }
    }
    render() {
        return (
            <div className="position-relative alt">
                <section className="section section-shaped section-lg my-0">
                    <div className="shape shape-style-1 bg-gradient-gray-dark">
                    </div>
                    <div className="container-fluid pt-lg-md">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="card bg-secondary shadow border-0">
                                    <div className="card-body px-lg-5 py-lg-5">
                                        <center>
                                            <i style={{ fontSize: '8em' }} className="fas fa-ticket-alt"></i>
                                            <h1 style={{ fontSize: '2.5em' }}>VERIFICAÇÃO DE VOUCHERS</h1><br />
                                        </center>
                                        <hr />
                                        <Erros erros={this.state.erros} key={this.state.reloadErros} />
                                        <form onSubmit={this.submitForm}>
                                            <div className="form-group">
                                                <div className="input-group mb-4">
                                                    <input className="form-control" placeholder="Digite o seu código do voucher aqui." type="text" ref={input => this.codigo = input} required={true} />
                                                    <div className="input-group-append">
                                                        <button className="input-group-text btn btn-primary" type="submit">
                                                            <i className="ni ni-zoom-split-in"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <hr/>
                                        <center><h4>VOUCHERS DISTRIBUÍDOS</h4></center>
                                        <br/>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">#</th>
                                                                <th scope="col">
                                                                    <center>
                                                                        Prêmio
                                                                    </center>
                                                                </th>
                                                                <th scope="col">
                                                                    <center>
                                                                        Código
                                                                    </center>
                                                                </th>
                                                                <th scope="col">
                                                                    <center>
                                                                        Nome
                                                                    </center>
                                                                </th>
                                                                <th scope="col">
                                                                    <center>
                                                                        E-mail
                                                                    </center>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                this.state.vouchers.map((voucher, index)=>{
                                                                    return(
                                                                        <tr key={index}>
                                                                            <th scope="row">{index+1}</th>
                                                                            <td>
                                                                                <center>
                                                                                    {voucher.premio}
                                                                                </center>
                                                                            </td>
                                                                            <td>
                                                                                <center>
                                                                                    {voucher.codigoVoucher}
                                                                                </center>
                                                                            </td>
                                                                            <td>
                                                                                <center>
                                                                                    {voucher.usuario===undefined?'Sem ganhador até o momento':voucher.usuario.pessoa.nome}
                                                                                </center>
                                                                            </td>
                                                                            <td>
                                                                                <center>
                                                                                    {voucher.usuario===undefined?'Sem ganhador até o momento':voucher.usuario.pessoa.email}
                                                                                </center>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
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
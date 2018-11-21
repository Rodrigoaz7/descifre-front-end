/*
*   Autor: Marcus Dantas
*/
import React, { Component } from "react";
import providerVoucher from '../../../providers/usuario/voucher/obterVouchers';
import PatrocinadorRodada from '../../../ui/components/patrocinadorRodada';

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            vouchers: []
        }
    }
    async componentDidMount() {
        document.title = "Vouchers do usuário - Rodos os vouchers do usuário.";
        const responseVouchers = await providerVoucher.obterVoucher();
        await this.setState({
            vouchers: responseVouchers.data.vouchersUsuario===undefined?[]:responseVouchers.data.vouchersUsuario
        });
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
                                    this.state.vouchers.length === 0 &&
                                    <div className="card bg-secondary shadow border-0">
                                        <div className="card-body px-lg-5 py-lg-5">
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <center>
                                                        <h4 style={{ color: '#212121' }}><br />
                                                            Você não tem nenhum voucher.
                                                        </h4>
                                                    </center>
                                                </div>
                                            </div>
                                        </div>
                                    </div>}
                                {

                                    this.state.vouchers.length > 0 &&
                                    this.state.vouchers.reverse().map((voucher, index) => {
                                        return (
                                            <div key={index}>
                                                <div className="card bg-secondary shadow border-0">
                                                    <div className="card-body px-lg-5 py-lg-5">
                                                        <div className="row">
                                                            <div className="col-lg-12">
                                                                <div className="offset-lg-2 col-lg-8">
                                                                    <PatrocinadorRodada idRodada={voucher.rodada}/>
                                                                </div>
                                                                <hr/>
                                                                <h4>
                                                                    <center>
                                                                        {voucher.premio}
                                                                    </center>
                                                                </h4>
                                                                <hr />
                                                                <h4>
                                                                    <center>
                                                                        Código voucher: {voucher.codigoVoucher}
                                                                    </center>
                                                                </h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />
                                            </div>
                                        )
                                    })
                                }

                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
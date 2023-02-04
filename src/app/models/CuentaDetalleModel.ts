import { IModel } from "./Interfaces/IModel";

export class CuentaDetalleModel implements IModel {

    id: any = 0;
    idUser: any = '';
    idSucursal: any = 0;
    idClienteNegotis: any = '';
    idCliente: any = 0;
    numero: any = '';
    plaza: any = '';
    banco: any = '';
    fechaEmision: any = '';
    fechaVencimiento: any = '';
    librador: any = '';
    cuit: any = '';
    cuenta: any = '';
    importe: any = 0;

    demoraDeposito: any = 0;
    ajusteDeposito: any = 0;
    tasa: any = 0;
    ajusteTasa: any = 0;
    impBancario: any = 0;
    ajusteImpBancario: any = 0;

    demoraDepositoVenta: any = 0;
    ajusteDepositoVenta: any = 0;
    tasaVenta: any = 0;
    ajusteTasaVenta: any = 0;
    impBancarioVenta: any = 0;
    ajusteImpBancarioVenta: any = 0;

    destino: any = '';
    idEstadoCompra: any = '';
    idEstadoVenta: any = '';
    fechaIngresoValor: any = '';
    fechaEgresoValor: any = '';
    fechaIngresoEfectivo: any = '';
    fechaEgresoEfectivo: any = '';
    vendidoA: any = ''; 


    constructor() {
    }

    FromObject(value: any) {
        if (this.Check(value)) {
            this.id = value.id;
            this.idUser = value.idUser;
            this.idSucursal = value.idSucursal;
            this.idClienteNegotis = value.idClienteNegotis;
            this.idCliente = value.idCliente;
            this.numero = value.numero;
            this.plaza = value.plaza;
            this.banco = value.banco;
            this.fechaVencimiento = value.fechaVencimiento;
            this.fechaEmision = value.fechaEmision;
            this.librador = value.librador;
            this.cuit = value.cuit;
            this.cuenta = value.cuenta;
            this.importe = value.importe;
            this.demoraDeposito = value.demoraDeposito;
            this.ajusteDeposito = value.ajusteDeposito;
            this.tasa = value.tasa;
            this.ajusteTasa = value.ajusteTasa;
            this.impBancario = value.impBancario;
            this.ajusteImpBancario = value.ajusteImpBancario;
            this.demoraDepositoVenta = value.demoraDepositoVenta;
            this.ajusteDepositoVenta = value.ajusteDepositoVenta;
            this.tasaVenta = value.tasaVenta;
            this.ajusteTasaVenta = value.ajusteTasaVenta;
            this.impBancarioVenta = value.impBancarioVenta;
            this.ajusteImpBancarioVenta = value.ajusteImpBancarioVenta;
            this.destino = value.destino;
            this.idEstadoCompra = value.idEstadoCompra;
            this.idEstadoVenta = value.idEstadoVenta;
            this.fechaIngresoValor = value.fechaIngresoValor;
            this.fechaEgresoValor = value.fechaEgresoValor;
            this.fechaIngresoEfectivo = value.fechaIngresoEfectivo;
            this.fechaEgresoEfectivo = value.fechaEgresoEfectivo;
            
        }
    }

    Check(value: any): boolean {
        if (!('id' in value)) { return false; }
        if (!('idUser' in value)) { return false; }
        if (!('idSucursal' in value)) { return false; }
        if (!('idClienteNegotis' in value)) { return false; }
        if (!('idCliente' in value)) { return false; }
        if (!('numero' in value)) { return false; }
        if (!('plaza' in value)) { return false; }
        if (!('banco' in value)) { return false; }
        if (!('fechaVencimiento' in value)) { return false; }
        if (!('fechaEmision' in value)) { return false; }
        if (!('librador' in value)) { return false; }
        if (!('cuit' in value)) { return false; }
        if (!('cuenta' in value)) { return false; }
        if (!('importe' in value)) { return false; }
        if (!('demoraDeposito' in value)) { return false; }
        if (!('ajusteDeposito' in value)) { return false; }
        if (!('tasa' in value)) { return false; }
        if (!('ajusteTasa' in value)) { return false; }
        if (!('impBancario' in value)) { return false; }
        if (!('ajusteImpBancario' in value)) { return false; }
        if (!('demoraDepositoVenta' in value)) { return false; }
        if (!('ajusteDepositoVenta' in value)) { return false; }
        if (!('tasaVenta' in value)) { return false; }
        if (!('ajusteTasaVenta' in value)) { return false; }
        if (!('impBancarioVenta' in value)) { return false; }
        if (!('ajusteImpBancarioVenta' in value)) { return false; }
        if (!('destino' in value)) { return false; }
        if (!('idEstadoCompra' in value)) { return false; }
        if (!('idEstadoVenta' in value)) { return false; }
        if (!('fechaIngresoValor' in value)) { return false; }
        if (!('fechaEgresoValor' in value)) { return false; }
        if (!('fechaIngresoEfectivo' in value)) { return false; }
        if (!('fechaEgresoEfectivo' in value)) { return false; }
        return true;
    }

}
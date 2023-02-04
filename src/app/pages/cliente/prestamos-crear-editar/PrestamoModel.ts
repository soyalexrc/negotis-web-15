export class PrestamoModel {
    idPrestamo: any;   
    idClienteNegotis: any;
    cantCuotas: any;   
    monto: any;
    idSucursal: any;    
    fechaPrestamo:any;    
    idCliente: any;
    interes: any;
    cuotas: any;
  
    constructor(idPrestamo: any,idClienteNegotis: any, monto: any, idSucursal: any,
        fechaPrestamo:any, idCliente: any,interes: any, cantCuotas: any, cuotas: any) {
      this.idPrestamo = idPrestamo;      
      this.idClienteNegotis = idClienteNegotis;     
      this.monto = monto;
      this.idSucursal = idSucursal;
      this.fechaPrestamo = fechaPrestamo;            
      this.idCliente = idCliente;
      this.interes = interes;
      this.cantCuotas = cantCuotas;
      this.cuotas = cuotas;
    }
  }
  
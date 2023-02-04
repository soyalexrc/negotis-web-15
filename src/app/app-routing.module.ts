import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // ******************General***************************************************
  {
    path: '',
    loadChildren:  () => import('./modules/general/general.module').then(m => m.GeneralModule),
    runGuardsAndResolvers: 'always',
  },
  // ********************************super admin*********************************************
  // super admin
  {
    path: 'superadmin',
    loadChildren: () => import('./modules/superadmin/superadmin.module').then(m => m.SuperadminModule),
    runGuardsAndResolvers: 'always',
  },
  // clientenegotis
  {
    path: 'superadmin/clientenegotis',
    loadChildren: () => import('./modules/superadmin/superadminclientenegotis/superadminclientenegotis.module').then(m => m.SuperadminclientenegotisModule),
    runGuardsAndResolvers: 'always',
  },
  // superadminsucursal
  {
    path: 'superadmin/clientenegotis/sucursal',
    loadChildren: () => import('./modules/superadmin/superadminsucursal/superadminsucursal.module').then(m => m.SuperadminsucursalModule),
    runGuardsAndResolvers: 'always',
  },
  // afip
  {
    path: 'superadmin/clientenegotis/afip',
    loadChildren: () => import('./modules/superadmin/superadminafip/superadminafip.module').then(m => m.SuperadminafipModule),
    runGuardsAndResolvers: 'always',
  },
  // ******************cliente negotis y empleado***************************************************
  // cliente
  {
    path: 'cliente',
    loadChildren: () => import('./modules/cliente/cliente.module').then(m => m.ClienteModule),
    runGuardsAndResolvers: 'always',
  },
  // rol
  {
    path: 'cliente/rol',
    loadChildren: () => import('./modules/rol/rol.module').then(m => m.RolModule),
    runGuardsAndResolvers: 'always',
  },
  // proveedor
  {
    path: 'cliente/proveedor',
    loadChildren: () => import('./modules/proveedor/proveedor.module').then(m => m.ProveedorModule),
    runGuardsAndResolvers: 'always',
  },
  // empleado
  {
    path: 'cliente/empleado',
    loadChildren: () => import('./modules/empleado/empleado.module').then(m => m.EmpleadoModule),
    runGuardsAndResolvers: 'always',
  },
  // sucursales
  {
    path: 'cliente/sucursal',
    loadChildren: () => import('./modules/sucursal/sucursal.module').then(m => m.SucursalModule),
    runGuardsAndResolvers: 'always',
  },
    // ficha medica
    {
      path: 'cliente/fichamedica',
      loadChildren: () => import('./modules/fichamedica/fichamedica.module').then(m => m.FichaMedicaModule),
      runGuardsAndResolvers: 'always',
    },
  // marca
  {
    path: 'cliente/marca',
    loadChildren: () => import('./modules/marca/marca.module').then(m => m.MarcaModule),
    runGuardsAndResolvers: 'always',
  },
  // rubro
  {
    path: 'cliente/rubro',
    loadChildren: () => import('./modules/rubro/rubro.module').then(m => m.RubroModule),
    runGuardsAndResolvers: 'always',
  },
  // categoria
  {
    path: 'cliente/categoria/rubro',
    loadChildren: () => import('./modules/categoria/categoria.module').then(m => m.CategoriaModule),
    runGuardsAndResolvers: 'always',
  },
    // categoriaCliente
    {
      path: 'cliente/categoriacliente',
      loadChildren: () => import('./modules/categoriacliente/categoriacliente.module').then(m => m.CategoriaclienteModule),
      runGuardsAndResolvers: 'always',
    },
  // listaprecios
  {
    path: 'cliente/listaprecios',
    loadChildren: () => import('./modules/listaprecios/listaprecios.module').then(m => m.ListapreciosModule),
    runGuardsAndResolvers: 'always',
  },
  // articulo
  {
    path: 'cliente/articulo',
    loadChildren: () => import('./modules/articulo/articulo.module').then(m => m.ArticuloModule),
    runGuardsAndResolvers: 'always',
  },
  // region
  {
    path: 'cliente/region',
    loadChildren: () => import('./modules/region/region.module').then(m => m.RegionModule),
    runGuardsAndResolvers: 'always',
  },
  // ruta
  {
    path: 'cliente/ruta',
    loadChildren: () => import('./modules/ruta/ruta.module').then(m => m.RutaModule),
    runGuardsAndResolvers: 'always',
  },
  // zona
  {
    path: 'cliente/zona',
    loadChildren: () => import('./modules/zona/zona.module').then(m => m.ZonaModule),
    runGuardsAndResolvers: 'always',
  },
  //produccion
  ///{
  //  path: 'produccion',
  //  loadChildren: () => import('./modules/produccion/produccion.module').then(m => m.ProduccionModule)
  //  runGuardsAndResolvers: 'always',
 // },
  //MateriaPrima
  {
    path: 'cliente/materiaprima',
    loadChildren: () => import('./modules/materiaprima/materiaprima.module').then(m => m.MateriaPrimaModule),
    runGuardsAndResolvers: 'always',
  },
  // pedido
  {
    path: 'cliente/pedido',
    loadChildren: () => import('./modules/pedido/pedido.module').then(m => m.PedidoModule),
    runGuardsAndResolvers: 'always',
  },
  //compra
  {
    path: 'cliente/compras',
    loadChildren: () => import('./modules/compra/compras.module').then(m => m.ComprasModule),
    runGuardsAndResolvers: 'always',
  },
  // usuario
  {
    path: 'cliente/usuario',
    loadChildren: () => import('./modules/usuario/usuario.module').then(m => m.UsuarioModule),
    runGuardsAndResolvers: 'always',
  },
  // reportes
  {
    path: 'cliente/reportes',
    loadChildren: () => import('./modules/reporte/reporte.module').then(m => m.ReporteModule),
    runGuardsAndResolvers: 'always',
  },
  // caja
  {
    path: 'cliente/caja',
    loadChildren: () => import('./modules/caja/caja.module').then(m => m.CajaModule),
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'cliente/gasto',
    loadChildren: () => import('./modules/gasto/gasto.module').then(m => m.GastoModule),
    runGuardsAndResolvers: 'always',
  },
  // categoria gasto
  {
    path: 'cliente/categoria/gasto',
    loadChildren: () => import('./modules/categoriagasto/categoriagasto.module').then(m => m.CategoriagastoModule),
    runGuardsAndResolvers: 'always',
  },
  // transferencia dinero
  {
    path: 'cliente/transferencia/deposito/dinero',
    loadChildren: () => import('./modules/transferenciadinero/transferenciadinero.module').then(m => m.TransferenciadineroModule),
    runGuardsAndResolvers: 'always',
  },
  // prestamos
  {
    path: 'cliente/prestamos',
    loadChildren: () => import('./modules/prestamo/prestamo.module').then(m => m.PrestamosModule),
    runGuardsAndResolvers: 'always',
  },
  // despacho pedido
  {
    path: 'cliente/despacho/pedido',
    loadChildren: () => import('./modules/despachopedido/despachopedido.module').then(m => m.DespachopedidoModule),
    runGuardsAndResolvers: 'always',
  },
  // finanzas
  {
    path: 'cliente/finanzas',
    loadChildren: () => import('./modules/finanzas/finanzas.module').then(m => m.FinanzasModule),
    runGuardsAndResolvers: 'always',
  },
  // valores
  {
    path: 'cliente/finanzas/valores',
    loadChildren: () => import('./modules/finanzasvalores/finanzasvalores.module').then(m => m.FinanzasvaloresModule),
    runGuardsAndResolvers: 'always',
  },
  // cuentadetalle
  {
    path: 'cliente/finanzas/cuentadetalle',
    loadChildren: () => import('./modules/cuentadetalle/cuentadetalle.module').then(m => m.CuentadetalleModule),
    runGuardsAndResolvers: 'always',
  },
  // estadocheque
  {
    path: 'cliente/finanzas/estadocheque',
    loadChildren: () => import('./modules/estadocheque/estadocheque.module').then(m => m.EstadochequeModule),
    runGuardsAndResolvers: 'always',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

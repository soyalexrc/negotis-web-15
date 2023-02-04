// line-chart.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartOptions } from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})



export class LineChartComponent {
  public titulo: string;
  constructor(private dialogRef: MatDialogRef<LineChartComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.titulo = data.titulo;
      if(data.listado.filtroRubro == "MP")
      {
        this.setData(data.listado);
      }
      else if(data.filtroRubro == "alarma")
      {
        this.setData3(data.listado);
      }
      else
      {
        this.setData2(data.listado);
      }

     }

     setData(data:any)
     {
      this.lineChartData = [];

      data.listaArticulos.forEach( (element: any) => {
        let cants= [];
        cants.push(element.Cantidad_Vendida);
        this.lineChartData.push({ data: [element.Cantidad_Vendida,1,60], label: element.Nombre } )

      });
     }
     setData2(data:any)
     {
      this.lineChartData = [];

      data.listaArticulos.forEach( (element: any) => {
        let cants= [];
        cants.push(element.Cantidad_Vendida);
        this.lineChartData.push({ data: [element.Cantidad_Vendida,1,60], label: element.Articulo } )

      });
     }

     setData3(data:any)
     {
      this.lineChartData = [];

      data.listaArticulos.forEach( (element: any) => {
        let cants= [];
        cants.push(element.Cantidad_Vendida);
        this.lineChartData.push({ data: [element.CantidadArticulo,1,10], label: element.Nombre } )

      });
     }

lineChartData: any[] = [
  { data: [65], label: 'Product A' },
 /*  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Product B' },*/
];


// Define chart options
lineChartOptions: ChartOptions = {
  responsive: true
};



// Set true to show legends
lineChartLegend = true;

// Define type of chart
lineChartType = this.data.graph;

lineChartPlugins = [];

// events
chartClicked({ event, active }: { event: any, active: {}[] }): void {
  console.log(event, active);
}

chartHovered({ event, active }: { event: any, active: {}[] }): void {
  console.log(event, active);
}


cancelar(){
  this.dialogRef.close();
}
}

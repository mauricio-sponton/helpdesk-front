import { Component, OnInit, ViewChild } from '@angular/core';
import { Chamado } from 'src/app/models/chamado';
import { PaginatorService } from 'src/app/services/paginator.service';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'acoes'];
  dataSource = new MatTableDataSource<Chamado>();
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private paginatorService: PaginatorService, private service: ChamadoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void{
    this.service.findAll().subscribe(resposta =>{
      console.log(resposta)
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Chamado>(resposta);
      this.dataSource.paginator = this.paginator;
      this.paginatorService.traduzirPaginator(this.paginator);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any): string{
    if(status == '0'){
      return 'ABERTO';
    }else if(status == '1'){
      return 'EM ANDAMENTO';
    }else{
      return 'ENCERRADO'; 
    }
  }

  retornaPrioridade(prioriade: any): string{
    if(prioriade == '0'){
      return 'BAIXA';
    }else if(prioriade == '1'){
      return 'MÉDIA';
    }else{
      return 'ALTA'; 
    }
  }

  orderByStatus(status: any): void{
    let list: Chamado[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status){
        list.push(element)
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Chamado>(list);
    this.dataSource.paginator = this.paginator;
    this.paginatorService.traduzirPaginator(this.paginator);
  }

}

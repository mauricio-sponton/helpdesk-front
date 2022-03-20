import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  constructor() { }

  traduzirPaginator(paginator: MatPaginator){
    paginator._intl.firstPageLabel = "Primeira página";
    paginator._intl.lastPageLabel = "Última página";
    paginator._intl.nextPageLabel = "Próxima página";
    paginator._intl.previousPageLabel = "Página anterior";
    paginator._intl.itemsPerPageLabel = "Registros por página";

    paginator._intl.getRangeLabel = this.getRangeLabel;
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }

}

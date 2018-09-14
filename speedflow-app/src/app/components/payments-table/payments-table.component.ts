import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PaymentsTableDataSource } from './payments-table-datasource';

@Component({
  selector: 'app-payments-table',
  templateUrl: './payments-table.component.html',
  styleUrls: ['./payments-table.component.css']
})
export class PaymentsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PaymentsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['debet', 'credit','currency_name', 'currency', 'payments'];

  ngOnInit() {
    this.dataSource = new PaymentsTableDataSource(this.paginator, this.sort);
  }
}

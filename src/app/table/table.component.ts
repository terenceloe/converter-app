import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent<T extends { [key: string]: string }>
  implements OnInit {
  @Input() data: T[] = [];

  dataSource: MatTableDataSource<T>;
  columnsToDisplay: string[];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.columnsToDisplay = Object.keys(this.data[0]);
  }
}

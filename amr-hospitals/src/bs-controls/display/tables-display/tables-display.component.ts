import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Subscription, map } from 'rxjs';
import { DynamicTableData, TableHeaders } from '../../model/elements';
@Component({
  selector: 'app-tables-display',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './tables-display.component.html',
  styleUrl: './tables-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablesDisplayComponent {
  @Input({ required: true }) data!: DynamicTableData[];
  @Input({ required: true }) headers!: TableHeaders;
  @Input({ required: true }) columns!: string[];
  @Output() rowClick = new EventEmitter(true);
  control = new FormControl('');
  sub$ = new Subscription();
  mt_data!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;


  // data$: MatTableDataSource<DynamicTableData> = new MatTableDataSource(this.data);

  ngOnInit() {
    this.mt_data = new MatTableDataSource(this.data)
    this.sub$.add(
      this.control.valueChanges
        .pipe(map(x => (x as string)
          .trim()
          .toLowerCase()))
        .subscribe(x => this.mt_data.filter = x))
    this.mt_data.sort = this.sort;
  }

  rowClickAction(i: any) {
    this.rowClick.emit(i)
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}


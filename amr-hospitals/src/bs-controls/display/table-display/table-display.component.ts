import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, input, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table'
import { map, startWith } from 'rxjs';
import { TableHeaders } from '../../model/elements';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ActivityProvider } from '../../../app/providers/ActivityProvider';
import { DataCellDirective } from './data-cell.directive';

@Component({
  selector: 'app-table-display',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTable,
    MatSort,
    MatInput,
    MatButton,
    MatTooltip,
    MatIcon,
    MatFormField,
    DataCellDirective
  ],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDisplayComponent<T> implements OnInit {

  data = input.required<T[]>();
  headers = input.required<TableHeaders>();
  isProcessing = inject(ActivityProvider).act().isProcessing;

  private viewClick = output<T>();
  private deleteClick = output<T>();
  private editButonClicked = output<T>();

  search = input<boolean>(true);
  columns!: string[];
  control = new FormControl('');
  data$ = this.control.valueChanges
    .pipe(
      startWith(''),
      map(x => (x as string).toLowerCase()),
      map(x => this.data()
        .filter((f: any) =>
          this.columns.some(o => (f[o] as string)?.toLowerCase()?.includes(x))
        )))

  ngOnInit() {
    this.columns = Object.keys(this.headers());
    computed(() => console.log(this.data()))
  }

  protected cellData(r: any, c: string) {
    switch (c) {
      case 'edit':
        return 'Edit';
      case 'view':
        return 'View';
      case 'delete':
        return 'Delete'
      default:
        return r[c]
    }
  }

  private intial() {
    // let mtDt = new MatTableDataSource<T>(this.data())
    // if (this.search()) {
    //   mtDt.filter = (this.control.value as string).trim().toLowerCase()
    // }
    //this.dsrc = computed(() => this.data());
  }

  // ngOnInit() {
  //   // this.intial();
  //   // if (this.search()) {
  //   //   this.sub$.add(
  //   //     this.control.valueChanges
  //   //       .pipe(map(x => (x as string)
  //   //         .trim()
  //   //         .toLowerCase()))
  //   //       .subscribe(x => this.dsrc().filter = x))
  //   // }
  // }

  rowClickAction(i: T) {
    this.viewClick.emit(i);
  }

  deleteAction(i: T) {
    this.deleteClick.emit(i)
  }

  editAction(i: T) {
    this.editButonClicked.emit(i)
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Signal, ViewChild, WritableSignal, computed, inject, input, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { Subscription, map, of } from 'rxjs';
import { TableHeaders } from '../../model/elements';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivityProvider } from '../../../app/providers/ActivityProvider';

@Component({
  selector: 'app-table-display',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatIconModule
  ],
  templateUrl: './table-display.component.html',
  styleUrl: './table-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableDisplayComponent<T> implements OnInit {

  data = input.required<T[]>();
  headers = input.required<TableHeaders>();
  isProcessing = inject(ActivityProvider).act().isProcessing;

  @Output() private viewClick = new EventEmitter(true);
  @Output() private deleteClick = new EventEmitter(true);
  @Output() private editButonClicked = new EventEmitter(true);

  columns = computed(() => Object.keys(this.headers()));
  control = new FormControl('');

  private sub$ = new Subscription();

  dsrc!: Signal<MatTableDataSource<T>>



  private intial() {
    let mtDt = new MatTableDataSource<T>(this.data())
    if (this.search) {
      mtDt.filter = (this.control.value as string).trim().toLowerCase()
    }
    this.dsrc = computed<MatTableDataSource<T>>(() => mtDt);
  }

  updateTbl(i: T) {
    this.data().unshift(i);
    this.intial();
  }

  @Input() search = true;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.intial();
    if (this.search) {
      this.sub$.add(
        this.control.valueChanges
          .pipe(map(x => (x as string)
            .trim()
            .toLowerCase()))
          .subscribe(x => this.dsrc().filter = x))
    }
  }

  rowClickAction(i: T) {
    this.viewClick.emit(i);
  }

  deleteAction(i: T) {
    this.deleteClick.emit(i)
  }

  editAction(i: any) {
    this.editButonClicked.emit(i)
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  removeRow(ix: number) {
    this.data().splice(ix, 1);
    this.intial();
  }

  editRow(ix: number, row: T) {
    this.data()[ix] = row;
    this.intial();
  }
}

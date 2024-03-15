import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { Observable, map, of, startWith, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-list-display',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './list-display.component.html',
  styleUrl: './list-display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDisplayComponent {
  @Output() listClicked = new EventEmitter();
  @Input({ required: true }) items!: any[];
  @Input({ required: true }) keys!: string[];
  @Input() buttons = true;
  @Input() search: boolean = true;
  control = new FormControl('');
  items$!: Observable<any>;

  ngAfterViewInit(): void {
    this.items$ = this.control.valueChanges.pipe(
      startWith(''),
      map(x => (x as string).toLowerCase()),
      switchMap(x => this.filter(x)
      ));
  }

  filter(x: string) {
    if (!this.search)
      return of(this.items);
    let vals;
    this.keys.forEach(f => {
      vals = this.items.filter(i => (i[f] as string).toLowerCase().includes(x));
    });
    return of(vals);
  }

  listAction(i: any) {
    this.listClicked.emit(i);
  }

}

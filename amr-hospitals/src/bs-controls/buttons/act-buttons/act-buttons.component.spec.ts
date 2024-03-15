import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActButtonsComponent } from './act-buttons.component';

describe('ActButtonsComponent', () => {
  let component: ActButtonsComponent;
  let fixture: ComponentFixture<ActButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ActButtonsComponent]
    });
    fixture = TestBed.createComponent(ActButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

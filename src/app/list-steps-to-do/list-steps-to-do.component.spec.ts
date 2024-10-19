import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStepsToDoComponent } from './list-steps-to-do.component';

describe('ListStepsToDoComponent', () => {
  let component: ListStepsToDoComponent;
  let fixture: ComponentFixture<ListStepsToDoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStepsToDoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStepsToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

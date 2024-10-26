import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderTouchchefComponent} from './header-touchchef.component';

describe('HeaderTouchchefComponent', () => {
  let component: HeaderTouchchefComponent;
  let fixture: ComponentFixture<HeaderTouchchefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTouchchefComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTouchchefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

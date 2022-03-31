import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAuthentComponent } from './form-authent.component';

describe('FormAuthentComponent', () => {
  let component: FormAuthentComponent;
  let fixture: ComponentFixture<FormAuthentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAuthentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAuthentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

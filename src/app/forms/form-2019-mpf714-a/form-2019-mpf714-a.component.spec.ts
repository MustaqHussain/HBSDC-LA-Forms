import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Form2019MPF714AComponent } from './form-2019-mpf714-a.component';

describe('Form2019MPF714AComponent', () => {
  let component: Form2019MPF714AComponent;
  let fixture: ComponentFixture<Form2019MPF714AComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Form2019MPF714AComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Form2019MPF714AComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

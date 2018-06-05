import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSearchComponent } from './alert-search.component';

describe('AlertSearchComponent', () => {
  let component: AlertSearchComponent;
  let fixture: ComponentFixture<AlertSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

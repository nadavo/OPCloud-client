import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RappidOplComponent } from './rappid-opl.component';

describe('RappidOplComponent', () => {
  let component: RappidOplComponent;
  let fixture: ComponentFixture<RappidOplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RappidOplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappidOplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

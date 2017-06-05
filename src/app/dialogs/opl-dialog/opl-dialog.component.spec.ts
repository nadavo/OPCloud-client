import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OplDialogComponent } from './opl-dialog.component';

describe('OplDialogComponent', () => {
  let component: OplDialogComponent;
  let fixture: ComponentFixture<OplDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OplDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OplDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

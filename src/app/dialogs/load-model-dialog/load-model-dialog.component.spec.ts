/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoadModelDialogComponent } from './load-model-dialog.component';

describe('LoadModelDialogComponent', () => {
  let component: LoadModelDialogComponent;
  let fixture: ComponentFixture<LoadModelDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadModelDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadModelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

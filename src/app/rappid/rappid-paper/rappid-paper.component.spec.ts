/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RappidPaperComponent } from './rappid-paper.component';

describe('RappidPaperComponent', () => {
  let component: RappidPaperComponent;
  let fixture: ComponentFixture<RappidPaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RappidPaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappidPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RappidComponent } from './rappid.component';

describe('RappidComponent', () => {
  let component: RappidComponent;
  let fixture: ComponentFixture<RappidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RappidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

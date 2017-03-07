/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RappidStencilComponent } from './rappid-stencil.component';

describe('RappidStencilComponent', () => {
  let component: RappidStencilComponent;
  let fixture: ComponentFixture<RappidStencilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RappidStencilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappidStencilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

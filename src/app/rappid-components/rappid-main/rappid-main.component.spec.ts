/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RappidMainComponent } from './rappid-main.component';

describe('RappidMainComponent', () => {
  let component: RappidMainComponent;
  let fixture: ComponentFixture<RappidMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RappidMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RappidMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

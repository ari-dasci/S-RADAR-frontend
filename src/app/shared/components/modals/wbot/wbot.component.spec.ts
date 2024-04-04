/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WbotComponent } from './wbot.component';

describe('WbotComponent', () => {
  let component: WbotComponent;
  let fixture: ComponentFixture<WbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WbotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

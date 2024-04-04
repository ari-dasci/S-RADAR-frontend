/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabCallApiComponent } from './tab-call-api.component';

describe('TabCallApiComponent', () => {
  let component: TabCallApiComponent;
  let fixture: ComponentFixture<TabCallApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabCallApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabCallApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

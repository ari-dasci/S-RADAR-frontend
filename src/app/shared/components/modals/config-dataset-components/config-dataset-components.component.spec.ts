import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDatasetComponentsComponent } from './config-dataset-components.component';

describe('ConfigDatasetComponentsComponent', () => {
  let component: ConfigDatasetComponentsComponent;
  let fixture: ComponentFixture<ConfigDatasetComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigDatasetComponentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfigDatasetComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleBaselayerComponent } from './toggle-baselayer.component';

describe('ToggleBaselayerComponent', () => {
  let component: ToggleBaselayerComponent;
  let fixture: ComponentFixture<ToggleBaselayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleBaselayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleBaselayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersAsideComponent } from './filters-aside.component';

describe('FiltersAsideComponent', () => {
  let component: FiltersAsideComponent;
  let fixture: ComponentFixture<FiltersAsideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersAsideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversidadeComponent } from './universidade.component';

describe('UniversidadeComponent', () => {
  let component: UniversidadeComponent;
  let fixture: ComponentFixture<UniversidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

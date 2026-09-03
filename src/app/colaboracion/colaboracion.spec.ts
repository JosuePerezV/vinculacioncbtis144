import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Colaboracion } from './colaboracion';

describe('Colaboracion', () => {
  let component: Colaboracion;
  let fixture: ComponentFixture<Colaboracion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Colaboracion],
    }).compileComponents();

    fixture = TestBed.createComponent(Colaboracion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

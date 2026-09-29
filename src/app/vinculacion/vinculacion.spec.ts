import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Vinculacion } from './vinculacion';
import { provideRouter } from '@angular/router';

describe('Vinculacion', () => {
  let component: Vinculacion;
  let fixture: ComponentFixture<Vinculacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Vinculacion],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Vinculacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

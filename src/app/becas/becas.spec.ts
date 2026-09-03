import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Becas } from './becas';

describe('Becas', () => {
  let component: Becas;
  let fixture: ComponentFixture<Becas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Becas],
    }).compileComponents();

    fixture = TestBed.createComponent(Becas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

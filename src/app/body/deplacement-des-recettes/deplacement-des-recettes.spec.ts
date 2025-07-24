import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeplacementDesRecettes } from './deplacement-des-recettes';

describe('DeplacementDesRecettes', () => {
  let component: DeplacementDesRecettes;
  let fixture: ComponentFixture<DeplacementDesRecettes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeplacementDesRecettes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeplacementDesRecettes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

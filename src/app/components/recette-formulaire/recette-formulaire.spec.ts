import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteFormulaireComponent } from './recette-formulaire';

describe('RecetteFormulaire', () => {
  let component: RecetteFormulaireComponent;
  let fixture: ComponentFixture<RecetteFormulaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecetteFormulaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRecetteComponent } from './liste-recette';

<<<<<<< HEAD:src/app/liste-recette/liste-recette.spec.ts
describe('ListeRecetteComponent', () => {
=======
describe('ListeRecette', () => {
>>>>>>> c78b3ef7c99d2055df3659a2ac603174ef28b6ec:src/app/components/liste-recette/liste-recette.spec.ts
  let component: ListeRecetteComponent;
  let fixture: ComponentFixture<ListeRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRecetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

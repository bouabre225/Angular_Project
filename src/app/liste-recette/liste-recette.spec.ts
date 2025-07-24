import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRecette } from './liste-recette';

describe('ListeRecette', () => {
  let component: ListeRecette;
  let fixture: ComponentFixture<ListeRecette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRecette]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRecette);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

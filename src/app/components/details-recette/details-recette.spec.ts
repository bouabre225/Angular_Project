import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsRecetteComponent } from './details-recette';

describe('DetailsRecette', () => {
  let component: DetailsRecetteComponent;
  let fixture: ComponentFixture<DetailsRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsRecetteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

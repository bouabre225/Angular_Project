import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRecette } from './detail-recette';

describe('DetailRecette', () => {
  let component: DetailRecette;
  let fixture: ComponentFixture<DetailRecette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailRecette]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRecette);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

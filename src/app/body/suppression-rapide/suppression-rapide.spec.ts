import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionRapide } from './suppression-rapide';

describe('SuppressionRapide', () => {
  let component: SuppressionRapide;
  let fixture: ComponentFixture<SuppressionRapide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppressionRapide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppressionRapide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

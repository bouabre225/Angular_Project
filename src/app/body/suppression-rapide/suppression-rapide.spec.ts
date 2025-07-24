import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppressionRapideComponent } from './suppression-rapide';

describe('SuppressionRapideComponent', () => {
  let component: SuppressionRapideComponent;
  let fixture: ComponentFixture<SuppressionRapideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuppressionRapideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppressionRapideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

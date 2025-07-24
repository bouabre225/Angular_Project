import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprentissageComponent } from './apprentissage';

describe('Apprentissage', () => {
  let component: ApprentissageComponent;
  let fixture: ComponentFixture<ApprentissageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprentissageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprentissageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

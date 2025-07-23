import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarDeFiltreComponent } from './bar-de-filtre';

describe('BarDeFiltre', () => {
  let component: BarDeFiltreComponent;
  let fixture: ComponentFixture<BarDeFiltreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarDeFiltreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarDeFiltreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

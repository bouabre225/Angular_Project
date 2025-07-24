import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueDeSemaine } from './vue-de-semaine';

describe('VueDeSemaine', () => {
  let component: VueDeSemaine;
  let fixture: ComponentFixture<VueDeSemaine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VueDeSemaine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VueDeSemaine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RezervasyonPage } from './rezervasyon.page';

describe('RezervasyonPage', () => {
  let component: RezervasyonPage;
  let fixture: ComponentFixture<RezervasyonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RezervasyonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

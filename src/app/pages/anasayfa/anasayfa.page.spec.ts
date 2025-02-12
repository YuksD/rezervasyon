import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnasayfaPage } from './anasayfa.page';

describe('AnasayfaPage', () => {
  let component: AnasayfaPage;
  let fixture: ComponentFixture<AnasayfaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AnasayfaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KayitPage } from './kayit.page';

describe('KayitPage', () => {
  let component: KayitPage;
  let fixture: ComponentFixture<KayitPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KayitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

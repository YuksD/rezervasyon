import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GirisPage } from './giris.page';

describe('GirisPage', () => {
  let component: GirisPage;
  let fixture: ComponentFixture<GirisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GirisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

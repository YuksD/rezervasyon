import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UcPage } from './uc.page';

describe('UcPage', () => {
  let component: UcPage;
  let fixture: ComponentFixture<UcPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UcPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

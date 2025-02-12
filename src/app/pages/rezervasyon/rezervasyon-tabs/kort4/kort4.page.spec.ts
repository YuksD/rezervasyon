import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Kort4Page } from './kort4.page';

describe('Kort4Page', () => {
  let component: Kort4Page;
  let fixture: ComponentFixture<Kort4Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Kort4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

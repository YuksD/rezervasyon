import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Kort1Page } from './kort1.page';

describe('Kort1Page', () => {
  let component: Kort1Page;
  let fixture: ComponentFixture<Kort1Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Kort1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

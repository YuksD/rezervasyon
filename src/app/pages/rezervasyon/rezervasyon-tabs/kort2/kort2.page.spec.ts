import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Kort2Page } from './kort2.page';

describe('Kort2Page', () => {
  let component: Kort2Page;
  let fixture: ComponentFixture<Kort2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Kort2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

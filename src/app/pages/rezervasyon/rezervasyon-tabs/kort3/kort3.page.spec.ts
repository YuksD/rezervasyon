import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Kort3Page } from './kort3.page';

describe('Kort3Page', () => {
  let component: Kort3Page;
  let fixture: ComponentFixture<Kort3Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Kort3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

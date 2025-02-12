import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BirPage } from './bir.page';

describe('BirPage', () => {
  let component: BirPage;
  let fixture: ComponentFixture<BirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

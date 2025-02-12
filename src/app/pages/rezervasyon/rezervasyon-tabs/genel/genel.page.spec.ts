import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenelPage } from './genel.page';

describe('GenelPage', () => {
  let component: GenelPage;
  let fixture: ComponentFixture<GenelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

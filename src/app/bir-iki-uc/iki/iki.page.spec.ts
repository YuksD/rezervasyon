import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IkiPage } from './iki.page';

describe('IkiPage', () => {
  let component: IkiPage;
  let fixture: ComponentFixture<IkiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IkiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

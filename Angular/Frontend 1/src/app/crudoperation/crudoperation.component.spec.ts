import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudoperationComponent } from './crudoperation.component';

describe('CrudoperationComponent', () => {
  let component: CrudoperationComponent;
  let fixture: ComponentFixture<CrudoperationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudoperationComponent]
    });
    fixture = TestBed.createComponent(CrudoperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

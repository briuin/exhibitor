import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDividersComponent } from './ui-dividers.component';

describe('UiDividersComponent', () => {
  let component: UiDividersComponent;
  let fixture: ComponentFixture<UiDividersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiDividersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiDividersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

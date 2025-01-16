import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiButtonLinkComponent } from './ui-button-link.component';

describe('UiButtonLinkComponent', () => {
  let component: UiButtonLinkComponent;
  let fixture: ComponentFixture<UiButtonLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiButtonLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiButtonLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

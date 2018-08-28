import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistpopupComponent } from './playlistpopup.component';

describe('PlaylistpopupComponent', () => {
  let component: PlaylistpopupComponent;
  let fixture: ComponentFixture<PlaylistpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
=======
import { RouterTestingModule } from '@angular/router/testing';
>>>>>>> 340becf87da4942e0b3fec04e4c3d9cf489d2fd2
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      imports: [AppComponent],
=======
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
>>>>>>> 340becf87da4942e0b3fec04e4c3d9cf489d2fd2
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<< HEAD
  it(`should have the 's-adl-frontend' title`, () => {
=======
  it(`should have as title 's-adl-frontend'`, () => {
>>>>>>> 340becf87da4942e0b3fec04e4c3d9cf489d2fd2
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('s-adl-frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, s-adl-frontend');
  });
});

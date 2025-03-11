<<<<<<< HEAD
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
=======
export { AppServerModule as default } from './app/app.module.server';
>>>>>>> 340becf87da4942e0b3fec04e4c3d9cf489d2fd2

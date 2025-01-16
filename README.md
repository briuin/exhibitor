# Exhibitor

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

### Steps to Set Up

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/briuin/exhibitor.git
   ```

2. **Install Dependencies**:

   Run the following command to install required libraries and packages:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   Start the Angular development server:

   ```bash
   npm run start
   ```

4. **Access the Application**:

   Open your browser and navigate to:

   ```
   http://localhost:4200
   ```

---

## Third-Party Libraries Used

### 1. **Bootstrap 5**
- **Purpose**: For responsive design.
- **Installation**:

  ```bash
  npm install bootstrap
  ```

- **Documentation**: [Bootstrap Documentation](https://getbootstrap.com/)

### 2. **ng-bootstrap**
- **Purpose**: To integrate Bootstrap components with Angular, particularly modals.
- **Installation**:

  ```bash
  npm install @ng-bootstrap/ng-bootstrap
  ```

- **Documentation**: [ng-bootstrap Documentation](https://ng-bootstrap.github.io/)

### 3. **html2canvas**
- **Purpose**: To capture HTML elements as images, used for downloading modal content.
- **Installation**:

  ```bash
  npm install html2canvas
  ```

- **Documentation**: [html2canvas Documentation](https://html2canvas.hertzen.com/)

### 4. **NgRx**
- **Purpose**: For state management, handling actions, reducers, and effects.
- **Installation**:

  ```bash
  npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
  ```

- **Documentation**: [NgRx Documentation](https://ngrx.io/)

---

## Areas for Improvement

- **Responsive Design**: Add better mobile responsiveness with Bootstrap utilities.
- **User Experience**: Enhance the user experience by displaying a confirmation modal when a user opens a popup or attempts to leave a page while still editing a form.
- **Dynamic Theming**: Allow users to customize colors and themes dynamically.
- **API Retry Logic**: Add retry logic for failed API calls to improve reliability.
- **Unit and Integration Tests**: Add unit tests for forms, effects, and services, and integration tests for modals and progress tracking.
- **Cache static files**: adding PWA functionality to improve loading speed.

---

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

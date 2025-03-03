<div align="center">

# 🚀 Angular State Management Demos

[![Angular Version](https://img.shields.io/badge/Angular-v19-dd0031.svg)](https://angular.io)
[![TanStack Query](https://img.shields.io/badge/Angular_Query-v1.0-blue.svg)](https://tanstack.com/query/latest)
[![NgRx](https://img.shields.io/badge/NgRx-v18-ba2bd2.svg)](https://ngrx.io/)
[![NGXS](https://img.shields.io/badge/NGXS-v3.8-1b47ee.svg)](https://www.ngxs.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

</div>

A comprehensive demonstration of different state management approaches in Angular applications. This project showcases implementations using NgRx, NGXS, and TanStack Query, helping developers understand and compare different state management solutions.

## ✨ State Management Solutions

### 🔄 Featured Libraries

- **[NgRx](https://ngrx.io/):** A reactive state management library for Angular applications, built on top of RxJS.
- **[NGXS](https://www.ngxs.io/):** A state management pattern + library for Angular applications.
- **[TanStack Query](https://tanstack.com/query/latest/docs/framework/angular/installation):** Powerful data fetching and caching solution.

### List View Operations
- [ ] Fetch and display list of items
- [ ] Implement pagination
- [ ] Add search with debounce
- [ ] Load and display related entities in table
- [ ] Add filtering capabilities
- [ ] Handle loading and error states

### Form Operations (Wizard)
- [ ] Multi-step form navigation
- [ ] Persist form state between steps
- [ ] Load dependent data (cascading dropdowns)
- [ ] Auto-save form progress
- [ ] Handle field validations
- [ ] Implement optimistic updates
- [ ] Support form cancellation

### CRUD Operations
- [ ] Create new items with wizard
- [ ] Edit existing items
  - [ ] Pre-fill wizard with item data
  - [ ] Navigate to specific wizard step
- [ ] Delete items
  - [ ] Show confirmation dialog
  - [ ] Remove from table with animation
  - [ ] Handle deletion errors
- [ ] Update items
  - [ ] Show confirmation when needed
  - [ ] Handle concurrent updates

### Details View
- [ ] Route-based item loading
- [ ] Sync route params with state
- [ ] Load item details from cache/API
- [ ] Handle related entity loading
- [ ] Support offline data access

## 📦 Getting Started

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/angular-state-management-demos.git
   cd angular-state-management-demos
   ```

2. **Install dependencies:**

   ```sh
   pnpm install
   ```

3. **Run the development server:**

   ```sh
   pnpm run start
   ```

4. **Run the mocked API Server:**
   ```sh
   pnpm run start-json-server
   ```

## 🧪 Testing & Quality

- **Unit Testing:** Using Web Test Runner and ng-mocks
- **Component Testing:** With Storybook
- **Code Quality:** ESLint with Sheriff for architecture rules
- **Formatting:** Prettier with various plugins for consistent code style

## 📝 TODO

- **Implement NgRx demos**

  - Basic CRUD operations
  - Entity management
  - Effects and side effects
  - Signal store integration
  - [ngrx toolkit](https://github.com/angular-architects/ngrx-toolkit)

- **Implement NGXS demos**

  - State management
  - Actions and selectors
  - Plugins usage
  - Best practices

- **Add Cypress Component Testing**
- **Add commitlint with husky**
- **Add Releaselog**

## 🤝 Contributing

Contributions are welcome! Please check our [Contributing Guide](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## 📜 License

This project is licensed under the MIT License.

## 📫 Contact

Created by [Alfredo Perez](https://alfredo-perez.dev) - feel free to contact me!

---

## 🌟 Acknowledgements

- Thanks to all the contributors who have made this project possible.

---

## 📖 Using Angular Material

Refer to the [Angular Material documentation](https://material.angular.io/) for more information on using Angular Material components.

# Contributing to Hospital Management System

Thank you for your interest in contributing to the HMS project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others succeed

## How to Contribute

### Reporting Bugs

1. Check if the bug already exists in Issues
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment info (OS, Node version, etc.)

### Suggesting Features

1. Check if feature already suggested
2. Create an issue with:
   - Clear title and description
   - Use case and motivation
   - Possible implementation approach
   - Examples or mockups

### Submitting Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Follow coding standards (see below)
5. Test your changes
6. Commit with clear messages: `git commit -m "Add feature description"`
7. Push to your fork: `git push origin feature/your-feature`
8. Open a Pull Request with:
   - Clear title and description
   - Link to related issues
   - Before/after screenshots if UI change
   - Testing done

## Coding Standards

### JavaScript/React
```javascript
// Use const/let instead of var
const myVariable = 'value';

// Use arrow functions
const myFunction = () => {
  // code
};

// Use destructuring
const { name, email } = user;

// Use template literals
const message = `Hello, ${name}!`;

// Add comments for complex logic
// Fetch user data from API
const fetchUser = async (id) => {
  // code
};
```

### File Naming
- Components: PascalCase (e.g., `UserProfile.jsx`)
- Utilities: camelCase (e.g., `formatDate.js`)
- CSS: lowercase with hyphen (e.g., `user-profile.css`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### Git Commit Messages
```
fix: correct typo in header component
feat: add user profile page
refactor: simplify appointment logic
docs: update API documentation
style: format code with prettier
test: add tests for login flow
```

Prefix commits with:
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code refactoring
- `style:` - Code style changes
- `test:` - Adding tests
- `docs:` - Documentation changes
- `chore:` - Build, dependencies, etc.

## Setup Development Environment

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Setup environment files
4. Start development servers:
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2
   cd frontend && npm run dev
   ```

## Testing

### Before submitting PR:
- Run linter: `npm run lint`
- Test your changes locally
- Add tests for new features
- Ensure all tests pass: `npm test`

### Test Coverage
- Minimum 80% coverage required
- Write tests for:
  - Happy path scenarios
  - Error cases
  - Edge cases

## Documentation

Update documentation for:
- New API endpoints
- New components
- Configuration changes
- Breaking changes

## Code Review Process

1. Maintainers review your PR
2. Address feedback and push updates
3. Get approval from 2+ maintainers
4. PR is merged to develop branch
5. Changes tested before production release

## Merge Conflicts

If you have conflicts:
1. `git fetch origin`
2. `git rebase origin/develop`
3. Resolve conflicts
4. `git add .`
5. `git rebase --continue`
6. `git push origin feature/your-feature --force`

## Project Structure

```
src/
  ├── components/    - Reusable components
  ├── pages/         - Page components
  ├── context/       - State management
  ├── services/      - API services
  ├── utils/         - Utility functions
  └── styles/        - Styles
```

## Useful Resources

- [Git Guide](https://git-scm.com/doc)
- [React Documentation](https://react.dev)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)

## Questions?

- Ask in GitHub Discussions
- Check existing issues
- Email the team

---

Thank you for contributing! 🚀

/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App {
  new ProjectInput('project-input', 'app');
  new ProjectList('project-list', 'app', 'active');
  new ProjectList('project-list', 'app', 'finished');
}
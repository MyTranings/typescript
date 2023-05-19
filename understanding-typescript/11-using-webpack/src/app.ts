import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

new ProjectInput("project-input", "app");
new ProjectList("project-list", "app", "active");
new ProjectList("project-list", "app", "finished");

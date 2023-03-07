"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Project Status
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
// Project type
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
        this.id = Math.random().toString();
        this.title = title;
        this.description = description;
        this.people = people;
    }
}
// Project State Managment 
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
    addProject(title, description, people) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); // To play around with referrence
        }
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
const projectState = ProjectState.getInstance();
function validate(ValidatableInput) {
    let isValid = true;
    if (ValidatableInput.require) {
        isValid = isValid && ValidatableInput.value.toString().trim().length !== 0;
    }
    if (ValidatableInput.minLength != null && ValidatableInput.value === 'string') {
        isValid = isValid && ValidatableInput.value.length >= ValidatableInput.minLength;
    }
    if (ValidatableInput.maxLength != null && ValidatableInput.value === 'string') {
        isValid = isValid && ValidatableInput.value.length <= ValidatableInput.maxLength;
    }
    if (ValidatableInput.min != null && typeof ValidatableInput.value === 'number') {
        isValid = isValid && ValidatableInput.value >= ValidatableInput.min;
    }
    if (ValidatableInput.max != null && typeof ValidatableInput.value === 'number') {
        isValid = isValid && ValidatableInput.value <= ValidatableInput.max;
    }
    return isValid;
}
function AutoBind(_, _1, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class ProjectList {
    constructor(templateId, hostId, type) {
        this.type = type;
        this.assignedProjects = [];
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        this.assignedProjects = [];
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter(project => {
                if (this.type === 'active') {
                    return project.status === ProjectStatus.Active;
                }
                return project.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement('li');
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element);
    }
}
class ProjectInput {
    constructor(templateId, hostId) {
        // this.formId = templateId;
        // this.hostId = hostId;
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        // Variantt 1
        // this.templateContentElement = this.templateElement.content.cloneNode(true) as HTMLFormElement;
        this.templateContentElement = this.templateElement.content.firstElementChild;
        this.templateContentElement.id = "user-input";
        // Variant 2
        // const importedNode = document.importNode(this.templateElement.content, true);
        // this.templateContentElement = importedNode.firstElementChild as HTMLFormElement;
        this.titleInputElement = this.templateContentElement.querySelector('#title');
        this.descriptionInputElement = this.templateContentElement.querySelector('#description');
        this.peopleInputElement = this.templateContentElement.querySelector('#people');
        this.attach();
        this.configure();
    }
    getherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            require: true
        };
        const desctiptionValidatable = {
            value: enteredDescription,
            require: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: enteredPeople,
            require: true,
            min: 1
        };
        // if(enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0){
        if (!validate(titleValidatable) ||
            !validate(desctiptionValidatable) ||
            !validate(peopleValidatable)) {
            // alert('Error! Fields must have value')
            console.error('Error! Fields must have value');
            return;
        }
        return [enteredTitle, enteredDescription, +enteredPeople];
    }
    ;
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.getherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }
    configure() {
        this.templateContentElement.addEventListener('submit', this.submitHandler);
    }
    attach() {
        // Variant 1
        this.hostElement.appendChild(this.templateContentElement);
        // Variant 2
        // this.hostElement.insertAdjacentElement('afterbegin', this.templateContentElement);
    }
}
__decorate([
    AutoBind
], ProjectInput.prototype, "submitHandler", null);
const project = new ProjectInput('project-input', 'app');
const activeProjects = new ProjectList('project-list', 'app', 'active');
const finishedProjects = new ProjectList('project-list', 'app', 'finished');
//# sourceMappingURL=app.js.map
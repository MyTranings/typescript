"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    // Component Base Class
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
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
    App.AutoBind = AutoBind;
})(App || (App = {}));
var App;
(function (App) {
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
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (!this.instance) {
                this.instance = new ProjectState();
            }
            return this.instance;
        }
        addProject(title, description, people) {
            const newProject = new App.Project(Math.random().toString(), title, description, people, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(el => el.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                // Pass a copy ot the array by calling .slice()
                listenerFn(this.projects.slice()); // To play around with referrence
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project-state.ts" />
var App;
(function (App) {
    class ProjectInput extends App.Component {
        constructor(templateId, hostId) {
            super(templateId, hostId, true, 'user-input');
            this.titleInputElement = this.element.querySelector('#title');
            this.descriptionInputElement = this.element.querySelector('#description');
            this.peopleInputElement = this.element.querySelector('#people');
            this.configure();
        }
        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }
        renderContent() { }
        ;
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
            if (!App.validate(titleValidatable) ||
                !App.validate(desctiptionValidatable) ||
                !App.validate(peopleValidatable)) {
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
                App.projectState.addProject(title, description, people);
                this.clearInputs();
            }
        }
    }
    __decorate([
        App.AutoBind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
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
    App.Project = Project;
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../modules/project.ts" />
/// <reference path="../modules/drag-drop.ts" />
var App;
(function (App) {
    // ProjectItem Class 
    class ProjectItem extends App.Component {
        get persons() {
            return this.project.people === 1 ? '1 person' : `${this.project.people} persons`;
        }
        constructor(hostId, project) {
            super('single-project', hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        renderContent() {
            this.element.querySelector('h2').textContent = this.project.title;
            this.element.querySelector('h3').textContent = this.persons + ' assigned';
            this.element.querySelector('p').textContent = this.project.description;
        }
        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
        dragStartHandler(event) {
            event.dataTransfer.setData('text/plain', this.project.id);
            event.dataTransfer.effectAllowed = 'move';
        }
        dragEndHandler(_) {
            console.log('DragEnd');
        }
    }
    __decorate([
        App.AutoBind
    ], ProjectItem.prototype, "dragStartHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
/// <reference path="base-component.ts" />
/// <reference path="project-item.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../modules/drag-drop.ts" />
/// <reference path="../modules/project.ts" />
var App;
(function (App) {
    // Project List
    class ProjectList extends App.Component {
        constructor(templateId, hostId, type) {
            super(templateId, hostId, false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter(project => {
                    if (this.type === 'active') {
                        return project.status === App.ProjectStatus.Active;
                    }
                    return project.status === App.ProjectStatus.Finished;
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector('ul').id = listId;
            this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();
                const listEl = this.element.querySelector('ul');
                listEl.classList.add('droppable');
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData('text/plain');
            App.projectState.moveProject(prjId, this.type === 'active' ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector('ul');
            listEl.classList.remove('droppable');
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = '';
            for (const prjItem of this.assignedProjects) {
                // const newItem = new MyProjectItem('li', prjItem, listEl);
                // newItem.render()
                new App.ProjectItem(this.element.querySelector('ul').id, prjItem);
            }
        }
    }
    __decorate([
        App.AutoBind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.AutoBind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.AutoBind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
var App;
(function (App) {
    new App.ProjectInput('project-input', 'app');
    new App.ProjectList('project-list', 'app', 'active');
    new App.ProjectList('project-list', 'app', 'finished');
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map
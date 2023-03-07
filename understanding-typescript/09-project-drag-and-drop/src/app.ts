// Project Status
enum ProjectStatus { Active, Finished }

// Project type
class Project {
  constructor(
    public id: string,
    public title: string, 
    public description: string, 
    public people: number, 
    public status: ProjectStatus) {
    this.id = Math.random().toString();
    this.title = title;
    this.description = description;
    this.people = people;
  }
}

type Listener = (items: Project[]) => void;

// Project State Managment 
class ProjectState {
  listeners: Listener[] = [];
  projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if(!this.instance) {
      this.instance = new ProjectState();
    } 
    return this.instance;
  }

  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active  
    )

    this.projects.push(newProject);
    
    for(const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()) // To play around with referrence
    }
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }
}

const projectState = ProjectState.getInstance();

interface Validatable {
  value: string | number;
  require?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(ValidatableInput: Validatable) {
  let isValid = true;

  if(ValidatableInput.require) {
    isValid = isValid && ValidatableInput.value.toString().trim().length !== 0;
  }

  if(ValidatableInput.minLength != null && ValidatableInput.value === 'string') {
    isValid = isValid && ValidatableInput.value.length >= ValidatableInput.minLength
  }

  if(ValidatableInput.maxLength != null && ValidatableInput.value === 'string') {
    isValid = isValid && ValidatableInput.value.length <= ValidatableInput.maxLength
  }

  if(ValidatableInput.min != null && typeof ValidatableInput.value === 'number') {
    isValid = isValid && ValidatableInput.value >= ValidatableInput.min;
  }

  if(ValidatableInput.max != null && typeof ValidatableInput.value === 'number') {
    isValid = isValid && ValidatableInput.value <= ValidatableInput.max;
  }

  return isValid;
}

function AutoBind(_: any, _1: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);

      return boundFn;
    }
  }

  return adjDescriptor;  
}

class ProjectList {
  private templateElement: HTMLTemplateElement;
  private hostElement: HTMLDivElement;
  private element: HTMLElement;
  assignedProjects: Project[] = [];

  constructor(templateId: string, hostId: string, private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId)! as HTMLDivElement;
    this.assignedProjects = [];

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if(this.type === 'active') {
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


  private renderProjects() {
      const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
      listEl.innerHTML = '';

      for(const prjItem of this.assignedProjects) {
        const listItem = document.createElement('li');
        listItem.textContent = prjItem.title;
        listEl.appendChild(listItem);
      }
  }
  
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    
    this.element.querySelector('ul')!.id = listId;

    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element)
  }
}

class ProjectInput {
  private templateElement: HTMLTemplateElement;
  private hostElement: HTMLDivElement;
  private templateContentElement: HTMLFormElement;
  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;

  constructor(templateId: string, hostId: string) {
    // this.formId = templateId;
    // this.hostId = hostId;

    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId)! as HTMLDivElement;

    // Variantt 1
    // this.templateContentElement = this.templateElement.content.cloneNode(true) as HTMLFormElement;
    this.templateContentElement = this.templateElement.content.firstElementChild as HTMLFormElement;
    this.templateContentElement.id = "user-input";

    // Variant 2
    // const importedNode = document.importNode(this.templateElement.content, true);
    // this.templateContentElement = importedNode.firstElementChild as HTMLFormElement;
  
    this.titleInputElement = this.templateContentElement.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.templateContentElement.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.templateContentElement.querySelector('#people')! as HTMLInputElement;

    this.attach();
    this.configure();
  }

  private getherUserInput(): [title: string, description: string, people: number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      require: true
    }

    const desctiptionValidatable: Validatable = {
      value: enteredDescription,
      require: true,
      minLength: 5
    }

    const peopleValidatable: Validatable = {
      value: enteredPeople,
      require: true,
      min: 1
    }

    // if(enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0){
    if(
        !validate(titleValidatable) ||
        !validate(desctiptionValidatable) ||
        !validate(peopleValidatable)
      ) {
      // alert('Error! Fields must have value')
      console.error('Error! Fields must have value')
      return;
    }

    return [enteredTitle, enteredDescription, +enteredPeople];
  };

  private clearInputs():void {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();

    
    const userInput = this.getherUserInput();
    if(Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.templateContentElement.addEventListener('submit', this.submitHandler)
  }

  private attach() {
    // Variant 1
    this.hostElement.appendChild(this.templateContentElement);

    // Variant 2
    // this.hostElement.insertAdjacentElement('afterbegin', this.templateContentElement);
  }
}

const project = new ProjectInput('project-input', 'app');
const activeProjects = new ProjectList('project-list', 'app', 'active');
const finishedProjects = new ProjectList('project-list', 'app', 'finished');
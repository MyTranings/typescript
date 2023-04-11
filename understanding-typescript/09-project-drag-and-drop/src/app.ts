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

// Project State Managment 
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
  projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

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
      // Pass a copy ot the array by calling .slice()
      listenerFn(this.projects.slice()) // To play around with referrence
    }
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

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    if(newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}


// Project List
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  constructor(templateId: string, hostId: string, private type: 'active' | 'finished') {
    super(templateId, hostId, false, `${type}-projects`);

    this.assignedProjects = [];

    this.configure();
    this.renderContent();
  }

  configure() {
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
  }
  
  renderContent() {
    const listId = `${this.type}-projects-list`;
    
    this.element.querySelector('ul')!.id = listId;

    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
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
}

class ProjectInput extends Component<HTMLDivElement, HTMLElement> {
  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;

  constructor(templateId: string, hostId: string) {
    super(templateId, hostId, true, 'user-input');

    this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

    this.configure();
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler)
  }

  renderContent() {};

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
}

const project = new ProjectInput('project-input', 'app');
const activeProjects = new ProjectList('project-list', 'app', 'active');
const finishedProjects = new ProjectList('project-list', 'app', 'finished');
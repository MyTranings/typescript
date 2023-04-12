/// <reference path="base-component.ts" />
/// <reference path="project-item.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />
/// <reference path="../modules/drag-drop.ts" />
/// <reference path="../modules/project.ts" />

namespace App {
  // Project List
  export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(templateId: string, hostId: string, private type: 'active' | 'finished') {
      super(templateId, hostId, false, `${type}-projects`);

      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler)
      this.element.addEventListener('drop', this.dropHandler)
      this.element.addEventListener('dragleave', this.dragLeaveHandler)

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

    @AutoBind
    dragOverHandler(event: DragEvent): void {
      if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault()
        const listEl = this.element.querySelector('ul')! as HTMLUListElement;
        listEl.classList.add('droppable');
      }
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
      const prjId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    }
    
    @AutoBind
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector('ul')! as HTMLUListElement;
      listEl.classList.remove('droppable');
    }
    
    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listEl.innerHTML = '';

        for(const prjItem of this.assignedProjects) {
          // const newItem = new MyProjectItem('li', prjItem, listEl);
          // newItem.render()

          new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
        }
    }
  }
  
}
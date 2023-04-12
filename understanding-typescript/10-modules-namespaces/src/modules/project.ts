namespace App {
  export enum ProjectStatus { Active, Finished }

  // Project type
  export class Project {
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
}
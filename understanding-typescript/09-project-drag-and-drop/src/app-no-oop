// select form
// add form to the document
// validate the data 
// submit form 
// create single project
// add project to the list
function AutoBind1(_: any, _1: string, descriptor: PropertyDescriptor) {
  const orignalMethod = descriptor.value;
  const adjDescriptor = {
    configurable: true,
    get() {
      return orignalMethod.bind(this)
    }
  }
  return adjDescriptor;
}


// @AutoBind1
const projectInputTemplate = 'project-input';
      // projectTemplate = 'single-project',
      // projectListTemplate = 'project-list',


let formTemplate = document.getElementById(projectInputTemplate)! as HTMLTemplateElement;
let markup = formTemplate.content.cloneNode(true) as HTMLElement;

function handleForm() {
  
}

// const projectTemplate = 'single-project';

const appId = 'app';
const app = document.getElementById(appId)! as HTMLElement;
app.appendChild(markup);

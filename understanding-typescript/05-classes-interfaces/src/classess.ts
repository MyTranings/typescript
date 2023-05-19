abstract class Department {
  static fiscalYear = 2022;
  // name: string;
  // private employees: string[] = [];
  protected employees: string[] = [];
  
  constructor(protected readonly id: string, public name: string) {
    // this.name = n;
    console.log(Department.fiscalYear);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;
  // {
    // console.log(`Department ${this.id}: ${this.name}`);
  // }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length)
    console.log(this.employees)
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
  }
  describe(this: Department): void {
    console.log(ITDepartment);
    console.log(`Department ${this.name}`)
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if(this.lastReport) {
      return this.lastReport;
    }
    throw new Error('No report found.')
  }

  set mostRecentReport(value: string) {
    if(!value) {
      throw new Error ('Please pass correct value!')
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting')
    this.lastReport = reports[0]
  }

  static getInstance() {
    if(this.instance) {
      return this.instance;      
    } 
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  describe(this: Department): void {
    // console.log(`Department ${AccountingDepartment.id}: ${this.name}`)
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports);
  }

  addEmployee(name: string): void {
    if(name !== 'Max') {
      this.employees.push(name);
    }
  }
}

const it = new ITDepartment('d2', ['Max']);
console.log(it)
console.log(it.describe)

// const accounting = new AccountingDepartment('d2', ['Max']);
// Singleton
const accounting = AccountingDepartment.getInstance();
const accounting1 = AccountingDepartment.getInstance();

// setter 
accounting.mostRecentReport = 'Test'

console.log(accounting)
// getter
console.log(accounting.mostRecentReport)

accounting.addReport('Something went wrong ...')

console.log(accounting.mostRecentReport)

accounting.printReports()

accounting.addEmployee('Max');
accounting.addEmployee('Random');


// const test = new Department('d1', 'Test');

// test.describe();

// test.addEmployee('Max')
// test.addEmployee('Manu')

// test.employees[2] = 'Anna'

// test.printEmployeeInformation()

// const dummy = { name: 'Dummy', describe: accounting.describe }

// console.log(dummy.describe())
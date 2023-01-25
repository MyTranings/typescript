"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // name: string;
        // private employees: string[] = [];
        this.employees = [];
        // this.name = n;
        console.log(Department.fiscalYear);
    }
    static createEmployee(name) {
        return { name: name };
    }
    // {
    // console.log(`Department ${this.id}: ${this.name}`);
    // }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2022;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT');
        this.admins = admins;
    }
    describe() {
        console.log(ITDepartment);
        console.log(`Department ${this.name}`);
    }
}
class AccountingDepartment extends Department {
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.');
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('Please pass correct value!');
        }
        this.addReport(value);
    }
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }
    describe() {
        // console.log(`Department ${AccountingDepartment.id}: ${this.name}`)
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
    addEmployee(name) {
        if (name !== 'Max') {
            this.employees.push(name);
        }
    }
}
const it = new ITDepartment('d2', ['Max']);
console.log(it);
console.log(it.describe);
// const accounting = new AccountingDepartment('d2', ['Max']);
// Singleton
const accounting = AccountingDepartment.getInstance();
const accounting1 = AccountingDepartment.getInstance();
// setter 
accounting.mostRecentReport = 'Test';
console.log(accounting);
// getter
console.log(accounting.mostRecentReport);
accounting.addReport('Something went wrong ...');
console.log(accounting.mostRecentReport);
accounting.printReports();
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
//# sourceMappingURL=classess.js.map
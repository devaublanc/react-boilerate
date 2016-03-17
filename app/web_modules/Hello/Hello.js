export default class Hello {

  constructor() {
    this.name = 'benjamin';
    this.age = 27;
  }

  incrementAge(num) {
    this.age += num;
  }

  getName() {
    return this.name;
  }

  getAge() {
    return this.age;
  }
}

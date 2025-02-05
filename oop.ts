class Person {
  
    constructor(
      public name: string,
      private age: number,
      protected lang: string = "TypeScript",
    ) {}
  
  }
  
  class Action extends Person {
   construtor() {}
  
   public speaks() {
    console.log(`${this.name} is speaking! Please shut up. Also don't forget that his fav programming lang is ${this.lang}`);
   }
  }
  
  const action = new Action("Pranav", 20);
  
  action.speaks();
  console.log(action.name);
  console.log(action.age); // not accessible
  console.log(action.lang); // not accessible
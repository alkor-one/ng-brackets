import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-brackets';
  message: string = '';
  expression = new FormControl();

  isValid(str: any): boolean {
    const range = '[{(<>)}]';
    let result = true;
    for(let char in str) {
      result = range.includes(str[char]);
    }
    return result;
  }

  isBalanced(exp: string): boolean {
    let stack: string[] = [];
    const closeRange = '>)}]';
    // Create new expression and add '-' to the close brackets
    const newExp = exp.split('').map(i => closeRange.includes(i) ? ('-' + i) : i);
    // compare input item with the first item in the stack by ASCII value
    function hasPair(i: string) {
      return i[1].charCodeAt(0) - stack[0]?.charCodeAt(0);
    }
    // check if item includes '-', if no, put it in the stack, if yes, compare it with the first item in the stack by ASCII
    // value, and if they are a pair, pop it from the stack
    newExp.forEach(i => (i.includes('-') && hasPair(i) < 3) ? stack.shift() : stack.unshift(i));
    return !stack.length;
  }

   checkIfBalanced() {
     if(this.isValid(this.expression.value)) {
       this.message = this.isBalanced(this.expression.value) ? 'Expression is balanced!' : 'Expression is NOT balanced!'
     }
     else this.message = 'Please provide brackets only!'
   }
}

import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RandomGeneratorService } from './random-number-generator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'randomNumberGenerator';

  constructor(private randomGeneratorService: RandomGeneratorService) {}

  number = new FormControl('');
  
  randomNumbers:any;

  generateRandomNumbers() {
    if(this.number.value){
      this.randomGeneratorService.getRandomNumbers(this.number.value).subscribe(x => {
        this.randomNumbers = x;
      })
    }    
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'memory-game';
  images = [
    'assets/img1.jpeg',
    'assets/img2.jpeg',
    'assets/img3.jpeg',
    'assets/img4.jpeg',
    'assets/img5.jpeg',
    'assets/img6.jpeg',
    'assets/img7.jpeg',
    'assets/img8.jpeg',
    'assets/img1.jpeg',
    'assets/img2.jpeg',
    'assets/img3.jpeg',
    'assets/img4.jpeg',
    'assets/img5.jpeg',
    'assets/img6.jpeg',
    'assets/img7.jpeg',
    'assets/img8.jpeg',
  ];
  clicked: boolean[] = 'true,'.repeat(16).split(',').map(t => t.replace(',', '') === 'true');
  selected: number[] = [];
  correct: number[] = [];
  noOfTries: number = this.images.length + 4;

  ngOnInit(): void {
    this.images = this.images.sort((a, b) => Math.random() - .5);

    setTimeout(() => {
      this.clicked = this.clicked.map(state => false)
    }, 1500)
  }

  rotateImage(idx: number) {
    this.clicked[idx] = true;
  }

  selectCard(idx: number) {
    this.noOfTries--;

    if (this.noOfTries < 0) {
      alert("You lost, try again");
      return;
    }

    if (this.correct.includes(idx)) {
      return;
    }

    if (this.selected.length === 1) {
      if (this.images[this.selected[0]] !== this.images[idx]) {
        setTimeout(() => {
          this.clicked[this.selected[0]] = false;
          this.clicked[idx] = false;

          this.selected = [];
        }, 1000)
      } else {
        // selected correctly
        this.correct.push(this.selected[0], idx);
        this.selected = [];

        // check if you have won
        const won = this.clicked.every(state => state === true);
        if (won) {
          alert('Yay!!!! you won');
        }
      }
    } else {
      this.selected.push(idx);
    }
  }
}

import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements AfterViewInit {

  ngAfterViewInit(): void {
    this.animateFooterBoxes();
  }

  private animateFooterBoxes(): void {
    const footerBoxes = document.querySelectorAll('.footer-box');
    
    footerBoxes.forEach((box: Element, index: number) => {
      (box as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });
  }
}
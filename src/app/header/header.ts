import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements AfterViewInit {
  
  ngAfterViewInit() {
    const boxes = document.querySelectorAll('.header-box');
    boxes.forEach((box, index) => {
      (box as HTMLElement).style.animationDelay = `${index * 0.2}s`;
    });
  }
}
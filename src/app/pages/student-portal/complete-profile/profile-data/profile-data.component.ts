import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss'],
})
export class ProfileDataComponent {
  toggleSelectMenu(event: any) {
    // close other dropdown options
    event.preventDefault();
    let mainElement = event.target;
    const element = document.querySelectorAll('.select-list');
    element.forEach((el) => {
      if (
        el.classList.contains('active') &&
        el !== mainElement.nextElementSibling
      ) {
        el.classList.remove('active');
      }
    });

    if (mainElement.nodeName !== 'BUTTON') mainElement = mainElement.parentNode;

    // add show class to dropdown options
    for (let i = 0; i < mainElement.children.length; i++) {
      if (mainElement.children[i].classList.contains('select-list')) {
        mainElement.children[i].classList.toggle('active');
      }
    }
    // close dropdown options when click outside
    document.addEventListener('mousedown', (e: any) => {
      if (!e.target?.classList.contains('select-item')) {
        element.forEach((el) => {
          if (el.classList.contains('active')) {
            el.classList.remove('active');
          }
        });
      }
    });
  }
}

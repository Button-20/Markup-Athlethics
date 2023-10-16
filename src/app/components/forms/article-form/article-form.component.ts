import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required]),
  });

  file: any = null;

  tagList: string[] = ['News', 'Article'];

  constructor() {}

  submit() {
    this.onSubmit.emit(this.articleForm.value);
  }

  toggleSelectMenu(event: any, closeOnSelect: boolean = true) {
    // close other dropdown options
    event.preventDefault();
    let mainElement = event.target;
    const element = document.querySelectorAll('.select-list');
    element.forEach((el) => {
      if (
        el.classList.contains('active') &&
        el !== mainElement.nextElementSibling &&
        closeOnSelect
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

    if (closeOnSelect) {
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

  selectItem(item: string, type: string) {
    const formControl = this.articleForm.get(type) as FormControl;
    formControl.setValue(item);
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.file = event.dataTransfer?.files[0] || event.target.files[0];

    this.articleForm.patchValue({
      institution_id: this.file,
    });
  }

  removeFile(e: any, index: number) {
    e.preventDefault();
    this.file = null;
    this.articleForm.patchValue({
      institution_id: this.file,
    });
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  get title() {
    return this.articleForm.get('title') as FormControl;
  }

  get content() {
    return this.articleForm.get('content') as FormControl;
  }

  get image() {
    return this.articleForm.get('image') as FormControl;
  }

  get tag() {
    return this.articleForm.get('tag') as FormControl;
  }
}

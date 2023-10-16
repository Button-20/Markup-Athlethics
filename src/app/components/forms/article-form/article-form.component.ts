import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { StudentsService } from 'src/app/services/api/students/students.service';
import { News } from '../../../services/core/IApp';

@Component({
  selector: 'article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent {
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  @Input() article: News | any = null;

  articleForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    imagePath: new FormControl(null, [Validators.required]),
    tag: new FormControl('', [Validators.required]),
  });

  tagList: string[] = ['News', 'Article'];

  editor: Editor | any;
  html = '';

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  constructor(private studentService: StudentsService) {}

  ngOnInit() {
    this.editor = new Editor();
  }

  ngOnChanges() {
    if (this.article) {
      this.articleForm.patchValue({
        title: this.article.title,
        body: this.article.body,
        imagePath: this.article.imagePath,
        tag: this.article.tag,
      });
    }
  }

  submit() {
    this.onSubmit.emit(this.articleForm.value);
    this.articleForm.reset();
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
    const file = event.dataTransfer?.files[0] || event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      let url = await this.studentService.uploadImage({
        file: reader.result as string,
      });
      const imagePath = this.articleForm.get('imagePath') as FormControl;
      imagePath.setValue(url);
    };
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  get title() {
    return this.articleForm.get('title') as FormControl;
  }

  get body() {
    return this.articleForm.get('body') as FormControl;
  }

  get imagePath() {
    return this.articleForm.get('imagePath') as FormControl;
  }

  get tag() {
    return this.articleForm.get('tag') as FormControl;
  }
}

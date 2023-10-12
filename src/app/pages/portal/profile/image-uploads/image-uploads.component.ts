import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/api/students/students.service';

@Component({
  selector: 'app-image-uploads',
  templateUrl: './image-uploads.component.html',
  styleUrls: ['./image-uploads.component.scss'],
})
export class ImageUploadsComponent {
  profileDataForm: FormGroup = new FormGroup({
    images: new FormControl([], [Validators.required]),
  });

  files: any[] = [];

  constructor(public studentsService: StudentsService) {}

  async ngOnInit() {
    await this.studentsService.getImageData();
    this.profileDataForm.patchValue({
      images: this.studentsService.images,
    });
    this.files = this.studentsService.images;
  }

  onSubmit() {
    console.log(this.profileDataForm.value);
  }

  onInputChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.files.push({
          name: file.name,
          type: file.type,
          size: file.size,
          image_url: reader.result,
        });
      };
    }

    this.profileDataForm.patchValue({
      images: this.files,
    });
  }

  removeImage(e: any, index: number) {
    e.preventDefault();
    this.files.splice(index, 1);
    this.profileDataForm.patchValue({
      images: this.files,
    });
  }
}

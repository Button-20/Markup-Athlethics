import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
          url: reader.result,
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

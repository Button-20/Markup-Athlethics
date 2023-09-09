import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-video-uploads',
  templateUrl: './video-uploads.component.html',
  styleUrls: ['./video-uploads.component.scss'],
})
export class VideoUploadsComponent {
  profileDataForm: FormGroup = new FormGroup({
    videos: new FormControl([], [Validators.required]),
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
        })
      };
    }
    console.log(this.files);
    this.profileDataForm.patchValue({
      videos: this.files,
    });
  }

  removeVideo(e: any, index: number) {
    e.preventDefault();
    this.files.splice(index, 1);
    this.profileDataForm.patchValue({
      videos: this.files,
    });
  }
}

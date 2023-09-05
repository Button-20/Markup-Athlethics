import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalsService } from 'src/app/services/core/globals';

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

  constructor(
    private globals: GlobalsService
  ) {}

  gotoDashboard() {
    this.globals.router.navigate(['/student/dashboard']);
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.files = [...(event.dataTransfer?.files || event.target.files)];

    this.profileDataForm.patchValue({
      images: this.files,
    });
  }

  removeFile(e: any, index: number) {
    e.preventDefault();
    this.files.splice(index, 1);
    this.profileDataForm.patchValue({
      letters: this.files,
    });
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }
}

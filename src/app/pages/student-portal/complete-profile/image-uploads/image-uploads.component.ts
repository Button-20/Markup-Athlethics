import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/api/users/users.service';
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
    private globals: GlobalsService,
    public usersService: UsersService
  ) {}

  async onSubmit() {
    await this.usersService.postImageData(this.files);
  }

  gotoDashboard() {
    this.globals.router.navigate(['/student/dashboard']);
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.files = [...(event.dataTransfer?.files || event.target.files)];
    if (this.files.map((file) => file.type).includes('image/jpeg')) {
      this.profileDataForm.patchValue({
        images: this.files,
      });
    } else {
      alert('Please upload only jpeg files');
      this.files = [];
    }
  }

  removeFile(e: any, index: number) {
    e.preventDefault();
    this.files.splice(index, 1);
    this.profileDataForm.patchValue({
      images: this.files,
    });
  }
}

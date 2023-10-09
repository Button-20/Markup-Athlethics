import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentsService } from 'src/app/services/api/students/students.service';
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
    public studentsService: StudentsService
  ) {}

  async onSubmit() {
    if (this.profileDataForm.invalid) return;
    let image_path: string[] = [];
    for (let i = 0; i < this.profileDataForm.value.images.length; i++) {
      const element = this.profileDataForm.value.images[i];
      const reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = async () => {
        let url: any = await this.studentsService.uploadImage({
          file: reader.result,
        });
        image_path.push(url);
        if (image_path.length !== this.profileDataForm.value.images.length)
          return;
        await this.studentsService.postImageData(image_path);
        this.files = [];
        this.profileDataForm.reset();
        this.globals.router.navigate([
          '/portal/complete-profile/video-uploads',
        ]);
      };
    }
  }

  gotoDashboard() {
    this.globals.router.navigate(['/portal/dashboard']);
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.files = [...(event.dataTransfer?.files || event.target.files)];
    if (
      this.files.map((file) => file.type).includes('image/jpeg' || 'image/png')
    ) {
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

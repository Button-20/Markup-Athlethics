import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/api/users/users.service';
import { GlobalsService } from 'src/app/services/core/globals';

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

  constructor(
    private globals: GlobalsService,
    private usersService: UsersService
  ) {}

  async onSubmit() {
    if (this.profileDataForm.invalid) return;
    let video_path: string[] = [];
    for (let i = 0; i < this.profileDataForm.value.videos.length; i++) {
      const element = this.profileDataForm.value.videos[i];
      let url: any = await this.usersService.uploadImage({
        file: element,
        resource_type: 'auto',
      });
      video_path.push(url);
      if (video_path.length !== this.profileDataForm.value.videos.length)
        return;
      await this.usersService.postVideoData(video_path);
      this.files = [];
      this.profileDataForm.reset();
      this.globals.router.navigate([
        '/student/complete-profile/profile-complete',
      ]);
    }
  }

  gotoDashboard() {
    this.globals.router.navigate(['/student/dashboard']);
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.files = [...(event.dataTransfer?.files || event.target.files)];
    if (this.files.map((file) => file.type).includes('video/mp4')) {
      this.profileDataForm.patchValue({
        videos: this.files,
      });
    } else {
      alert('Please upload only mp4 files');
      this.files = [];
    }
  }

  removeFile(e: any, index: number) {
    e.preventDefault();
    this.files.splice(index, 1);
    this.profileDataForm.patchValue({
      videos: this.files,
    });
  }
}

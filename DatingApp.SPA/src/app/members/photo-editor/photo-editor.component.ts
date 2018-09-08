import { environment } from './../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input()photos: Photo[];
  // @Output() GetMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }

  // setMainPhoto(photo: Photo) {
  //   this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
  //     this.currentMain = _.findWhere(this.photos, {isMain: true});
  //     this.currentMain.isMain = false;
  //     photo.isMain = true;
  //     this.authService.changeMemberPhoto(photo.url);
  //     this.authService.currentUser.photoUrl = photo.url;
  //     localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }

  // deletePhoto(id: number) {
  //   this.alertify.confirm('Are you sure you want to delete this photo?', () => {
  //     this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
  //       this.photos.splice(_.findIndex(this.photos, {id: id}), 1);
  //       this.alertify.success('Photo has been deleted');
  //     }, error => {
  //       this.alertify.error('Failed to delete photo')
  //     });
  //   });
  // }
}

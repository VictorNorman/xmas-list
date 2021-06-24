import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  giftPicture: string = '';

  /* Use the device camera to take a photo:
  // https://capacitor.ionicframework.com/docs/apis/camera
  */
  public async takePicture() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
        quality: 30, // medium-low quality (0 to 100)
        allowEditing: false,
      });
      return capturedPhoto.base64String;
    } catch (error) {
      console.log(error);
    }
  }
}
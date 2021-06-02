cp resources/icon.png resources/android/icon-foreground.png

cp resources/android/icon/hdpi-foreground.png android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png
cp resources/android/icon/hdpi-foreground.png android/app/src/main/res/mipmap-hdpi/ic_launcher.png

cp resources/android/icon/xxxhdpi-foreground.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png
cp resources/android/icon/xxxhdpi-foreground.png android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png

cp resources/android/icon/xxhdpi-foreground.png android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png
cp resources/android/icon/xxhdpi-foreground.png android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png

cp resources/android/icon/xhdpi-foreground.png android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png
cp resources/android/icon/xhdpi-foreground.png android/app/src/main/res/mipmap-xhdpi/ic_launcher.png

cp resources/android/icon/mdpi-foreground.png android/app/src/main/res/mipmap-mdpi/ic_launcher.png
cp resources/android/icon/mdpi-foreground.png android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png

# Create splash screens
cordova-res android --copy --skip-config --verbose --type splash


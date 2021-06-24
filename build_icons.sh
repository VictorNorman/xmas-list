
# Make icon.png point to the android version
cd resources
ln -s logo-nobackground-5000-android.png icon.png
cd ..
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

# Remove the symbolic link.
rm resource/icon.png

# IOS
cd resources
ln -s logo-nobackground-5000-ios.png icon.png
cd ..
cordova-res ios --copy --skip-config --verbose --type icon

###
###
# NOTE: about building for Android
##
# Following these instructions:
# https://ionicframework.com/docs/deployment/play-store
# To create a keystore for building a release build, I did this:
# keytool -genkey -v -keystore gift-lists-android-key.keystore -alias my-alias -keyalg RSA -keysize 2048 -validity 10000
# It asks for a password. I chose my Gen1:1 password
# For Organizational Unit, I used edu.calvincs.norman.victor
# Output: Is CN=Victor Norman, OU=edu.calvincs.norman.victor, O=Unknown, L=Grand Rapids, ST=MI, C=US correct?

# jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore gift-lists-android-key.keystore android/app/build/outputs/apk/debug/app-debug.apk my-alias
# ~/Library/Android/sdk/build-tools/30.0.2/zipalign -v 4 android/app/build/outputs/apk/debug/app-debug.apk GiftLists.apk

# NOTE: this didn't seem to produce an apk that I could send to people in email or install from google drive.
# Instead, I'm using Android Studio Build APK... to create a release version.
#
# Trying to build an App Bundle instead.  Using key alias = "upload"
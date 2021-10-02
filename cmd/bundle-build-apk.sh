
## copy the default android debug keystore file first if not yet:
## from root project:
# cp ~/.android/debug.keystore android/app

cd android

## get app version
# app_version=$(./gradlew -q printVersionName)
while read line; do
  if echo "$line" | grep -q "versionName \"" ; then app_version=${line/versionName /""}; fi
done <app/build.gradle
app_version="${app_version%\"}"
app_version="${app_version#\"}"
app_version=$app_version-`date +"%m%d-%H%M"`
echo "detected app_version=$app_version"

apk_with_version=app-demo-bundle-$app_version.aab

./gradlew bundleRelease --no-daemon
cd app/build/outputs/bundle/release
mv app.aab $apk_with_version
open .
cd ../../../../../../

adb install -r android/app/build/outputs/bundle/release/$apk_with_version

say "yo, build bundle APK done"

package com.betmasters;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage; // <-- Add this line
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this line
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // <-- Add this line
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // <-- Add this line
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage; // <-- Add this line
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage; //<-- Add this line
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFirebasePackage(),
            new RNFirebaseDatabasePackage(), // <-- Add this line
            new RNFirebaseStoragePackage(), // <-- Add this line
            new RNFirebaseFirestorePackage(), // <-- Add this line
            new RNFirebaseMessagingPackage(), // <-- Add this line
            new RNFirebaseNotificationsPackage(),
            new RNFirebaseAuthPackage(),
            new RNFetchBlobPackage(),
            new FBSDKPackage(mCallbackManager),
            new RNGoogleSigninPackage(),
            new LinearGradientPackage(),
            new RNI18nPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}

package com.calcit.floorplanner;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // for splash screen stuff
import android.os.Bundle; // for splash screen stuff

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CalcItFloorplanner";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
  }
}

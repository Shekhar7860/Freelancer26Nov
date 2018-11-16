package com.freelancetest;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;
public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "freelancetest";
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(MainActivity.this);
        super.onCreate(savedInstanceState);
    }
}

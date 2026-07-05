# Authentication Setup Guide

This document describes how to configure Google and Apple OAuth integrations.

## Google Authentication

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services** > **Credentials**.
4. Click **Create Credentials** and select **OAuth client ID**.
5. Configure the OAuth consent screen if you haven't already.
6. Set the **Application type** to "Web application".
7. Under **Authorized JavaScript origins**, add your app's base URL (e.g., `http://localhost:3000`).
8. Under **Authorized redirect URIs**, add your redirect path (e.g., `http://localhost:3000/api/auth/google/callback`).
9. Save and note your **Client ID** and **Client Secret**.
10. Add these to your `.env` file:
    ```env
    GOOGLE_CLIENT_ID=your_client_id
    GOOGLE_CLIENT_SECRET=your_client_secret
    ```

## Apple Authentication

1. Go to the [Apple Developer Console](https://developer.apple.com/).
2. Navigate to **Certificates, Identifiers & Profiles**.
3. Under **Identifiers**, create a new App ID and enable **Sign In with Apple**.
4. Create a new **Services ID** for your web app and enable **Sign In with Apple**, configuring it with your primary App ID.
5. In the Service ID configuration, set the **Web Domain** and **Return URLs** (e.g., `https://your-domain.com/api/auth/apple/callback`).
6. Register a new **Key** under **Keys** and enable **Sign In with Apple**.
7. Download the key file (`.p8`) and note your **Key ID** and **Team ID**.
8. Add the following to your `.env` file:
    ```env
    APPLE_CLIENT_ID=your_service_id
    APPLE_TEAM_ID=your_team_id
    APPLE_KEY_ID=your_key_id
    APPLE_PRIVATE_KEY="contents of your .p8 file"
    ```

## Firebase Alternative

If you are using Firebase Authentication, you can enable the Google and Apple sign-in providers directly in the Firebase Console under **Authentication > Sign-in method**. Follow the Firebase setup instructions provided in the console to link your Apple Developer and Google Cloud credentials.

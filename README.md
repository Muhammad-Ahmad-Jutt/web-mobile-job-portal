# JobPortal Mobile App

A hybrid mobile application built with Apache Cordova for job searching, applying, and profile management.

## Features

- **Job Browsing**: View available jobs filtered by location (city/country based on user's GPS).
- **Job Application**: Apply for jobs by uploading PDF resumes.
- **Application Tracking**: View applied jobs with details and timestamps.
- **Profile Management**: Create and edit user profiles with personal info and profile pictures.
- **Location Services**: Automatic location detection for job filtering.

## Prerequisites

- Node.js and npm installed
- Android SDK (for Android builds)
- Cordova CLI: `npm install -g cordova`
- A physical Android device or emulator for testing

## Installation

1. Clone or download the project:
   ```
   git clone <repository-url>
   cd jobportal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Add Android platform:
   ```
   cordova platform add android
   ```

4. Build the app:
   ```
   cordova build android
   ```

## Running the App

### On Device
1. Connect your Android device via USB with USB debugging enabled.
2. Run:
   ```
   cordova run android --device
   ```

### On Emulator
1. Start an Android emulator.
2. Run:
   ```
   cordova run android
   ```

## Usage

### Home Screen
- **Live Jobs**: Browse available job listings.
- **Applied Jobs**: View jobs you've applied for.
- **My Profile**: Manage your profile information.

### Job Browsing
- Jobs are automatically filtered based on your current location (city/country).
- Click on any job to view details and apply.

### Applying for Jobs
1. Select a job from the list.
2. Choose a PDF resume file.
3. Click "Apply Job".
4. If already applied, you'll see a notification.

### Profile Management
1. Click "My Profile" from the home screen.
2. View your current profile information.
3. Click "Edit Profile" to update:
   - Name, Email, Phone, Bio
   - Profile picture (take photo or select from gallery)
4. Save changes.

## App Permissions

The app requests the following permissions:
- **Location**: For filtering jobs by location
- **Storage**: For saving application data locally

Grant permissions when prompted for full functionality.

## Technologies Used

- **Apache Cordova**: Hybrid app framework
- **HTML/CSS/JavaScript**: Frontend
- **Local Storage**: Data persistence
- **Cordova Plugins**:
  - cordova-plugin-geolocation: Location services
  - cordova-plugin-file: File handling

## Project Structure

```
jobportal/
├── config.xml              # Cordova configuration
├── package.json            # Node dependencies
├── www/                    # Web assets
│   ├── index.html          # Home screen
│   ├── jobs.html           # Job listings
│   ├── apply-job.html      # Job application
│   ├── saved-jobs.html     # Applied jobs
│   ├── profile.html        # Profile management
│   ├── css/                # Stylesheets
│   ├── js/                 # JavaScript files
│   └── data/               # Job data (JSON)
├── platforms/              # Platform-specific code
└── plugins/                # Cordova plugins
```

## Troubleshooting

- **App not starting**: Ensure Cordova is installed and platforms are added.
- **Location not working**: Grant location permissions in device settings.
- **Jobs not loading**: Check internet connection for initial data fetch.
- **Camera not working**: Ensure camera permissions are granted.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test
4. Submit a pull request

## License

This project is licensed under the Apache License 2.0.
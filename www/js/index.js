/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Device ready - Home Screen loaded');

    // Request location permission if not granted
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                console.log('Location access granted. Position:', position);
                localStorage.setItem('userLat', position.coords.latitude);
                localStorage.setItem('userLng', position.coords.longitude);
            },
            function(error) {
                console.log('Location access denied or error:', error);
                localStorage.removeItem('userLat');
                localStorage.removeItem('userLng');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    }

    document.getElementById('browseJobsBtn').addEventListener('click', () => {
    window.location.href = 'jobs.html';
    });

    document.getElementById('profileBtn').addEventListener('click', () => {
        window.location.href = 'profile.html';
    });
    document.getElementById('MyJobsBtn').addEventListener('click',()=> {
        window.location.href ='saved-jobs.html'
    })
}

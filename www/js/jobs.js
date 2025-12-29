// Function to get user's city and country via reverse geocoding
async function getUserLocationInfo() {
    const lat = localStorage.getItem('userLat');
    const lng = localStorage.getItem('userLng');
    if (!lat || !lng) {
        return null;
    }
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        const data = await response.json();
        const address = data.address;
        return {
            city: address.city || address.town || address.village,
            country: address.country
        };
    } catch (error) {
        console.error('Error reverse geocoding:', error);
        return null;
    }
}

function filterJobsByLocation(jobs, userLocation) {
    if (!userLocation) {
        return jobs; // No location, show all jobs
    }
    return jobs.filter(job => {
        const jobLocation = job.location.toLowerCase();
        const city = userLocation.city ? userLocation.city.toLowerCase() : '';
        const country = userLocation.country ? userLocation.country.toLowerCase() : '';
        return jobLocation.includes(city) || jobLocation.includes(country);
    });
}

async function loadJobs() {
    try {
        const userLocation = await getUserLocationInfo();
        const response = await fetch('data/jobs.json');
        let jobs = await response.json();

        jobs = filterJobsByLocation(jobs, userLocation);

        const jobList = document.getElementById('jobList');
        jobList.innerHTML = '';

        if (jobs.length === 0) {
            jobList.innerHTML = '<li>No jobs found in your area. Showing all jobs...</li>';
            const allResponse = await fetch('data/jobs.json');
            jobs = await allResponse.json();
        }

        jobs.forEach(job => {
            const li = document.createElement('li');
            li.classList.add('job-item');

            li.innerHTML = `
            <a href="apply-job.html?id=${job.id}" class="job-link">
              <div class="job-title">${job.title}</div>
              <div class="job-company">${job.company}</div>
              <div class="job-location"><strong>Location:</strong> ${job.location}</div>
              <div class="job-type"><strong>Type:</strong> ${job.type}</div>
              <div class="job-salary"><strong>Salary:</strong> ${job.salary}</div>
              <div class="job-description">${job.description}</div>
              </a>
            `;

            jobList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading jobs:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadJobs);

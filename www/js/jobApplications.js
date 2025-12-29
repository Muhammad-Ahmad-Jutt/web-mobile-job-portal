document.addEventListener('DOMContentLoaded', () => {
  const jobList = document.getElementById('jobList');

  if (!jobList) {
    console.error('jobList element not found in DOM!');
    return;
  }

  const jobs = JSON.parse(localStorage.getItem('jobApplications') || '[]');

  if (jobs.length === 0) {
    jobList.innerHTML = '<li>No applications found</li>';
    return;
  }

  jobs.forEach(job => {
    const li = document.createElement('li');
    li.classList.add('job-item');
    li.innerHTML = `
      <a href="apply-job.html?id=${job.job_id}" class="job-link">
        <div class="job-title">${job.job.title}</div>
        <div class="job-company">${job.job.company}</div>
        <div class="job-location"><strong>Location:</strong> ${job.job.location}</div>
        <div class="job-type"><strong>Type:</strong> ${job.job.type}</div>
        <div class="job-salary"><strong>Salary:</strong> ${job.job.salary}</div>
        <div class="job-description">${job.job.description}</div>
        <div class="application-info"><strong>Applied on:</strong> ${new Date(job.timestamp).toLocaleString()}</div>
        <div class="application-info"><strong>Resume:</strong> ${job.file_name}</div>
      </a>
    `;
    jobList.appendChild(li);
  });
});

document.addEventListener('deviceready', () => {
  // Cordova is ready
});

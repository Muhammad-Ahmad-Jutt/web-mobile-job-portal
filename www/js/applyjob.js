


const params = new URLSearchParams(window.location.search);
const jobId = parseInt(params.get('id'));
let currentJob = null;

fetch('data/jobs.json')
  .then(response => response.json())
  .then(jobs => {
    currentJob = jobs.find(job => job.id === jobId);
    if (!currentJob) {
      document.body.innerHTML = '<h2>Job not found</h2>';
      return;
    }
    document.getElementById('title').textContent += currentJob.title;
    document.getElementById('company').textContent += currentJob.company;
    document.getElementById('location').textContent += currentJob.location;
    document.getElementById('type').textContent += currentJob.type;
    document.getElementById('salary').textContent += currentJob.salary;
    document.getElementById('description').textContent += currentJob.description;
  })
  .catch(error => {
    console.error('Error loading job:', error);
    document.body.innerHTML = '<h2>Error loading job</h2>';
  });

function saveJobApplication(jobId, fileName, job, callback) {
  const data = {
    job_id: jobId,
    file_name: fileName,
    timestamp: new Date().toISOString(),
    job: job
  };

  const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
  applications.push(data);
  localStorage.setItem('jobApplications', JSON.stringify(applications));
  callback(true);
}

function checkIfAlreadyApplied(jobId, callback) {
  const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
  const alreadyApplied = applications.some(app => app.job_id === jobId);
  callback(alreadyApplied);
}

document.getElementById('applyBtn').addEventListener('click', () => {
  if (!currentJob) {
    alert('Job data not loaded yet. Please wait.');
    return;
  }

  const fileInput = document.getElementById('resume');

  if (!fileInput.files.length) {
    alert('Please select a PDF resume');
    return;
  }

  const file = fileInput.files[0];

  if (file.type !== 'application/pdf') {
    alert('Only PDF files are allowed');
    return;
  }

  checkIfAlreadyApplied(jobId, (alreadyApplied) => {
    if (alreadyApplied) {
      alert('You have already applied for this job.');
      return;
    }

    saveJobApplication(jobId, file.name, currentJob, (success) => {
      if (success) {
        alert(`Job Applied: ${file.name}`);
      } else {
        alert('Failed to apply. Please try again.');
      }
    });
  });
});

document.addEventListener('deviceready', () => {
  
});


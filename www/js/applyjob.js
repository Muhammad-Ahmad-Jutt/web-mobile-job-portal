


const params = new URLSearchParams(window.location.search);
const jobId = parseInt(params.get('id'));

function saveJobApplication(jobId, fileName) {
  const data = {
    job_id: jobId,
    file_name: fileName,
    timestamp: new Date().toISOString()
  };

  const fileNameOnDevice = 'jobApplications.json';

  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, dir => {
    dir.getFile(fileNameOnDevice, { create: true }, file => {
      file.file(f => {
        const reader = new FileReader();
        reader.onloadend = function() {
          let applications = [];
        if (this.result) {
            try {
              applications = JSON.parse(this.result);
            } catch (err) {
              console.warn('JSON parse error, creating new array');
            }
          }
          applications.push(data);

          file.createWriter(writer => {
            writer.onwriteend = () => console.log('Application saved successfully!');
            writer.onerror = err => console.error('Write error:', err);
            writer.write(JSON.stringify(applications, null, 2));
          });
        };
             f.arrayBuffer ? reader.readAsText(f) : reader.readAsText(f);
      });
    });
  }, err => console.error('FS error:', err));
}


fetch('data/jobs.json')
    .then(response => response.json())
    .then(jobs => {

      const job = jobs.find(job => job.id === jobId);
      if (!job) {
        document.body.innerHTML = '<h2>Job not found</h2>';
        return;
      }
      document.getElementById('title').textContent += job.title;
      document.getElementById('company').textContent += job.company;
      document.getElementById('location').textContent += job.location;
      document.getElementById('type').textContent += job.type;
      document.getElementById('salary').textContent += job.salary;
      document.getElementById('description').textContent += job.description;
    });
document.getElementById('applyBtn').addEventListener('click', () => {
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
  setTimeout(() => {
  saveJobApplication(jobId,file.name)
   }, 100);
  alert(`Job Applied: ${file.name}`);
});


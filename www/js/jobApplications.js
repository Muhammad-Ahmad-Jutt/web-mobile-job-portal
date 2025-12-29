document.addEventListener('deviceready', () => {
  console.log('Device is ready');

  const jobList = document.getElementById('jobList');
  console.log('jobList element:', jobList);

  if (!jobList) {
    console.error('jobList element not found in DOM!');
    return;
  }

  console.log('Resolving dataDirectory:', cordova.file.dataDirectory);

  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, dir => {
    console.log('dataDirectory resolved:', dir);

    dir.getFile('jobApplications.json', { create: true }, fileEntry => {
      console.log('File entry obtained:', fileEntry);

      fileEntry.file(file => {
        console.log('File object:', file);

        const reader = new FileReader();

        reader.onloadstart = () => console.log('Reading file started');
        reader.onload = () => console.log('Reading file progress...');
        reader.onloadend = function() {
          console.log('Reading file ended');
          console.log('Raw file content:', this.result);

          let jobs = [];
          if (this.result && this.result.trim().length > 0) {
            try {
              jobs = JSON.parse(this.result);
              console.log('Parsed jobs JSON:', jobs);
            } catch (err) {
              console.error('JSON parse error:', err);
            }
          } else {
            console.log('File is empty or whitespace');
          }

          if (jobs.length === 0) {
            console.log('No applications found');
            jobList.innerHTML = '<li>No applications found</li>';
            return;
          }

          jobs.forEach(job => {
            console.log('Processing job:', job);

            const li = document.createElement('li');
            li.classList.add('job-item');
            li.innerHTML = `
              <a href="apply-job.html?id=${job.job_id}" class="job-link">
                Job ID: ${job.job_id}, File: ${job.file_name}
              </a>
            `;
            jobList.appendChild(li);
          });
        };

        reader.onerror = e => console.error('FileReader error:', e);

        console.log('Starting to read file as text...');
        reader.readAsText(file);
      }, err => console.error('Error getting file object:', err));
    }, err => {
      console.error('Error getting file entry:', err);
      jobList.innerHTML = '<li>No applications found</li>';
    });
  }, err => console.error('Error resolving dataDirectory:', err));
});

    fetch('data/jobs.json')
      .then(response => response.json())
      .then(jobs => {
        const jobList = document.getElementById('jobList');
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
      })
      .catch(error => {
        console.error('Error loading jobs:', error);
      });

document.addEventListener('DOMContentLoaded', () => {
  const profileView = document.getElementById('profileView');
  const profileForm = document.getElementById('profileForm');
  const editBtn = document.getElementById('editBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const picInput = document.getElementById('picInput');
  const profilePic = document.getElementById('profilePic');

  function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    
    document.getElementById('viewName').textContent = profile.name || 'Not set yet';
    document.getElementById('viewEmail').textContent = profile.email || 'Not set yet';
    document.getElementById('viewPhone').textContent = profile.phone || 'Not set yet';
    document.getElementById('viewBio').textContent = profile.bio || 'Not set yet';
    if (profile.picture) {
      document.getElementById('viewPic').src = profile.picture;
      document.getElementById('viewPic').style.display = 'block';
    } else {
      document.getElementById('viewPic').style.display = 'none';
    }
    // Form
    document.getElementById('name').value = profile.name || '';
    document.getElementById('email').value = profile.email || '';
    document.getElementById('phone').value = profile.phone || '';
    document.getElementById('bio').value = profile.bio || '';
    if (profile.picture) {
      profilePic.src = profile.picture;
      profilePic.style.display = 'block';
    } else {
      profilePic.style.display = 'none';
    }
  }

  loadProfile();

  editBtn.addEventListener('click', () => {
    profileView.style.display = 'none';
    profileForm.style.display = 'block';
  });

  cancelBtn.addEventListener('click', () => {
    loadProfile(); 
    profileForm.style.display = 'none';
    profileView.style.display = 'block';
  });

  picInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profilePic.src = event.target.result;
        profilePic.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  });

  profileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const profileData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      bio: document.getElementById('bio').value,
      picture: profilePic.src || null
    };
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    loadProfile(); 
    profileForm.style.display = 'none';
    profileView.style.display = 'block';
    alert('Profile saved!');
  });
});

document.addEventListener('deviceready', () => {
  
});
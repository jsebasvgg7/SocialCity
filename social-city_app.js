// Navegación entre login y registro en index.html
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const goToRegister = document.getElementById('goToRegister');
  const goToLogin = document.getElementById('goToLogin');

  if (goToRegister && goToLogin) {
    goToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
    });
    goToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      registerForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
    });
  }

  // Ejemplo de inicio de sesión ficticio
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.href = 'main.html';
    });
  }
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.location.href = 'main.html';
    });
  }

  // Buscador de rasgos en main.html
  const searchForm = document.getElementById('searchForm');
  const profilesList = document.getElementById('profilesList');
  if (searchForm && profilesList) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = searchForm.querySelector('input').value.trim();
      profilesList.innerHTML = '';
      // Simulación de resultados
      for (let i = 1; i <= 4; i++) {
        const card = document.createElement('div');
        card.className = 'profile-card';
        card.innerHTML = `
          <img src="https://randomuser.me/api/portraits/men/${i+30}.jpg" alt="Perfil">
          <h4>Usuario ${i}</h4>
          <p>Rasgo: ${query || 'amistoso'}</p>
          <a href="profile.html" class="btn">Ver Perfil</a>
        `;
        profilesList.appendChild(card);
      }
    });
  }

  // Galería en profile.html
  const addImageForm = document.getElementById('addImageForm');
  const gallery = document.getElementById('gallery');
  if (addImageForm && gallery) {
    addImageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = addImageForm.querySelector('input').value.trim();
      if (url) {
        const img = document.createElement('img');
        img.src = url;
        gallery.appendChild(img);
        addImageForm.reset();
      }
    });
  }

  // Cerrar sesión
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      // Redirección a inicio
      window.location.href = 'index.html';
    });
  }
});
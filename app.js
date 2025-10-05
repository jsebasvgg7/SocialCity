// Navegación entre login y registro en index.html
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const goToRegister = document.getElementById('goToRegister');
  const goToLogin = document.getElementById('goToLogin');

  // Navegación entre login y registro
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

  // Registro de usuario con Firebase
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = registerForm.querySelector('input[type="text"]').value.trim();
      const email = registerForm.querySelector('input[type="email"]').value.trim();
      const password = registerForm.querySelector('input[type="password"]').value;
      try {
        // Registra el usuario en Firebase Auth
        const userCredential = await window.createUserWithEmailAndPassword(window.firebaseAuth, email, password);
        // Guarda datos adicionales en Firestore
        await window.setDoc(
          window.doc(window.firebaseDb, "users", userCredential.user.uid),
          { username, email }
        );
        window.location.href = "main.html";
      } catch (error) {
        alert("Error al registrar: " + error.message);
      }
    });
  }

  // Inicio de sesión con Firebase
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value.trim();
      const password = loginForm.querySelector('input[type="password"]').value;
      try {
        await window.signInWithEmailAndPassword(window.firebaseAuth, email, password);
        window.location.href = "main.html";
      } catch (error) {
        alert("Usuario o contraseña incorrectos");
      }
    });
  }

  // Buscador de rasgos en main.html (sin cambios)
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

  // Galería en profile.html (sin cambios)
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

  // Cerrar sesión con Firebase
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await window.signOut(window.firebaseAuth);
      } catch (error) {
        // Si hay error, lo ignoramos para el logout básico
      }
      window.location.href = "index.html";
    });
  }
});

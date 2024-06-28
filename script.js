document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.wrapper');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');
  const btnPopup = document.querySelector('.btnLogin-popup');
  const iconClose = document.querySelector('.icon-close');
  const loginForm = document.querySelector('.form-box.login form');
  const registerForm = document.querySelector('.form-box.register form');

  registerLink.addEventListener('click', () => {
      wrapper.classList.add('active-popup');
      document.querySelector('.form-box.login').style.display = 'none';
      document.querySelector('.form-box.register').style.display = 'block';
  });

  loginLink.addEventListener('click', () => {
      wrapper.classList.add('active-popup');
      document.querySelector('.form-box.register').style.display = 'none';
      document.querySelector('.form-box.login').style.display = 'block';
  });

  btnPopup.addEventListener('click', () => {
      wrapper.classList.add('active-popup');
      document.querySelector('.form-box.register').style.display = 'none';
      document.querySelector('.form-box.login').style.display = 'block';
  });

  iconClose.addEventListener('click', () => {
      wrapper.classList.remove('active-popup');
  });

  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = loginForm.querySelector('input[type="email"]').value;
      const password = loginForm.querySelector('input[type="password"]').value;

      try {
          const response = await fetch('http://localhost:3000/users');
          const users = await response.json();
          const user = users.find(user => user.email === email && user.password === password);

          if (user) {
              alert('Login successful!');
          } else {
              alert('Invalid email or password.');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });

  registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = registerForm.querySelector('input[type="text"]').value;
      const email = registerForm.querySelector('input[type="email"]').value;
      const password = registerForm.querySelector('input[type="password"]').value;

      const newUser = { username, email, password };

      try {
          const response = await fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newUser)
          });

          if (response.ok) {
              alert('Registration successful!');
          } else {
              alert('Error registering user.');
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
});

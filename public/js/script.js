document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu-item');
  
    menuItems.forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        const target = e.target.getAttribute('href');
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
  
        menuItems.forEach(other => {
          other.classList.remove('active');
        });
        e.target.classList.add('active');
      });
    });
  
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const menuItem = document.querySelector(`a[href="#${id}"]`);
            menuItems.forEach(item => {
              item.classList.remove('active');
            });
            menuItem.classList.add('active');
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
  
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
  });
  
  // Add the 'scroll' event listener to update the menu style and parallax effect
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  
    // Parallax effect
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const speed = parseFloat(section.getAttribute('data-speed'));
      const offset = window.pageYOffset;
      section.style.backgroundPositionY = `${-(offset * speed) / 100}px`;
    });
  });
  
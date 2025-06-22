// Modern Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  function updateHeader() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // CV Download functionality
  const downloadCVBtn = document.querySelector('.btn-primary');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // Path to your CV file
      link.download = 'Rehan_Resume.pdf'; // Name for downloaded file
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success message
      showNotification('CV download started!', 'success');
    });
  }

  // Get In Touch (Email) functionality
  const getInTouchBtn = document.querySelector('.btn-secondary');
  if (getInTouchBtn) {
    getInTouchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Email configuration
      const email = 'your.email@example.com'; // Replace with your actual email
      const subject = 'Hello from your Portfolio Website';
      const body = 'Hi Rehan,\n\nI visited your portfolio website and would like to get in touch with you.\n\nBest regards,';
      
      // Create mailto link
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show notification
      showNotification('Opening your email client...', 'info');
    });
  }

  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add('show');
    }, 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animate academic cards on scroll
  const academicCards = document.querySelectorAll('.academic-card');
  academicCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Animate project cards on scroll
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(card);
  });

  // Animate social links on scroll
  const socialLinks = document.querySelectorAll('.social-link');
  socialLinks.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(30px)';
    link.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(link);
  });

  // Add click effects to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple effect
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Modal functionality for academic information
  const modal = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.querySelector('.modal-close');

  // Project modal functionality
  const projectModal = document.getElementById('project-modal-overlay');
  const projectModalBody = document.getElementById('project-modal-body');
  const projectModalClose = document.querySelector('.project-modal-close');

  // Academic information data
  const academicData = {
    schooling: {
      title: 'Secondary Education',
      icon: 'fas fa-school',
      info: 'Completed my secondary education with a strong foundation in mathematics and sciences.',
      details: {
        institution: 'Kranthi High School',
        year: '2007-2020',
        grade: '10 GPA achieved',
        subjects: 'Mathematics, Physics, Chemistry, English, etc.'
      }
    },
    intermediate: {
      title: 'Higher Secondary Education',
      icon: 'fas fa-graduation-cap',
      info: 'Pursued intermediate education with focus on science stream, building strong analytical skills.',
      details: {
        institution: 'Hidayah Junior College',
        year: '2020-2022',
        stream: 'MPC (Mathematics, Physics, Chemistry)',
        grade: '90% achieved'
      }
    },
    empcet: {
      title: 'EMPCET Entrance Exam',
      icon: 'fas fa-trophy',
      info: 'Successfully qualified the Engineering, Medical and Pharmacy Common Entrance Test with a competitive rank.',
      details: {
        exam: 'EMPCET (Engineering Stream)',
        year: '2022',
        rank: '14,742',
        // percentile: 'Your Percentile'
      }
    },
    engineering: {
      title: 'Bachelor of Engineering',
      icon: 'fas fa-cogs',
      info: 'Currently pursuing/Completed Bachelor of Engineering with specialization in Computer Science.',
      details: {
        degree: 'B.E/B.Tech in Computer Science Engineering',
        institution: 'YMuffakham Jah College of Engineering and Technology',
        year: '2022-2026',
        cgpa: 'current CGPA:7.89/Final CGPA'
      }
    }
  };

  // Project information data
  const projectData = {
    portfolio: {
      title: 'Personal Portfolio Website',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      description: 'A modern, responsive portfolio website showcasing my skills, projects, and experience. Built with clean HTML, CSS, and JavaScript with smooth animations and mobile-first design approach.',
      features: [
        'Responsive design that works on all devices',
        'Smooth scroll animations and hover effects',
        'Interactive modal popups for detailed information',
        'CV download functionality',
        'Contact form with email integration',
        'Clean, modern UI with professional aesthetics'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      github: 'https://github.com/your-username/portfolio',
      website: 'https://your-portfolio-website.com'
    },
    'smart-bus-pass-system': {
      title: 'Smart Bus Pass System',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
      description: 'A smart bus pass system that allows users to purchase and manage their bus passes online, with real-time tracking of bus locations and schedules.',
      features: [
        'Real-time bus tracking',
        'Online pass purchase and management',
        'User-friendly dashboard',
        'Secure payment integration',
        'Notifications for pass expiry and renewals',
        'Responsive design for all devices'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'MongoDB'],
      github: 'https://github.com/your-username/smart-bus-pass-system',
      website: 'https://your-smart-bus-pass-system.com'
    },
    'chalo khatta': {
      title: 'Chalo Khatta',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg',
      description: 'A website that provides a platform for users to share and discover local food without feeling awkward about splitting bills.',
      features: [
        'Discover local food spots',
        'Share food experiences',
        'Bill splitting made easy',
        'User reviews and ratings',
        'Mobile-friendly interface',
        'Community-driven recommendations'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript'],
      github: 'https://github.com/your-username/chalo-khatta',
      website: 'https://your-chalo-khatta.com'
    },
    taskmanager: {
      title: 'Task Management System',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      description: 'A comprehensive task management application for personal and team productivity. Features drag-and-drop functionality, priority levels, and collaboration tools.',
      features: [
        'Drag-and-drop task organization',
        'Priority levels and due date management',
        'Team collaboration and task assignment',
        'Progress tracking and analytics',
        'File attachments and comments',
        'Real-time notifications and updates'
      ],
      technologies: ['React', 'Firebase', 'Material-UI', 'React DnD'],
      github: 'https://github.com/your-username/task-manager',
      website: 'https://your-task-manager.com'
    },
    blog: {
      title: 'Blog Platform',
      image: 'https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg',
      description: 'A modern blogging platform with rich text editing capabilities. Features user authentication, comment system, and SEO optimization for content creators.',
      features: [
        'Rich text editor with formatting options',
        'User authentication and profile management',
        'Comment system with moderation',
        'SEO optimization and meta tags',
        'Social media sharing integration',
        'Analytics dashboard for authors'
      ],
      technologies: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
      github: 'https://github.com/your-username/blog-platform',
      website: 'https://your-blog-platform.com'
    },
    calculator: {
      title: 'Scientific Calculator',
      image: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg',
      description: 'A feature-rich calculator application with scientific functions. Includes history tracking, keyboard support, and a clean, intuitive interface.',
      features: [
        'Basic arithmetic operations',
        'Scientific functions (sin, cos, tan, log, etc.)',
        'Calculation history and memory functions',
        'Keyboard shortcuts support',
        'Responsive design for mobile and desktop',
        'Dark and light theme options'
      ],
      technologies: ['JavaScript', 'HTML5', 'CSS3', 'Local Storage'],
      github: 'https://github.com/your-username/calculator',
      website: 'https://your-calculator-app.com'
    }
  };

  // Add click event listeners to academic cards
  academicCards.forEach(card => {
    card.addEventListener('click', function() {
      const infoType = this.getAttribute('data-info');
      const data = academicData[infoType];
      
      if (data) {
        showModal(data);
      }
    });
  });

  // Add click event listeners to project cards
  projectCards.forEach(card => {
    card.addEventListener('click', function() {
      const projectType = this.getAttribute('data-project');
      const data = projectData[projectType];
      
      if (data) {
        showProjectModal(data);
      }
    });
  });

  function showModal(data) {
    modalBody.innerHTML = `
      <div class="modal-title">
        <div class="modal-icon">
          <i class="${data.icon}"></i>
        </div>
        ${data.title}
      </div>
      <p class="modal-info">${data.info}</p>
      <div class="modal-details">
        ${Object.entries(data.details).map(([key, value]) => `
          <h4>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</h4>
          <p>${value}</p>
        `).join('')}
      </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function showProjectModal(data) {
    projectModalBody.innerHTML = `
      <div class="project-modal-header">
        <img src="${data.image}" alt="${data.title}" class="project-modal-image">
        <div>
          <h2 class="project-modal-title">${data.title}</h2>
          <div class="project-modal-tech">
            ${data.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
        </div>
      </div>
      <p class="project-modal-description">${data.description}</p>
      <div class="project-modal-features">
        <h4>Key Features:</h4>
        <ul>
          ${data.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      <div class="project-modal-links">
        <a href="${data.github}" target="_blank" class="project-modal-link github">
          <i class="fab fa-github"></i>
          View on GitHub
        </a>
        <a href="${data.website}" target="_blank" class="project-modal-link website">
          <i class="fas fa-external-link-alt"></i>
          Visit Website
        </a>
      </div>
    `;
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function hideProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Modal close events
  if (modalClose) {
    modalClose.addEventListener('click', hideModal);
  }
  
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        hideModal();
      }
    });
  }

  // Project modal close events
  if (projectModalClose) {
    projectModalClose.addEventListener('click', hideProjectModal);
  }
  
  if (projectModal) {
    projectModal.addEventListener('click', function(e) {
      if (e.target === projectModal) {
        hideProjectModal();
      }
    });
  }

  // Close modal with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('active')) {
        hideModal();
      }
      if (projectModal && projectModal.classList.contains('active')) {
        hideProjectModal();
      }
    }
  });

  // Add subtle interaction feedback
  const interactiveElements = document.querySelectorAll('.academic-card, .social-link, .btn, .project-card');
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  const profileImage = document.querySelector('.profile-image');

  function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (profileImage && scrolled < window.innerHeight) {
      profileImage.style.transform = `translateY(${rate}px)`;
    }
  }

  window.addEventListener('scroll', updateParallax, { passive: true });

  // Add loading animation
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease-in-out';
  
  window.addEventListener('load', function() {
    document.body.style.opacity = '1';
  });

  console.log('🚀 Portfolio loaded successfully!');
});
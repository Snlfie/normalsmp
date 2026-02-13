// Expandable Rules
document.addEventListener('DOMContentLoaded', function() {
    // Add expand icons to rule headers
    const ruleHeaders = document.querySelectorAll('.rule-category-header');
    
    ruleHeaders.forEach(header => {
        // Add expand icon
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down expand-icon';
        header.appendChild(icon);
        
        // Add click handler
        header.addEventListener('click', function() {
            const category = this.parentElement;
            category.classList.toggle('collapsed');
        });
    });
    
    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scroll for chevron
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }
    
    // Copy IP functionality
    const copyButton = document.getElementById('copyButton');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const ip = 'mc.normalsmp.com';
            navigator.clipboard.writeText(ip).then(() => {
                const successMsg = document.getElementById('copySuccess');
                if (successMsg) {
                    successMsg.classList.add('show');
                    setTimeout(() => {
                        successMsg.classList.remove('show');
                    }, 2000);
                }
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i> Copy IP Address';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('Copied: mc.normalsmp.com');
            });
        });
    }
    
    // Stat counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end % 1 === 0 ? end : end.toFixed(1);
                clearInterval(timer);
            } else {
                element.textContent = current % 1 === 0 ? Math.floor(current) : current.toFixed(1);
            }
        }, 16);
    }
});

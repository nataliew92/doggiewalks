lucide.createIcons();

const menuBtn = document.querySelector('.header__menu-btn');
const nav = document.querySelector('.header__nav');
const menuIcon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
    menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
});

const timelineItems = document.querySelectorAll('.timeline__item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => timelineObserver.observe(item));



// Flip cards functionality inspired by 21st.dev and prompted with Claude for this project
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
    });

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.classList.toggle('is-flipped');
        }
    });
});

document.querySelectorAll('.flip-card__btn').forEach(btn => {
    btn.addEventListener('click', (e) => e.stopPropagation());
});

if (flipCards.length) {
    const flipCardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.2 });
    flipCards.forEach(card => flipCardObserver.observe(card));
}


// Gallery lightbox
const galleryItems = document.querySelectorAll('.gallery__item');
const lightbox = document.querySelector('.lightbox');

if (galleryItems.length && lightbox) {
    const lightboxImage = lightbox.querySelector('.lightbox__image');
    const lightboxCounter = lightbox.querySelector('.lightbox__counter');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__nav--prev');
    const nextBtn = lightbox.querySelector('.lightbox__nav--next');

    let currentIndex = 0;
    const images = Array.from(galleryItems).map(item => {
        const img = item.querySelector('img');
        return { src: img.src, alt: img.alt };
    });

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.hidden = true;
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const image = images[currentIndex];
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightbox();
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightbox();
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox__content')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });
}

// Contact form (fake submission)
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]')
    const successMsg = contactForm.querySelector('.contact-form__success');
    const formFields = contactForm.querySelectorAll('input, select, textarea');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        setTimeout(() => {
            formFields.forEach(field => field.value = '');
            submitBtn.hidden = true;
            successMsg.hidden = false;
            lucide.createIcons();

            setTimeout(() => {
                successMsg.hidden = true;
                submitBtn.hidden = false;
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }, 5000);
        }, 1200);
    });
}


// Generic scroll reveal for any .reveal elements
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
}

// Page transition on internal links
const internalLinks = document.querySelectorAll('a[href$=".html"]');

internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Skip if it's an external link, anchor link, or new tab
        if (
            link.target === '_blank' ||
            href.startsWith('#') ||
            href.startsWith('http') ||
            e.metaKey || e.ctrlKey
        ) {
            return;
        }

        e.preventDefault();
        document.body.classList.add('is-leaving');

        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });
});
// Main JS file for Customer Review System

document.addEventListener('DOMContentLoaded', function () {
    // Initialize notifications dropdown
    initNotifications();

    // Initialize user dropdown
    initUserDropdown();

    // Initialize product image gallery
    initProductGallery();

    // Initialize review form
    initReviewForm();

    // Initialize auth tabs
    initAuthTabs();

    // Initialize profile tabs
    initProfileTabs();

    // Initialize tooltips
    initTooltips();

    // Initialize modals
    initModals();

    // Initialize file upload
    initFileUpload();
});

// Notifications dropdown toggle
function initNotifications() {
    const notificationIcon = document.querySelector('.notification-icon');
    const notificationMenu = document.querySelector('.notification-menu');

    if (notificationIcon && notificationMenu) {
        notificationIcon.addEventListener('click', function (e) {
            e.stopPropagation();
            notificationMenu.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!notificationMenu.contains(e.target) && !notificationIcon.contains(e.target)) {
                notificationMenu.classList.remove('show');
            }
        });

        // Mark notification as read
        const notificationItems = document.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', function () {
                this.classList.remove('unread');
            });
        });

        // Clear all notifications
        const clearBtn = document.querySelector('.notification-clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                notificationItems.forEach(item => {
                    item.classList.remove('unread');
                });
            });
        }
    }
}

// User dropdown toggle
function initUserDropdown() {
    const userDropdown = document.querySelector('.user-dropdown');
    const avatarLink = document.querySelector('.avatar-link');

    if (userDropdown && avatarLink) {
        avatarLink.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function (e) {
            if (!userDropdown.contains(e.target)) {
                userDropdown.classList.remove('show');
            }
        });

        // Prevent dropdown from closing when clicking on menu items
        const dropdownMenu = document.querySelector('.user-dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.addEventListener('click', function (e) {
                e.stopPropagation();
            });
        }
    }
}

// Product image gallery
function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');

    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function () {
                const imgSrc = this.querySelector('img').getAttribute('src');
                mainImage.setAttribute('src', imgSrc);

                // Remove active class from all thumbnails
                thumbnails.forEach(thumb => {
                    thumb.classList.remove('active');
                });

                // Add active class to clicked thumbnail
                this.classList.add('active');
            });
        });
    }
}

// Review form stars
function initReviewForm() {
    const stars = document.querySelectorAll('.star-input i');
    const ratingInput = document.querySelector('#rating');

    if (stars.length > 0 && ratingInput) {
        stars.forEach((star, index) => {
            star.addEventListener('click', function () {
                // Set rating value
                ratingInput.value = index + 1;

                // Update star UI
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
            });

            star.addEventListener('mouseover', function () {
                // Highlight stars on hover
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('hover');
                    } else {
                        s.classList.remove('hover');
                    }
                });
            });

            star.addEventListener('mouseout', function () {
                // Remove hover class
                stars.forEach(s => {
                    s.classList.remove('hover');
                });
            });
        });
    }

    // Handle review submission
    const reviewForm = document.querySelector('#review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const rating = formData.get('rating');
            const content = formData.get('content');

            // Validate form data
            if (!rating) {
                showAlert('Please select a rating', 'danger');
                return;
            }

            if (!content || content.trim() === '') {
                showAlert('Please enter your review', 'danger');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // Simulate API call for review submission
            setTimeout(function () {
                // Reset form
                reviewForm.reset();
                stars.forEach(s => {
                    s.classList.remove('active');
                });

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // Show success message
                showAlert('Your review has been submitted successfully!', 'success');
            }, 1500);
        });
    }
}

// Authentication tabs
function initAuthTabs() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    if (authTabs.length > 0 && authForms.length > 0) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active class from all tabs
                authTabs.forEach(t => {
                    t.classList.remove('active');
                });

                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all forms
                authForms.forEach(form => {
                    form.style.display = 'none';
                });

                // Show selected form
                const formId = this.getAttribute('data-form');
                document.getElementById(formId).style.display = 'block';
            });
        });
    }
}

// Profile tabs
function initProfileTabs() {
    const profileTabs = document.querySelectorAll('.profile-tab');
    const profileContents = document.querySelectorAll('.profile-content');

    if (profileTabs.length > 0 && profileContents.length > 0) {
        profileTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active class from all tabs
                profileTabs.forEach(t => {
                    t.classList.remove('active');
                });

                // Add active class to clicked tab
                this.classList.add('active');

                // Hide all content sections
                profileContents.forEach(content => {
                    content.style.display = 'none';
                });

                // Show selected content
                const contentId = this.getAttribute('data-content');
                document.getElementById(contentId).style.display = 'block';
            });
        });
    }
}

// Initialize tooltips
function initTooltips() {
    const tooltips = document.querySelectorAll('.tooltip');

    if (tooltips.length > 0) {
        // No additional initialization required as CSS handles the tooltip display
        console.log('Tooltips initialized');
    }
}

// Initialize modals
function initModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal-overlay');

    if (modalTriggers.length > 0) {
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', function () {
                const modalId = this.getAttribute('data-modal');
                const modal = document.getElementById(modalId);

                if (modal) {
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        modalCloseButtons.forEach(button => {
            button.addEventListener('click', function () {
                const modal = this.closest('.modal-overlay');
                modal.classList.remove('show');
                document.body.style.overflow = '';
            });
        });

        modals.forEach(modal => {
            modal.addEventListener('click', function (e) {
                if (e.target === this) {
                    this.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        });
    }
}

// File upload
function initFileUpload() {
    const fileUpload = document.querySelector('.file-upload');
    const fileInput = document.querySelector('.file-upload input');
    const uploadStatus = document.querySelector('.upload-status');
    const progressBar = document.querySelector('.progress');

    if (fileUpload && fileInput) {
        fileUpload.addEventListener('click', function () {
            fileInput.click();
        });

        fileInput.addEventListener('change', function (e) {
            if (this.files.length > 0) {
                const fileName = this.files[0].name;
                uploadStatus.style.display = 'block';
                uploadStatus.innerHTML = `Uploading: ${fileName}`;

                // Simulate upload progress
                let progress = 0;
                const interval = setInterval(function () {
                    progress += 5;
                    progressBar.style.width = `${progress}%`;

                    if (progress >= 100) {
                        clearInterval(interval);
                        uploadStatus.innerHTML = `Upload complete: ${fileName}`;

                        // Reset after 3 seconds
                        setTimeout(function () {
                            uploadStatus.style.display = 'none';
                            progressBar.style.width = '0%';
                            fileInput.value = '';
                        }, 3000);
                    }
                }, 100);
            }
        });

        // Prevent default browser behavior for drag and drop
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            fileUpload.addEventListener(eventName, function (e) {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        // Highlight drop area when file is dragged over
        ['dragenter', 'dragover'].forEach(eventName => {
            fileUpload.addEventListener(eventName, function () {
                this.classList.add('highlight');
            });
        });

        ['dragleave', 'drop'].forEach(eventName => {
            fileUpload.addEventListener(eventName, function () {
                this.classList.remove('highlight');
            });
        });

        // Handle dropped files
        fileUpload.addEventListener('drop', function (e) {
            fileInput.files = e.dataTransfer.files;
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        });
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertContainer = document.querySelector('.alert-container');

    if (!alertContainer) {
        return;
    }

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    alertContainer.appendChild(alert);

    // Remove alert after 3 seconds
    setTimeout(function () {
        alert.remove();
    }, 3000);
}

// Filter products by category
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const chips = document.querySelectorAll('.chip');

    // Update active chip
    chips.forEach(chip => {
        if (chip.getAttribute('data-category') === category) {
            chip.classList.add('active');
        } else {
            chip.classList.remove('active');
        }
    });

    // Filter products
    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');

        if (category === 'all' || productCategory === category) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}

// Compare products
function addToCompare(productId, productName) {
    // Get current compared products from localStorage
    let comparedProducts = JSON.parse(localStorage.getItem('comparedProducts')) || [];

    // Check if product is already in the comparison list
    const exists = comparedProducts.some(product => product.id === productId);

    if (exists) {
        showAlert('This product is already in your comparison list', 'warning');
        return;
    }

    // Check if already comparing max products
    if (comparedProducts.length >= 3) {
        showAlert('You can compare maximum 3 products at a time', 'warning');
        return;
    }

    // Add product to comparison
    comparedProducts.push({
        id: productId,
        name: productName
    });

    // Save to localStorage
    localStorage.setItem('comparedProducts', JSON.stringify(comparedProducts));

    // Show success message
    showAlert(`${productName} added to comparison`, 'success');

    // Update compare button count
    updateCompareCount();
}

// Update compare products count
function updateCompareCount() {
    const compareBtn = document.querySelector('.compare-btn');
    const comparedProducts = JSON.parse(localStorage.getItem('comparedProducts')) || [];

    if (compareBtn) {
        if (comparedProducts.length > 0) {
            compareBtn.textContent = `Compare Products (${comparedProducts.length})`;
            compareBtn.classList.add('has-items');
        } else {
            compareBtn.textContent = 'Compare Products';
            compareBtn.classList.remove('has-items');
        }
    }
}

// Remove from comparison
function removeFromCompare(productId) {
    // Get current compared products from localStorage
    let comparedProducts = JSON.parse(localStorage.getItem('comparedProducts')) || [];

    // Remove product from comparison
    comparedProducts = comparedProducts.filter(product => product.id !== productId);

    // Save to localStorage
    localStorage.setItem('comparedProducts', JSON.stringify(comparedProducts));

    // Reload comparison page if we're on it
    if (window.location.pathname.includes('compare')) {
        window.location.reload();
    } else {
        // Update compare button count
        updateCompareCount();
    }
}

// Add product to favorites
function addToFavorites(productId, productName) {
    // Get current favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Check if product is already in favorites
    const exists = favorites.some(product => product.id === productId);

    if (exists) {
        // Remove from favorites if already added
        favorites = favorites.filter(product => product.id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showAlert(`${productName} removed from favorites`, 'info');

        // Update heart icon
        const heartIcon = document.querySelector(`.favorite-btn[data-product="${productId}"] i`);
        if (heartIcon) {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
    } else {
        // Add to favorites
        favorites.push({
            id: productId,
            name: productName
        });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        showAlert(`${productName} added to favorites`, 'success');

        // Update heart icon
        const heartIcon = document.querySelector(`.favorite-btn[data-product="${productId}"] i`);
        if (heartIcon) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        }
    }
}

// Check if product is in favorites
function checkFavoriteStatus() {
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    favoriteButtons.forEach(button => {
        const productId = button.getAttribute('data-product');
        const isFavorite = favorites.some(product => product.id === productId);
        const heartIcon = button.querySelector('i');

        if (isFavorite) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
    });
}

// Vote on review (helpful/not helpful)
function voteReview(reviewId, isHelpful) {
    const reviewAction = document.querySelector(`.review-action[data-review="${reviewId}"]`);
    const countSpan = reviewAction.querySelector('.count');
    let count = parseInt(countSpan.textContent);

    // Check if user already voted
    const votes = JSON.parse(localStorage.getItem('reviewVotes')) || {};

    if (votes[reviewId]) {
        showAlert('You have already voted on this review', 'warning');
        return;
    }

    // Update count
    count++;
    countSpan.textContent = count;

    // Save vote
    votes[reviewId] = isHelpful;
    localStorage.setItem('reviewVotes', JSON.stringify(votes));

    // Show confirmation
    showAlert('Thank you for your feedback!', 'success');
}

// Initialize charts for analytics
function initCharts() {
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }

    // Sentiment trend chart
    const sentimentCtx = document.getElementById('sentimentChart');
    if (sentimentCtx) {
        new Chart(sentimentCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Positive',
                        data: [65, 70, 68, 75, 82, 85],
                        borderColor: '#2ecc71',
                        backgroundColor: 'rgba(46, 204, 113, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Negative',
                        data: [35, 30, 32, 25, 18, 15],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function (value) {
                                return value + '%';
                            }
                        }
                    }
                }
            }
        });
    }

    // Aspect sentiment chart
    const aspectCtx = document.getElementById('aspectChart');
    if (aspectCtx) {
        new Chart(aspectCtx, {
            type: 'radar',
            data: {
                labels: ['Quality', 'Price', 'Design', 'Features', 'Performance', 'Support'],
                datasets: [
                    {
                        label: 'Positive',
                        data: [85, 65, 78, 82, 90, 70],
                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                        borderColor: '#2ecc71',
                        pointBackgroundColor: '#2ecc71',
                        pointBorderColor: '#fff'
                    },
                    {
                        label: 'Negative',
                        data: [15, 35, 22, 18, 10, 30],
                        backgroundColor: 'rgba(231, 76, 60, 0.2)',
                        borderColor: '#e74c3c',
                        pointBackgroundColor: '#e74c3c',
                        pointBorderColor: '#fff'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // User activity chart
    const activityCtx = document.getElementById('activityChart');
    if (activityCtx) {
        new Chart(activityCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'Reviews',
                        data: [28, 35, 42, 38, 45, 56, 48],
                        backgroundColor: '#4a90e2'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}
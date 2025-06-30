// CCTV Monitoring System JavaScript

class CCTVMonitoringSystem {
    constructor() {
        this.init();
        this.bindEvents();
        this.currentCategory = 'cctv';
        this.isFullscreen = false;
        this.isSoundOn = true;
    }

    init() {
        console.log('CCTV Monitoring System initialized');
        this.loadMapData();
        this.updateStats();
    }

    bindEvents() {
        // Navigation button events
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleNavigation(e));
        });

        // Control button events
        const soundBtn = document.querySelector('.sound-btn');
        const fullscreenBtn = document.querySelector('.fullscreen-btn');
        const closeBtn = document.querySelector('.close-btn');

        if (soundBtn) {
            soundBtn.addEventListener('click', () => this.toggleSound());
        }

        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closePanel());
        }

        // Window resize event
        window.addEventListener('resize', () => this.handleResize());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleNavigation(e) {
        const button = e.currentTarget;
        const category = button.dataset.category;

        // Remove active class from all buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        button.classList.add('active');

        // Update current category
        this.currentCategory = category;

        // Load category data
        this.loadCategoryData(category);

        // Add click animation
        this.addClickAnimation(button);
    }

    loadCategoryData(category) {
        console.log(`Loading data for category: ${category}`);
        
        // Simulate loading different data based on category
        const categoryData = {
            'cctv': {
                title: '85 CCTV',
                items: [
                    { name: 'Semua CCTV', count: 22880 },
                    { name: 'Tugu Pengantin', count: 13213 },
                    { name: 'Simpang Kampus', count: 13723 },
                    { name: 'Perbatasan Metro Punggur', count: 10527 },
                    { name: 'Traffic Light RASIPED', count: 14684 }
                ]
            },
            'virtual-tour': {
                title: '12 Virtual Tour',
                items: [
                    { name: 'Museum Daerah', count: 1250 },
                    { name: 'Taman Kota', count: 2100 },
                    { name: 'Alun-alun Metro', count: 3500 },
                    { name: 'Kantor Walikota', count: 890 }
                ]
            },
            'government': {
                title: '25 Instansi Pemerintah',
                items: [
                    { name: 'Kantor Walikota', count: 5500 },
                    { name: 'Dinas Pendidikan', count: 3200 },
                    { name: 'Dinas Kesehatan', count: 4100 },
                    { name: 'Kantor Kecamatan', count: 2800 }
                ]
            }
        };

        const data = categoryData[category] || categoryData['cctv'];
        this.updatePanelContent(data);
    }

    updatePanelContent(data) {
        const panelHeader = document.querySelector('.panel-header h3');
        const panelContent = document.querySelector('.panel-content');

        if (panelHeader) {
            panelHeader.textContent = data.title;
        }

        if (panelContent && data.items) {
            panelContent.innerHTML = data.items.map(item => `
                <div class="stat-item">
                    <div class="stat-info">
                        <span class="stat-label">${item.name}</span>
                        <div class="stat-value">
                            <i class="fas fa-eye"></i>
                            <span>${item.count.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    toggleSound() {
        this.isSoundOn = !this.isSoundOn;
        const soundBtn = document.querySelector('.sound-btn i');
        
        if (soundBtn) {
            soundBtn.className = this.isSoundOn ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        }

        console.log(`Sound ${this.isSoundOn ? 'enabled' : 'disabled'}`);
        this.showNotification(`Sound ${this.isSoundOn ? 'enabled' : 'disabled'}`);
    }

    toggleFullscreen() {
        if (!this.isFullscreen) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        
        this.isFullscreen = !this.isFullscreen;
        const fullscreenBtn = document.querySelector('.fullscreen-btn i');
        
        if (fullscreenBtn) {
            fullscreenBtn.className = this.isFullscreen ? 'fas fa-compress' : 'fas fa-expand';
        }
    }

    closePanel() {
        const statsPanel = document.querySelector('.stats-panel');
        if (statsPanel) {
            statsPanel.style.transform = 'translateX(100%)';
            setTimeout(() => {
                statsPanel.style.display = 'none';
            }, 300);
        }
    }

    loadMapData() {
        // Simulate map loading
        const mapContainer = document.querySelector('.map');
        if (mapContainer) {
            setTimeout(() => {
                const placeholder = mapContainer.querySelector('.map-placeholder');
                if (placeholder) {
                    placeholder.innerHTML = `
                        <i class="fas fa-map-marked-alt"></i>
                        <p>Map Loaded Successfully</p>
                        <small>85 CCTV locations available</small>
                    `;
                }
            }, 2000);
        }
    }

    updateStats() {
        // Simulate real-time stats update
        setInterval(() => {
            const statValues = document.querySelectorAll('.stat-value span');
            statValues.forEach(span => {
                if (span.textContent && !isNaN(span.textContent.replace(/,/g, ''))) {
                    const currentValue = parseInt(span.textContent.replace(/,/g, ''));
                    const newValue = currentValue + Math.floor(Math.random() * 10);
                    span.textContent = newValue.toLocaleString();
                }
            });
        }, 5000);
    }

    handleResize() {
        // Handle responsive behavior
        const isMobile = window.innerWidth <= 768;
        const statsPanel = document.querySelector('.stats-panel');
        
        if (statsPanel) {
            if (isMobile) {
                statsPanel.style.width = '100%';
            } else {
                statsPanel.style.width = '350px';
            }
        }
    }

    handleKeyboard(e) {
        // Keyboard shortcuts
        switch(e.key) {
            case 'Escape':
                if (this.isFullscreen) {
                    this.toggleFullscreen();
                }
                break;
            case 'F11':
                e.preventDefault();
                this.toggleFullscreen();
                break;
            case 'm':
            case 'M':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.toggleSound();
                }
                break;
        }
    }

    addClickAnimation(element) {
        element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            element.style.transform = '';
        }, 150);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            z-index: 9999;
            font-size: 14px;
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CCTVMonitoringSystem();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
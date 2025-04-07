// DOM Elements
const trackingNumberInput = document.getElementById('trackingNumber');
const trackButton = document.getElementById('trackButton');
const trackingInfoSection = document.getElementById('trackingInfo');
const notFoundSection = document.getElementById('notFound');
const loadingOverlay = document.getElementById('loadingOverlay');
const tryAgainButton = document.getElementById('tryAgainButton');

// Display Elements
const orderNumberElement = document.getElementById('orderNumber');
const estimatedDeliveryElement = document.getElementById('estimatedDelivery');
const currentStatusElement = document.getElementById('currentStatus');
const currentLocationElement = document.getElementById('currentLocation');
const packageDetailsElement = document.getElementById('packageDetails');
const timelineElement = document.getElementById('timeline');

// Mock API response data - In a real application, this would come from an actual API
const mockOrders = {
    'TR-12345678': {
        orderNumber: 'TR-12345678',
        estimatedDelivery: 'April 10, 2025',
        currentStatus: 'In Transit',
        currentLocation: 'Atlanta Distribution Center',
        packageDetails: 'Standard Package, 2.3kg',
        timeline: [
            {
                status: 'Order Placed',
                location: 'Online',
                description: 'Your order has been received',
                date: 'April 3, 2025, 09:15 AM',
                isCompleted: true
            },
            {
                status: 'Order Processed',
                location: 'Miami Warehouse',
                description: 'Your order has been processed and is ready for shipping',
                date: 'April 4, 2025, 10:30 AM',
                isCompleted: true
            },
            {
                status: 'Shipped',
                location: 'Miami Warehouse',
                description: 'Your package has been shipped',
                date: 'April 5, 2025, 02:45 PM',
                isCompleted: true
            },
            {
                status: 'In Transit',
                location: 'Atlanta Distribution Center',
                description: 'Your package is on the way to your destination',
                date: 'April 6, 2025, 11:20 AM',
                isActive: true
            },
            {
                status: 'Out for Delivery',
                location: '',
                description: 'Your package is out for delivery',
                date: '',
                isCompleted: false
            },
            {
                status: 'Delivered',
                location: '',
                description: 'Your package has been delivered',
                date: '',
                isCompleted: false
            }
        ]
    },
    'TR-98765432': {
        orderNumber: 'TR-98765432',
        estimatedDelivery: 'April 8, 2025',
        currentStatus: 'Out for Delivery',
        currentLocation: 'Local Delivery Facility',
        packageDetails: 'Express Package, 1.5kg',
        timeline: [
            {
                status: 'Order Placed',
                location: 'Online',
                description: 'Your order has been received',
                date: 'April 5, 2025, 08:30 AM',
                isCompleted: true
            },
            {
                status: 'Order Processed',
                location: 'Chicago Warehouse',
                description: 'Your order has been processed and is ready for shipping',
                date: 'April 5, 2025, 01:45 PM',
                isCompleted: true
            },
            {
                status: 'Shipped',
                location: 'Chicago Warehouse',
                description: 'Your package has been shipped',
                date: 'April 6, 2025, 09:20 AM',
                isCompleted: true
            },
            {
                status: 'In Transit',
                location: 'Regional Distribution Center',
                description: 'Your package is on the way to your destination',
                date: 'April 7, 2025, 02:30 PM',
                isCompleted: true
            },
            {
                status: 'Out for Delivery',
                location: 'Local Delivery Facility',
                description: 'Your package is out for delivery',
                date: 'April 8, 2025, 08:45 AM',
                isActive: true
            },
            {
                status: 'Delivered',
                location: '',
                description: 'Your package has been delivered',
                date: '',
                isCompleted: false
            }
        ]
    }
};

// Function to simulate API call
function trackOrder(trackingNumber) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            const order = mockOrders[trackingNumber];
            if (order) {
                resolve(order);
            } else {
                reject(new Error('Order not found'));
            }
        }, 1500); // 1.5 second delay to simulate API call
    });
}

// Function to display order details
function displayOrderDetails(order) {
    // Set basic order information
    orderNumberElement.textContent = order.orderNumber;
    estimatedDeliveryElement.textContent = order.estimatedDelivery;
    currentStatusElement.textContent = order.currentStatus;
    currentLocationElement.textContent = order.currentLocation;
    packageDetailsElement.textContent = order.packageDetails;
    
    // Clear existing timeline items
    timelineElement.innerHTML = '';
    
    // Create timeline items
    order.timeline.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');
        
        if (item.isActive) {
            timelineItem.classList.add('active');
        } else if (item.isCompleted) {
            timelineItem.classList.add('completed');
        }
        
        const timelineContent = `
            <div class="timeline-content">
                <h5>${item.status}</h5>
                ${item.description ? `<p>${item.description}</p>` : ''}
                ${item.location ? `<p><strong>Location:</strong> ${item.location}</p>` : ''}
                ${item.date ? `<p class="date">${item.date}</p>` : ''}
            </div>
        `;
        
        timelineItem.innerHTML = timelineContent;
        timelineElement.appendChild(timelineItem);
    });
}

// Event Listeners
trackButton.addEventListener('click', handleTrackButtonClick);
tryAgainButton.addEventListener('click', resetTrackingForm);

// Handle Enter key press on input
trackingNumberInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleTrackButtonClick();
    }
});

// Main tracking function
function handleTrackButtonClick() {
    const trackingNumber = trackingNumberInput.value.trim();
    
    if (!trackingNumber) {
        // Highlight the input field if empty
        trackingNumberInput.classList.add('error');
        setTimeout(() => {
            trackingNumberInput.classList.remove('error');
        }, 1000);
        return;
    }
    
    // Show loading overlay
    loadingOverlay.classList.remove('hidden');
    
    // Hide both sections initially
    trackingInfoSection.classList.add('hidden');
    notFoundSection.classList.add('hidden');
    
    // Call API
    trackOrder(trackingNumber)
        .then(order => {
            // Display order details
            displayOrderDetails(order);
            
            // Show tracking info section
            trackingInfoSection.classList.remove('hidden');
            
            // Animate scroll to tracking info
            trackingInfoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(error => {
            console.error('Error tracking order:', error);
            
            // Show not found section
            notFoundSection.classList.remove('hidden');
            
            // Animate scroll to not found section
            notFoundSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .finally(() => {
            // Hide loading overlay
            loadingOverlay.classList.add('hidden');
        });
}

// Reset tracking form function
function resetTrackingForm() {
    // Clear input
    trackingNumberInput.value = '';
    
    // Focus input
    trackingNumberInput.focus();
    
    // Hide relevant sections
    notFoundSection.classList.add('hidden');
    trackingInfoSection.classList.add('hidden');
    
    // Scroll back to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Add input validation - only allow alphanumeric and hyphen
trackingNumberInput.addEventListener('input', function() {
    this.value = this.value.replace(/[^a-zA-Z0-9-]/g, '');
});

// Example tracking numbers for demo purposes
document.addEventListener('DOMContentLoaded', function() {
    // Add placeholder with example tracking number
    trackingNumberInput.placeholder = 'Enter tracking number (e.g., TR-12345678)';
    
    // Add tooltip for demonstration
    const searchBox = document.querySelector('.search-box');
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.innerHTML = '<p>Try these tracking numbers for demo: <strong>TR-12345678</strong> or <strong>TR-98765432</strong></p>';
    tooltip.style.fontSize = '0.8rem';
    tooltip.style.color = '#666';
    tooltip.style.marginTop = '5px';
    
    searchBox.appendChild(tooltip);
});

// Function to handle API integration (for real implementation)
function integrateWithRealAPI() {
    // In a real application, this function would call your actual API
    // Example implementation:
    
    /*
    async function fetchOrderStatus(trackingNumber) {
        try {
            const response = await fetch(`https://api.yourcompany.com/tracking/${trackingNumber}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer YOUR_API_KEY',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch order status');
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
    */
}

// Add feedback functionality for customer satisfaction
function collectFeedback() {
    // This would be implemented for collecting feedback on delivery
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feedbackType = this.dataset.feedback;
            // Send feedback to server
            console.log(`Customer provided ${feedbackType} feedback`);
            // Show thank you message
        });
    });
}

// Enable push notifications (would require additional setup)
function enableNotifications() {
    // Check if browser supports notifications
    if ('Notification' in window) {
        const notificationBtn = document.querySelector('.notification-btn');
        
        notificationBtn.addEventListener('click', function() {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    // Subscribe user to push notifications
                    console.log('Notifications enabled');
                    // In real app: subscribe to push service
                }
            });
        });
    }
}
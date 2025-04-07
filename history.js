// Sample order data - in a real app, this would come from an API
const orders = [
    {
        id: 1,
        trackingNumber: "TR-45928374",
        orderDate: "2025-03-15",
        product: "Wireless Headphones",
        status: "in-transit",
        eta: "2025-04-09",
        carrier: "Express Delivery",
        origin: "Seattle, WA",
        destination: "Portland, OR",
        timeline: [
            { date: "2025-04-05 08:30 AM", status: "Order Placed", description: "Your order has been confirmed and is being processed.", icon: "fa-shopping-cart" },
            { date: "2025-04-05 02:45 PM", status: "Order Processed", description: "Your order has been processed and is ready for shipping.", icon: "fa-box" },
            { date: "2025-04-06 09:15 AM", status: "Shipped", description: "Your package has been shipped with Express Delivery.", icon: "fa-shipping-fast", active: true },
            { date: "2025-04-06 06:20 PM", status: "In Transit", description: "Your package is on its way to the destination.", icon: "fa-truck" },
            { date: "2025-04-09", status: "Estimated Delivery", description: "Expected delivery to Portland, OR.", icon: "fa-home" }
        ]
    },
    {
        id: 2,
        trackingNumber: "TR-37592036",
        orderDate: "2025-03-28",
        product: "Smart Watch Pro",
        status: "in-transit",
        eta: "2025-04-10",
        carrier: "Express Delivery",
        origin: "Boston, MA",
        destination: "New York, NY",
        timeline: [
            { date: "2025-03-28 10:15 AM", status: "Order Placed", description: "Your order has been confirmed and is being processed.", icon: "fa-shopping-cart" },
            { date: "2025-03-28 03:30 PM", status: "Order Processed", description: "Your order has been processed and is ready for shipping.", icon: "fa-box" },
            { date: "2025-03-29 08:45 AM", status: "Shipped", description: "Your package has been shipped with Express Delivery.", icon: "fa-shipping-fast" },
            { date: "2025-04-03 07:20 PM", status: "In Transit", description: "Your package is on its way to the destination.", icon: "fa-truck", active: true },
            { date: "2025-04-10", status: "Estimated Delivery", description: "Expected delivery to New York, NY.", icon: "fa-home" }
        ]
    },
    {
        id: 3,
        trackingNumber: "TR-59204736",
        orderDate: "2025-02-17",
        product: "Tablet Pro Max",
        status: "delivered",
        eta: "2025-02-22",
        deliveredDate: "2025-02-21",
        carrier: "Standard Post",
        origin: "Chicago, IL",
        destination: "Detroit, MI",
        timeline: [
            { date: "2025-02-17 11:30 AM", status: "Order Placed", description: "Your order has been confirmed and is being processed.", icon: "fa-shopping-cart" },
            { date: "2025-02-17 04:45 PM", status: "Order Processed", description: "Your order has been processed and is ready for shipping.", icon: "fa-box" },
            { date: "2025-02-18 09:20 AM", status: "Shipped", description: "Your package has been shipped with Standard Post.", icon: "fa-shipping-fast" },
            { date: "2025-02-20 03:15 PM", status: "Out for Delivery", description: "Your package is out for delivery today.", icon: "fa-truck" },
            { date: "2025-02-21 02:40 PM", status: "Delivered", description: "Your package has been delivered successfully.", icon: "fa-check-circle", active: true }
        ]
    },
    {
        id: 4,
        trackingNumber: "TR-67392047",
        orderDate: "2025-03-05",
        product: "Gaming Console",
        status: "delivered",
        eta: "2025-03-15",
        deliveredDate: "2025-03-14",
        carrier: "Express Delivery",
        origin: "Austin, TX",
        destination: "Dallas, TX",
        timeline: [
            { date: "2025-03-05 09:45 AM", status: "Order Placed", description: "Your order has been confirmed and is being processed.", icon: "fa-shopping-cart" },
            { date: "2025-03-05 02:30 PM", status: "Order Processed", description: "Your order has been processed and is ready for shipping.", icon: "fa-box" },
            { date: "2025-03-06 10:15 AM", status: "Shipped", description: "Your package has been shipped with Express Delivery.", icon: "fa-shipping-fast" },
            { date: "2025-03-13 04:20 PM", status: "Out for Delivery", description: "Your package is out for delivery today.", icon: "fa-truck" },
            { date: "2025-03-14 01:45 PM", status: "Delivered", description: "Your package has been delivered successfully.", icon: "fa-check-circle", active: true }
        ]
    },
    {
        id: 5,
        trackingNumber: "TR-82649371",
        orderDate: "2025-04-01",
        product: "Smart Home Speaker",
        status: "pending",
        eta: "2025-04-12",
        carrier: "Economy",
        origin: "San Francisco, CA",
        destination: "Los Angeles, CA",
        timeline: [
            { date: "2025-04-01 10:20 AM", status: "Order Placed", description: "Your order has been confirmed and is being processed.", icon: "fa-shopping-cart", active: true },
            { date: "2025-04-08", status: "Expected Processing", description: "Your order is expected to be processed and prepared for shipping.", icon: "fa-box" },
            { date: "2025-04-09", status: "Expected Shipping", description: "Your package is expected to be shipped.", icon: "fa-shipping-fast" },
            { date: "2025-04-12", status: "Estimated Delivery", description: "Expected delivery to Los Angeles, CA.", icon: "fa-home" }
        ]
    },
    {
        id: 6,
        trackingNumber: "TR-93746201",
        orderDate: "2025-03-20",
        product: "Smartphone Ultra",
        status: "exception",
        eta: "2025-03-30",
        carrier: "Express Delivery",
        origin: "Miami, FL",
        destination: "Orlando, FL",
        timeline: [
            { date: "2025-03-20 08:15 AM", status: "Order Placed", description: "Your order has been confirmed and is being processed.", icon: "fa-shopping-cart" },
            { date: "2025-03-20 01:30 PM", status: "Order Processed", description: "Your order has been processed and is ready for shipping.", icon: "fa-box" },
            { date: "2025-03-21 09:45 AM", status: "Shipped", description: "Your package has been shipped with Express Delivery.", icon: "fa-shipping-fast" },
            { date: "2025-03-26 04:20 PM", status: "Exception", description: "Delivery exception: Address not accessible. Please contact support.", icon: "fa-exclamation-triangle", active: true }
        ]
    }
];

// DOM Elements
const orderList = document.getElementById('orderList');
const dateRangeFilter = document.getElementById('dateRange');
const statusFilter = document.getElementById('statusFilter');
const searchInput = document.getElementById('searchHistory');
const searchButton = document.getElementById('searchButton');
const modal = document.getElementById('orderDetailsModal');
const modalBody = document.getElementById('modalBody');
const closeModalButtons = document.querySelectorAll('.close-modal, .close-modal-btn');
const prevPageButton = document.getElementById('prevPage');
const nextPageButton = document.getElementById('nextPage');
const paginationNumbers = document.getElementById('paginationNumbers');

// Variables for pagination
let currentPage = 1;
const ordersPerPage = 5;
let filteredOrders = [...orders];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateStatistics();
    renderOrderList();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Filter changes
    dateRangeFilter.addEventListener('change', filterOrders);
    statusFilter.addEventListener('change', filterOrders);
    
    // Search
    searchButton.addEventListener('click', filterOrders);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            filterOrders();
        }
    });
    
    // Modal close buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.remove('show');
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
    
    // Pagination
    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderOrderList();
        }
    });
    
    nextPageButton.addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredOrders.length / ordersPerPage)) {
            currentPage++;
            renderOrderList();
        }
    });
}

// Filter orders based on selected criteria
function filterOrders() {
    const dateRange = parseInt(dateRangeFilter.value);
    const statusValue = statusFilter.value;
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    const now = new Date();
    const rangeDate = new Date();
    
    if (dateRange !== 'all') {
        rangeDate.setDate(now.getDate() - dateRange);
    }
    
    filteredOrders = orders.filter(order => {
        // Date filter
        const orderDate = new Date(order.orderDate);
        const dateMatch = dateRange === 'all' || orderDate >= rangeDate;
        
        // Status filter
        const statusMatch = statusValue === 'all' || order.status === statusValue;
        
        // Search term
        const searchMatch = searchTerm === '' || 
            order.trackingNumber.toLowerCase().includes(searchTerm) || 
            order.product.toLowerCase().includes(searchTerm);
        
        return dateMatch && statusMatch && searchMatch;
    });
    
    // Reset to first page when filtering
    currentPage = 1;
    
    // Update the UI
    updateStatistics();
    renderOrderList();
}

// Update order statistics
function updateStatistics() {
    const stats = {
        active: orders.filter(order => order.status === 'in-transit' || order.status === 'pending').length,
        delivered: orders.filter(order => order.status === 'delivered').length,
        exception: orders.filter(order => order.status === 'exception').length,
        total: orders.length
    };
    
    document.getElementById('activeOrders').textContent = stats.active;
    document.getElementById('deliveredOrders').textContent = stats.delivered;
    document.getElementById('exceptionOrders').textContent = stats.exception;
    document.getElementById('totalOrders').textContent = stats.total;
}

// Render the order list with pagination
function renderOrderList() {
    // Clear current list
    orderList.innerHTML = '';
    
    if (filteredOrders.length === 0) {
        renderEmptyState();
        return;
    }
    
    // Calculate pagination
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = Math.min(startIndex + ordersPerPage, filteredOrders.length);
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    
    // Render orders
    paginatedOrders.forEach(order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        
        // Format date
        const orderDate = new Date(order.orderDate);
        const formattedDate = orderDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        orderItem.innerHTML = `
            <div class="order-tracking">${order.trackingNumber}</div>
            <div class="order-date">${formattedDate}</div>
            <div class="order-product">
                <div class="product-image">
                    <i class="fas fa-box"></i>
                </div>
                <div class="product-name">${order.product}</div>
            </div>
            <div class="order-status">
                <span class="status-${order.status}">${getStatusText(order.status)}</span>
            </div>
            <div class="order-eta">${getETAText(order)}</div>
            <div class="order-actions">
                <div class="action-icon action-view" data-id="${order.id}">
                    <i class="fas fa-eye"></i>
                </div>
                <div class="action-icon action-track" data-id="${order.id}">
                    <i class="fas fa-route"></i>
                </div>
                <div class="action-icon action-delete" data-id="${order.id}">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        `;
        
        // Add click event for view details
        const viewButton = orderItem.querySelector('.action-view');
        viewButton.addEventListener('click', () => showOrderDetails(order));
        
        // Add click event for delete (in a real app, this would call an API)
        const deleteButton = orderItem.querySelector('.action-delete');
        deleteButton.addEventListener('click', () => {
            const index = filteredOrders.findIndex(o => o.id === order.id);
            if (index !== -1) {
                filteredOrders.splice(index, 1);
                const originalIndex = orders.findIndex(o => o.id === order.id);
                if (originalIndex !== -1) {
                    orders.splice(originalIndex, 1);
                }
                updateStatistics();
                renderOrderList();
            }
        });
        
        orderList.appendChild(orderItem);
    });
    
    updatePagination();
}

// Render empty state when no orders match filters
function renderEmptyState() {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.innerHTML = `
        <i class="fas fa-search"></i>
        <h4>No Orders Found</h4>
        <p>We couldn't find any orders matching your filters. Try adjusting your search criteria or view all orders.</p>
        <button id="resetFilters">Reset Filters</button>
    `;
    
    orderList.appendChild(emptyState);
    
    // Add event listener to reset filters button
    const resetButton = document.getElementById('resetFilters');
    resetButton.addEventListener('click', () => {
        dateRangeFilter.value = 'all';
        statusFilter.value = 'all';
        searchInput.value = '';
        filteredOrders = [...orders];
        currentPage = 1;
        renderOrderList();
    });
}

// Update pagination UI
function updatePagination() {
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    
    // Update pagination numbers
    paginationNumbers.innerHTML = '';
    
    // Create a simplified pagination with max 3 pages visible
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(startPage + 2, totalPages);
    
    if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            renderOrderList();
        });
        paginationNumbers.appendChild(pageNumber);
    }
    
    // Update buttons state
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages || totalPages === 0;
}

// Show order details in modal
function showOrderDetails(order) {
    modalBody.innerHTML = `
        <div class="order-detail-header">
            <div class="order-detail-icon">
                <i class="fas fa-box-open"></i>
            </div>
            <div class="order-detail-title">
                <h4>${order.product}</h4>
                <p>Tracking #: ${order.trackingNumber}</p>
            </div>
        </div>
        
        <div class="order-info-grid">
            <div class="order-info-item">
                <h5>Order Date</h5>
                <p>${formatDate(order.orderDate)}</p>
            </div>
            <div class="order-info-item">
                <h5>Status</h5>
                <p>${getStatusText(order.status)}</p>
            </div>
            <div class="order-info-item">
                <h5>Carrier</h5>
                <p>${order.carrier}</p>
            </div>
            <div class="order-info-item">
                <h5>${order.status === 'delivered' ? 'Delivered Date' : 'Estimated Delivery'}</h5>
                <p>${order.status === 'delivered' ? formatDate(order.deliveredDate) : formatDate(order.eta)}</p>
            </div>
        </div>
        
        <div class="order-info-grid">
            <div class="order-info-item">
                <h5>Origin</h5>
                <p>${order.origin}</p>
            </div>
            <div class="order-info-item">
                <h5>Destination</h5>
                <p>${order.destination}</p>
            </div>
        </div>
        
        <div class="order-timeline">
            <h4 class="timeline-title">Tracking History</h4>
            ${renderTimeline(order.timeline)}
        </div>
    `;
    
    modal.classList.add('show');
}

// Render timeline for order details
function renderTimeline(timeline) {
    return timeline.map(item => `
        <div class="timeline-item ${item.active ? 'active' : ''}">
            <div class="timeline-icon">
                <i class="fas ${item.icon}"></i>
            </div>
            <div class="timeline-content">
                <h5>${item.status}</h5>
                <p>${item.description}</p>
                <div class="timeline-date">${item.date}</div>
            </div>
        </div>
    `).join('');
}

// Helper function to format dates
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    
    // Check if dateString includes time
    if (dateString.includes(':')) {
        return dateString; // Already formatted with time
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Helper function to get status text
function getStatusText(status) {
    const statusMap = {
        'in-transit': 'In Transit',
        'delivered': 'Delivered',
        'pending': 'Pending',
        'exception': 'Exception'
    };
    
    return statusMap[status] || status;
}

// Helper function to get ETA text
function getETAText(order) {
    if (order.status === 'delivered') {
        return `Delivered on ${formatDate(order.deliveredDate)}`;
    } else if (order.status === 'exception') {
        return 'Delivery Exception';
    } else {
        return `${formatDate(order.eta)}`;
    }
}
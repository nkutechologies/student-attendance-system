document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();

    document.getElementById('dashboardTab').onclick = function() { toggleTab('dashboard'); };
    document.getElementById('featuresTab').onclick = function() { toggleTab('features'); };
    document.getElementById('dataManagementTab').onclick = function() { toggleTab('dataManagement'); };
    document.getElementById('reportsTab').onclick = function() { toggleTab('reports'); };
});

function toggleTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.add('hidden');
    });
    document.getElementById(tabName).classList.remove('hidden');
}

async function loadDashboardData() {
    try {
        const response = await fetch('/api/attendance/stats');
        const data = await response.json();

        document.getElementById('totalRecords').innerText = data.totalRecords;
        document.getElementById('presentCount').innerText = data.presentCount;
        document.getElementById('absentCount').innerText = data.absentCount;
        document.getElementById('attendanceRate').innerText = `${data.attendanceRate}%`;
    } catch (error) {
        console.error('Error loading dashboard data:', error);
    }
}
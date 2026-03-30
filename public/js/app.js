document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('nav button');
    const tabContents = document.querySelectorAll('.tab-content');

    function showTab(tabId) {
        tabContents.forEach(tc => tc.classList.add('hidden'));
        document.getElementById(tabId).classList.remove('hidden');
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            showTab(tab.id.split('-')[0]);
        });
    });

    async function loadDashboardData() {
        try {
            const response = await fetch('/api/attendance/stats');
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            document.getElementById('totalRecords').innerText = data.totalRecords;
            document.getElementById('presentCount').innerText = data.presentCount;
            document.getElementById('absentCount').innerText = data.absentCount;
            document.getElementById('attendanceRate').innerText = data.attendanceRate + '%';
        } catch (error) {
            console.error('Error loading dashboard data:', error);
        }
    }

    loadDashboardData();
    showTab('dashboard');
});
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardData();

    const tabs = document.querySelectorAll('.tab-btn');
    const content = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('bg-blue-700')); // Deselect all tabs
            content.forEach(c => c.classList.add('hidden')); // Hide all content
            tab.classList.add('bg-blue-700'); // Highlight selected tab
            const selectedTab = tab.id.replace('tab-', '');
            document.getElementById(selectedTab).classList.remove('hidden'); // Show selected content
        });
    });
});

async function loadDashboardData() {
    try {
        const [statsRes, studentsRes, teachersRes] = await Promise.all([
            fetch('/api/attendance/stats'),
            fetch('/api/students'),
            fetch('/api/teachers')
        ]);

        if (!statsRes.ok || !studentsRes.ok || !teachersRes.ok) {
            throw new Error('Failed to fetch data');
        }

        const stats = await statsRes.json();
        const students = await studentsRes.json();
        const teachers = await teachersRes.json();

        document.getElementById('totalRecords').innerText = stats.totalRecords;
        document.getElementById('presentCount').innerText = stats.presentCount;
        document.getElementById('absentCount').innerText = stats.absentCount;
        document.getElementById('attendanceRate').innerText = stats.attendanceRate + '%';
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        alert('Failed to load dashboard data.');
    }
}
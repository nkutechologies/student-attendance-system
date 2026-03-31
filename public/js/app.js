document.addEventListener('DOMContentLoaded', () => {
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function fetchAttendanceStats() {
        fetch('/api/attendance/stats')
            .then(response => response.json())
            .then(data => {
                document.getElementById('totalRecords').innerText = data.totalRecords;
                document.getElementById('presentCount').innerText = data.presentCount;
                document.getElementById('absentCount').innerText = data.absentCount;
                document.getElementById('attendanceRate').innerText = data.attendanceRate + '%';
            })
            .catch(console.error);
    }

    function fetchStudents() {
        fetch('/api/students')
            .then(response => response.json())
            .then(data => {
                const table = document.getElementById('studentsTable');
                table.innerHTML = '';
                data.forEach(student => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td class='p-2'>${escapeHtml(student.id)}</td><td class='p-2'>${escapeHtml(student.name)}</td><td class='p-2'>${escapeHtml(student.status)}</td>`;
                    table.appendChild(row);
                });
            })
            .catch(console.error);
    }

    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
            const activeTab = button.id.replace('-tab', '');
            document.getElementById(activeTab).classList.remove('hidden');
            if (activeTab === 'dashboard') fetchAttendanceStats();
            if (activeTab === 'students') fetchStudents();
        });
    });

    fetchAttendanceStats();
});
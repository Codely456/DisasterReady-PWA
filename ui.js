import { quizBank, chapters, masterAchievements } from './data.js';

const appContainer = document.getElementById('app');

export function renderLoginPage(loginHandler, clearDataHandler, onInputFocus) {
    appContainer.innerHTML = `
    <div class="min-h-screen bg-[url('./assets/images/login-background-1.jpg')] bg-cover bg-center p-4 flex items-center justify-center">

        <div class="max-w-6xl w-full grid md:grid-cols-2 gap-8">
            
            <!-- Emergency Access Card -->
            <div id="emergency-card" class="emergency-card-pulse bg-red-50/95 dark:bg-red-900/80 backdrop-blur-sm border-2 border-red-200 dark:border-red-700 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between cursor-pointer">
                <div class="text-center">
                    <div class="mx-auto mb-4 text-5xl">🚨</div>
                    <h2 class="text-2xl font-bold text-white dark:text-white">EMERGENCY ACCESS</h2>
                    <p class="text-white dark:text-white font-medium">Instant access during emergencies - No login required</p>
                </div>
                <div class="space-y-2 text-sm text-white dark:text-white my-6">
                    <div class="flex items-center gap-2"><span class="w-2 h-2 bg-red-500 rounded-full"></span>Quick Emergency Protocols</div>
                    <div class="flex items-center gap-2"><span class="w-2 h-2 bg-red-500 rounded-full"></span>Evacuation Routes & Maps</div>
                    <div class="flex items-center gap-2"><span class="w-2 h-2 bg-red-500 rounded-full"></span>Emergency Contacts</div>
                    <div class="flex items-center gap-2"><span class="w-2 h-2 bg-red-500 rounded-full"></span>SOS Alert System</div>
                </div>
                <button id="emergency-btn" class="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-lg shadow-lg rounded-xl transition-transform hover:scale-105">
                    🚨 EMERGENCY ACCESS
                </button>
            </div>

            <!-- Login Card -->
            <div class="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl animate-card-enter">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold text-indigo-800 dark:text-indigo-300">Learning Access</h2>
                    <p class="text-gray-500 dark:text-gray-400 mt-2">Please sign in to your account.</p>
                </div>

                <!-- Tabs -->
                <div class="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                    <button id="student-tab" class="flex-1 py-2 font-semibold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600">Student</button>
                    <button id="admin-tab" class="flex-1 py-2 font-semibold text-gray-500 dark:text-gray-400">Admin</button>
                </div>

                <!-- Student Form -->
                <form id="student-login-form" class="space-y-6">
                    ${createFormFields('student')}
                </form>

                <!-- Admin Form (hidden by default) -->
                <form id="admin-login-form" class="space-y-6 hidden">
                    ${createFormFields('admin')}
                </form>

                <button id="clear-data-btn" class="mt-4 w-full text-xs text-gray-500 hover:text-red-500 hover:underline">Reset Saved Data</button>

                
            </div>
        </div>
    </div>
    `;

    const studentTab = document.getElementById('student-tab');
    const adminTab = document.getElementById('admin-tab');
    const studentForm = document.getElementById('student-login-form');
    const adminForm = document.getElementById('admin-login-form');

    studentTab.onclick = () => {
        studentTab.classList.add('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600');
        studentTab.classList.remove('text-gray-500', 'dark:text-gray-400');
        adminTab.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600');
        adminTab.classList.add('text-gray-500', 'dark:text-gray-400');
        studentForm.classList.remove('hidden');
        adminForm.classList.add('hidden');
    };

    adminTab.onclick = () => {
        adminTab.classList.add('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600');
        adminTab.classList.remove('text-gray-500', 'dark:text-gray-400');
        studentTab.classList.remove('text-indigo-600', 'dark:text-indigo-400', 'border-indigo-600');
        studentTab.classList.add('text-gray-500', 'dark:text-gray-400');
        adminForm.classList.remove('hidden');
        studentForm.classList.add('hidden');
    };

    studentForm.onsubmit = (e) => {
        e.preventDefault();
        loginHandler('student');
    };
    adminForm.onsubmit = (e) => {
        e.preventDefault();
        loginHandler('admin');
    };
    document.getElementById('clear-data-btn').onclick = clearDataHandler;
    document.querySelectorAll('input').forEach(input => {
        input.onfocus = () => onInputFocus(input, true);
        input.onblur = () => onInputFocus(input, false);
    });
    document.getElementById('emergency-btn').onclick = () => {
        window.location.href = 'emergency.html';
    };
     document.getElementById('emergency-card').onclick = () => {
        window.location.href = 'emergency.html';
    };
}

function createFormFields(role) {
    return `
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div>
            <input type="text" id="${role}-id-input" class="w-full pl-10 p-3 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="User ID (e.g., ${role}-101)" required>
            <p id="${role}-id-error" class="text-red-500 text-xs mt-1 pl-1 hidden h-4"></p>
        </div>
        <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div>
            <input type="password" id="${role}-password-input" class="w-full pl-10 p-3 bg-gray-50 border border-gray-300 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white rounded-lg focus:ring-blue-500 focus:border-blue-500" placeholder="Password" required>
            <p id="${role}-password-error" class="text-red-500 text-xs mt-1 pl-1 hidden h-4"></p>
        </div>
        <button type="submit" class="w-full bg-indigo-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-600 transition-transform hover:scale-105">
            Sign In as ${role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
    `;
}

export function setInputError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(`${inputId}-error`);
    if (input && errorEl) {
        input.classList.remove('border-gray-300', 'dark:border-gray-600', 'focus:ring-blue-500', 'focus:border-blue-500');
        input.classList.add('border-red-500', 'dark:border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
}

export function clearInputError(inputId) {
    const input = document.getElementById(inputId);
    const errorEl = document.getElementById(`${inputId}-error`);
    if (input && errorEl) {
        input.classList.remove('border-red-500', 'dark:border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
        input.classList.add('border-gray-300', 'dark:border-gray-600', 'focus:ring-blue-500', 'focus:border-blue-500');
        errorEl.classList.add('hidden');
    }
}

export function renderAppShell() {
    appContainer.innerHTML = `
        <div id="loading-spinner" class="fixed inset-0 bg-white dark:bg-slate-900 bg-opacity-75 flex items-center justify-center z-50 hidden">
            <div class="animate-spin rounded-full h-32 w-32 border-b-4 border-blue-500"></div>
        </div>
        <div id="content-container"></div>
    `;
}

export function renderStudentUI(userId, userData, eventHandlers) {
    const contentContainer = document.getElementById('content-container');
    const level = Math.floor(userData.score / 100) + 1;
    const progress = (userData.score % 100);
    const earnedAchievements = userData.achievements || [];

    contentContainer.innerHTML = `
        <div class="min-h-screen p-4 sm:p-8">
            <div class="max-w-4xl mx-auto">
                <header class="flex justify-between items-start mb-8 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
                    <div>
                        <h1 class="text-3xl sm:text-4xl font-bold text-blue-800 dark:text-blue-300">Welcome back,</h1>
                        <p class="text-gray-500 dark:text-gray-500 mt-1 text-sm">${userId}</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <a href="emergency.html" class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-4xl animate-pulse">🚨</a>
                        <button id="install-pwa-btn" class="hidden bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">Install App</button>
                        ${renderThemeToggle()}
                        <button id="logout-btn" class="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors">Log Out</button>
                    </div>
                </header>
                
                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8 animate-card-enter" style="--delay: 0.1s;">
                    <div class="text-center">
                        <h2 class="text-2xl font-semibold text-blue-600">Your Score</h2>
                        <p class="score-pop text-4xl sm:text-5xl font-extrabold my-2 gradient-text">${userData.score}</p>
                        <p class="font-extrabold text-2xl text-amber-500 dark:text-amber-400 mt-2">Level ${level}</p>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-4 my-2 shadow-inner">
                        <div class="bg-green-500 h-4 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                    </div>
                    <p class="text-right text-sm text-gray-500 dark:text-gray-400">${progress} / 100 XP to next level</p>
                </div>

                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg mb-8 animate-card-enter" style="--delay: 0.2s;">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Lessons & Tests</h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div id="start-learning-btn" class="bg-green-500 text-white p-6 rounded-xl shadow-lg cursor-pointer interactive-card flex flex-col justify-between">
                            <div>
                                <h3 class="text-2xl font-bold">Learning Chapters</h3>
                                <p class="mt-2">Read through all the disaster preparedness modules.</p>
                            </div>
                            <p class="text-right font-bold mt-4">&rarr;</p>
                        </div>
                        ${chapters.filter(c => c.gameType !== 'none').map(chapter => {
                            const icons = { fire: '🔥', earthquake: '⛰️', flood: '🌊', tornado: '🌪️', 'active-shooter': '🛡️', wildfire: '🌲', hurricane: '🌀' };
                            const colors = { fire: 'bg-red-500 hover:bg-red-600', earthquake: 'bg-yellow-500 hover:bg-yellow-600', flood: 'bg-blue-500 hover:bg-blue-600', tornado: 'bg-sky-500 hover:bg-sky-600', 'active-shooter': 'bg-gray-500 hover:bg-gray-600', wildfire: 'bg-orange-500 hover:bg-orange-600', hurricane: 'bg-indigo-500 hover:bg-indigo-600' };
                            const descriptions = {
                                fire: 'Test your knowledge on fire evacuation and safety.',
                                earthquake: 'Do you know what to do when the ground shakes?',
                                flood: 'Learn how to stay safe when water levels rise.',
                                tornado: 'Assess your knowledge on tornado warnings and shelters.',
                                'active-shooter': 'Understand the recommended response protocols.',
                                wildfire: 'Check your readiness for wildfire threats.',
                                hurricane: 'Prepare for powerful coastal storms.'
                            };
                            return `
                            <div data-quiz-type="${chapter.gameType}" class="quiz-btn ${colors[chapter.gameType] || 'bg-gray-500'} text-white p-6 rounded-xl shadow-lg cursor-pointer interactive-card flex flex-col justify-between">
                                <div>
                                    <h3 class="text-2xl font-bold">${icons[chapter.gameType] || '❓'} ${chapter.gameTitle}</h3>
                                    <p class="mt-2">${descriptions[chapter.gameType] || ''}</p>
                                </div>
                                <p class="text-right font-bold mt-4">&rarr;</p>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg animate-card-enter" style="--delay: 0.3s;">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Achievements</h2>
                    <div id="achievements-container" class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        ${masterAchievements.map(ach => {
                            const isEarned = earnedAchievements.includes(ach.id);
                            return `
                            <div class="p-4 rounded-lg ${isEarned ? 'bg-amber-100 dark:bg-amber-900/50' : 'bg-gray-100 dark:bg-slate-700'} transition-all duration-300 ${isEarned ? 'hover:bg-amber-200' : ''}">
                                <div class="text-4xl transition-transform duration-300 ${isEarned ? 'grayscale-0 scale-110' : 'grayscale'}">${isEarned ? '🏆' : '🔒'}</div>
                                <p class="font-bold mt-2 ${isEarned ? 'text-amber-800 dark:text-amber-300' : 'text-gray-500 dark:text-gray-400'}">${ach.name}</p>
                                <p class="text-xs ${isEarned ? 'text-amber-600 dark:text-amber-400' : 'text-gray-400 dark:text-gray-500'}">${ach.description}</p>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('start-learning-btn').onclick = eventHandlers.onStartLearning;
    document.querySelectorAll('.quiz-btn').forEach(btn => {
        btn.onclick = () => eventHandlers.onTakeQuiz(btn.dataset.quizType);
    });
    document.getElementById('logout-btn').onclick = eventHandlers.onLogout;
    document.getElementById('theme-toggle-btn')?.addEventListener('click', handleThemeToggle);
}

let scoreChartInstance = null;

export function renderAdminUI(students, sort, filter, stats, eventHandlers) {
    const contentContainer = document.getElementById('content-container');
    
    let displayedStudents = students.filter(student => student.id.toLowerCase().includes(filter.toLowerCase()));
    
    displayedStudents.sort((a, b) => {
        const valA = a[sort.column] || (sort.column === 'score' ? 0 : '');
        const valB = b[sort.column] || (sort.column === 'score' ? 0 : '');
        const compare = valA > valB ? 1 : (valA < valB ? -1 : 0);
        return sort.direction === 'asc' ? compare : -compare;
    });

    contentContainer.innerHTML = `
        <div class="min-h-screen p-4 sm:p-8 animate-fade-in">
            <div class="max-w-6xl mx-auto">
                <header class="flex justify-between items-center mb-8">
                    <div class="flex-1">
                        <h1 class="text-3xl sm:text-4xl font-bold text-red-800 dark:text-red-400">Admin Dashboard</h1>
                        <p class="text-gray-600 dark:text-gray-400 mt-2">School-wide student performance overview.</p>
                    </div>
                    <div class="flex items-center space-x-4">
                        <a href="emergency.html" class="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-4xl animate-pulse">🚨</a>
                        <button id="install-pwa-btn" class="hidden bg-purple-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">Install App</button>
                        ${renderThemeToggle()}
                        <button id="logout-btn" class="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors">Log Out</button>
                    </div>
                </header>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center animate-card-enter" style="--delay: 0.1s;">
                        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300">Total Students</h3>
                        <p class="text-3xl sm:text-4xl font-extrabold text-red-700 dark:text-red-500 mt-2">${students.length}</p>
                    </div>
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center animate-card-enter" style="--delay: 0.2s;">
                        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300">Average Score</h3>
                        <p class="text-3xl sm:text-4xl font-extrabold text-red-700 dark:text-red-500 mt-2">${stats.averageScore}</p>
                    </div>
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center animate-card-enter" style="--delay: 0.3s;">
                        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300">Collective Score</h3>
                        <p class="text-3xl sm:text-4xl font-extrabold text-red-700 dark:text-red-500 mt-2">${stats.totalScore}</p>
                    </div>
                    <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg text-center animate-card-enter" style="--delay: 0.4s;">
                        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300">Top Achievement</h3>
                        <p class="text-xl sm:text-2xl font-bold text-red-700 dark:text-red-500 mt-2 break-words">${stats.topAchievement}</p>
                    </div>
                </div>

                <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg animate-card-enter" style="--delay: 0.5s;">
                    <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Student Leaderboard</h2>
                    <input type="text" id="student-filter" placeholder="Filter by User ID..." class="mb-4 p-2 border rounded w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" value="${filter}">
                    <div class="overflow-x-auto">
                        <table id="student-leaderboard" class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-slate-700">
                                <tr>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rank</th>
                                    <th data-sort="id" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600">User ID ${sort.column === 'id' ? (sort.direction === 'asc' ? '▲' : '▼') : ''}</th>
                                    <th data-sort="score" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-600">Score ${sort.column === 'score' ? (sort.direction === 'asc' ? '▲' : '▼') : ''}</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Level</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                                ${displayedStudents.length > 0 ? displayedStudents.map((student, index) => {
                                    let rankContent = index + 1;
                                    // Only show medals if sorting by score desc and no filter is active
                                    if (sort.column === 'score' && sort.direction === 'desc' && filter === '') {
                                        if (index === 0) rankContent = '🥇';
                                        if (index === 1) rankContent = '🥈';
                                        if (index === 2) rankContent = '🥉';
                                    }
                                    return `
                                        <tr class="hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer transition-colors" data-student-id="${student.id}">
                                            <td class="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-500 dark:text-gray-400 text-center">${rankContent}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200 truncate">${student.id}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600 dark:text-blue-400">${student.score || 0}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${Math.floor((student.score || 0) / 100) + 1}</td>
                                        </tr>
                                    `;
                                }).join('') : `
                                    <tr><td colspan="4" class="text-center py-8 text-gray-500">No students found matching the filter.</td></tr>
                                `}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('logout-btn').onclick = eventHandlers.onLogout;
    document.getElementById('student-filter').oninput = (e) => eventHandlers.onFilter(e.target.value);
    document.querySelectorAll('#student-leaderboard th[data-sort]').forEach(th => {
        th.onclick = () => eventHandlers.onSort(th.dataset.sort);
    });
    document.querySelectorAll('#student-leaderboard tbody tr[data-student-id]').forEach(row => {
        row.onclick = () => eventHandlers.onSelectStudent(row.dataset.studentId);
    });
    document.getElementById('theme-toggle-btn')?.addEventListener('click', handleThemeToggle);
}

export function renderChapterList(userData, eventHandlers) {
    const contentContainer = document.getElementById('content-container');
    const completedQuizzes = userData.completedQuizzes || [];
    contentContainer.innerHTML = `
        <div class="min-h-screen p-4 sm:p-8 animate-fade-in">
            <header class="text-center mb-8">
                <h1 class="text-3xl sm:text-4xl font-bold text-blue-800 dark:text-blue-300">Learning Modules</h1>
                <p class="text-gray-600 dark:text-gray-400 mt-2">Choose a chapter to begin.</p>
                <button id="back-to-dashboard-btn" class="mt-4 text-blue-500 hover:underline">&larr; Back to Dashboard</button>
            </header>
            <div class="max-w-4xl mx-auto space-y-4">
                ${chapters.map((chapter, index) => {
                    const isCompleted = chapter.gameType !== 'none' && completedQuizzes.includes(chapter.gameType);
                    const icons = {
                        fire: '🔥',
                        earthquake: '⛰️',
                        flood: '🌊',
                        tornado: '🌪️',
                        wildfire: '🌲',
                        hurricane: '🌀',
                        'active-shooter': '🛡️',
                        default: '📖'
                    };
                    const icon = icons[chapter.gameType] || icons.default;
                    return `
                    <div data-chapter-index="${index}" class="chapter-item bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md cursor-pointer interactive-card flex justify-between items-center">
                        <div class="flex items-center">
                            <div class="text-3xl mr-4">${isCompleted ? '✅' : icon}</div>
                            <div>
                                <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200">${chapter.title}</h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400">${isCompleted ? 'Completed!' : 'Click to start learning'}</p>
                            </div>
                        </div>
                        <div class="text-2xl text-gray-400">&rarr;</div>
                    </div>
                `}).join('')}
            </div>
        </div>
    `;

    document.getElementById('back-to-dashboard-btn').onclick = eventHandlers.onBackToDashboard;
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.onclick = () => eventHandlers.onSelectChapter(item.dataset.chapterIndex);
    });
}

export function renderChapterDetail(index, userData, eventHandlers) {
    const chapter = chapters[index];
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = `
        <div class="min-h-screen p-4 sm:p-8">
            <header class="text-center mb-8">
                <h1 class="text-3xl md:text-4xl font-bold text-blue-800 dark:text-blue-300">${chapter.title}</h1>
                <button id="back-to-chapters-btn" class="mt-4 text-blue-500 hover:underline">&larr; Back to Chapters</button>
            </header>
            <div class="max-w-6xl mx-auto bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg animate-card-enter grid md:grid-cols-2 gap-8 md:items-start">
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mb-4">Virtual Drill</h3>
                    <div class="video-container">
                        <video src="${chapter.videoUrl}" controls class="w-full rounded-lg shadow-lg"></video>
                    </div>
                </div>
                <div class="p-6">
                    ${chapter.content.map(item => {
                        let contentHtml = '';
                        if (item.type === 'text') {
                            contentHtml = `<p class="text-gray-700 dark:text-gray-300 leading-relaxed">${item.value}</p>`;
                        } else if (item.type === 'image') {
                            contentHtml = `<img src="${item.value}" alt="Chapter Image" class="rounded-xl w-full h-auto my-4 shadow-lg">`;
                        } else if (item.type === 'heading') {
                            contentHtml = `<h3 class="text-2xl font-bold text-blue-700 dark:text-blue-400 mt-8 mb-4 border-b-2 border-blue-200 dark:border-blue-800 pb-2">${item.value}</h3>`;
                        } else if (item.type === 'list') {
                            contentHtml = `<ul class="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">${item.value.map(li => `<li>${li}</li>`).join('')}</ul>`;
                        }
                        return `<div class="mb-6">${contentHtml}</div>`;
                    }).join('')}
                </div>
            </div>
            <div class="max-w-6xl mx-auto mt-8 text-center">
                 <button id="show-quiz-btn" class="w-full bg-purple-600 text-white font-bold py-4 rounded-xl shadow-md hover:bg-purple-700 transition-all transform hover:scale-105 mb-4">
                    Take Chapter Quiz
                </button>
            </div>
        </div>
    `;

    document.getElementById('back-to-chapters-btn').onclick = eventHandlers.onBackToChapters;
    document.getElementById('show-quiz-btn').onclick = () => eventHandlers.onTakeQuiz(chapter.gameType);
}

export function showQuizDialog(quizType, onQuizComplete) {
    const questionsForType = quizBank[quizType];
    if (!questionsForType || questionsForType.length === 0) {
        showToast('No quiz available for this topic yet.', 'bg-gray-500');
        return;
    }

    const selectedQuestions = [...questionsForType].sort(() => 0.5 - Math.random()).slice(0, 10);
    let currentQuestionIndex = 0;
    let score = 0;

    document.body.insertAdjacentHTML('beforeend', `<div id="quiz-modal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50"><div id="quiz-content" class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-2xl w-full transform transition-all duration-300 scale-95 opacity-0"></div></div>`);
    setTimeout(() => document.getElementById('quiz-content')?.classList.remove('scale-95', 'opacity-0'), 50);

    function renderQuestion() {
        const question = selectedQuestions[currentQuestionIndex];
        const quizContent = document.getElementById('quiz-content');
        quizContent.innerHTML = `
            <div class="mb-4">
                <div class="flex justify-between items-center mb-2"><h3 class="text-lg font-bold text-blue-800 dark:text-blue-300">Question ${currentQuestionIndex + 1} / ${selectedQuestions.length}</h3><p class="font-bold text-green-600">Score: ${score}</p></div>
                <div class="w-full bg-gray-200 rounded-full h-2.5"><div class="bg-blue-600 h-2.5 rounded-full" style="width: ${((currentQuestionIndex + 1) / selectedQuestions.length) * 100}%"></div></div>
            </div>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">${question.q}</p>
            <div id="quiz-options" class="space-y-3">${question.a.map((option, index) => `<button data-index="${index}" class="quiz-option w-full text-left p-4 border-2 border-gray-300 dark:border-gray-600 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 hover:border-blue-400 transition-all flex justify-between items-center"><span>${option}</span><span class="feedback-icon"></span></button>`).join('')}</div>`;

        document.querySelectorAll('.quiz-option').forEach(button => {
            button.onclick = (e) => {
                const selectedIndex = parseInt(e.currentTarget.dataset.index);
                if (selectedIndex === question.correct) {
                    score += 20; // 20 points per correct answer
                    e.currentTarget.classList.add('bg-green-100', 'dark:bg-green-900/50', 'border-green-500');
                    e.currentTarget.querySelector('.feedback-icon').innerHTML = '✔️';
                } else {
                    e.currentTarget.classList.add('bg-red-100', 'dark:bg-red-900/50', 'border-red-500');
                    e.currentTarget.querySelector('.feedback-icon').innerHTML = '❌';
                    const correctButton = document.querySelector(`.quiz-option[data-index="${question.correct}"]`);
                    correctButton.classList.add('bg-green-100', 'dark:bg-green-900/50', 'border-green-500');
                    correctButton.querySelector('.feedback-icon').innerHTML = '✔️';
                }
                document.querySelectorAll('.quiz-option').forEach(btn => btn.disabled = true);
                setTimeout(() => {
                    currentQuestionIndex++;
                    (currentQuestionIndex < selectedQuestions.length) ? renderQuestion() : endQuiz();
                }, 1500);
            };
        });
    }

    function endQuiz() {
        const quizContent = document.getElementById('quiz-content');
        quizContent.innerHTML = `<div class="text-center relative"><div class="text-5xl sm:text-6xl mb-4">🎉</div><h3 class="text-2xl sm:text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">Quiz Complete!</h3><p class="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-2">You scored</p><p class="text-4xl sm:text-5xl font-extrabold text-green-600 mb-6">${score} / ${selectedQuestions.length * 20}</p></div><button id="close-quiz-btn" class="w-full bg-blue-500 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors">Close</button>`;
        
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'absolute inset-0 overflow-hidden pointer-events-none';
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.setProperty('--x', Math.random() * 100);
            confetti.style.setProperty('--r', Math.random() * 360);
            confettiContainer.appendChild(confetti);
        }
        quizContent.querySelector('.text-center').prepend(confettiContainer);

        document.getElementById('close-quiz-btn').onclick = () => {
            onQuizComplete(score);
            hideQuizDialog();
        };
    }

    renderQuestion();
}

export function hideQuizDialog() {
    const modal = document.getElementById('quiz-modal');
    const quizContent = document.getElementById('quiz-content');
    if (quizContent) quizContent.classList.add('scale-95', 'opacity-0');
    if (modal) setTimeout(() => modal.remove(), 300);
}

export function renderStudentDetailModal(studentId, studentData) {
    const earnedAchievements = studentData.achievements || [];
    const modalHTML = `
        <div id="detail-modal" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
            <div class="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl max-w-lg w-full relative">
                <button id="close-detail-modal" class="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-800">&times;</button>
                <h2 class="text-xl sm:text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Student Details</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400">User ID: <span class="font-mono">${studentId}</span></p>
                <div class="my-4 text-center">
                    <p class="text-lg text-gray-600 dark:text-gray-300">Score</p>
                    <p class="text-3xl sm:text-4xl font-bold gradient-text">${studentData.score}</p>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Achievements</h3>
                <div class="grid grid-cols-3 gap-2 text-center">
                    ${masterAchievements.map(ach => {
                        const isEarned = earnedAchievements.includes(ach.id);
                        return `
                        <div class="p-2 rounded-lg ${isEarned ? 'bg-amber-100 dark:bg-amber-900/50' : 'bg-gray-100 dark:bg-slate-700'}">
                            <div class="text-3xl ${isEarned ? 'grayscale-0' : 'grayscale'}">${isEarned ? '🏆' : '🔒'}</div>
                            <p class="text-xs font-bold ${isEarned ? 'text-amber-800 dark:text-amber-300' : 'text-gray-500 dark:text-gray-400'}">${ach.name}</p>
                        </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    document.getElementById('close-detail-modal').onclick = () => document.getElementById('detail-modal').remove();
}

export function showLoading(show) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) spinner.style.display = show ? 'flex' : 'none';
}

export function showToast(message, colorClass) {
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        document.body.insertAdjacentHTML('beforeend', `<div id="toast-container" class="fixed bottom-4 right-4 z-[100] w-full max-w-xs"></div>`);
        toastContainer = document.getElementById('toast-container');
    }
    const toast = document.createElement('div');
    toast.className = `p-4 text-white rounded-lg shadow-xl text-center transition-all duration-300 transform translate-x-full opacity-0 ${colorClass}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full', 'opacity-0');
    }, 10);

    // Animate out
    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function renderThemeToggle() {
    return `
        <button id="theme-toggle-btn" class="p-2 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
            <svg class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            <svg class="w-6 h-6 dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
        </button>
    `;
}

function handleThemeToggle() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
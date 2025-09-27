import { auth } from './firebase.js';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { localDataService } from './service.js';
import { renderLoginPage, renderAppShell, renderStudentUI, renderAdminUI, renderChapterList, renderChapterDetail, showQuizDialog, renderStudentDetailModal, showLoading, showToast, setInputError, clearInputError } from './ui.js';
import { chapters } from './data.js';

// --- App State ---
let state = {
    appId: typeof __app_id !== 'undefined' ? __app_id : 'default-app-id',
    adminSchoolId: 'admin-school-123',
    userId: null,
    userRole: 'student',
    isAuthReady: false,
    admin: {
        students: [],
        sort: { column: 'score', direction: 'desc' },
        filter: '',
    }
};

// --- App Initialization ---
onAuthStateChanged(auth, (user) => {
    localDataService.initialize();
    if (user) {
        state.isAuthReady = true;
        state.userId = user.uid;
        localDataService.setUserId(user.uid);
        state.userRole = localStorage.getItem('userRole') || 'student';
        renderApp();
    } else {
        state.isAuthReady = false;
        state.userId = null;
        localDataService.setUserId(null);
        // This call is now updated to pass the new handleSignUp function
        renderLoginPage(handleLogin, handleSignUp, handleClearData, handleInputFocus);
    }
});

// --- PWA Installation Logic ---
let deferredInstallPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBtn = document.getElementById('install-pwa-btn');
    if (installBtn) {
        installBtn.classList.remove('hidden');
    }
});

//New
async function handleSignUp(role) {
    const idInputId = `${role}-id-input`;
    const passwordInputId = `${role}-password-input`;
    const confirmPasswordInputId = `${role}-confirm-password-input`;

    const userId = document.getElementById(idInputId).value.trim();
    const password = document.getElementById(passwordInputId).value.trim();
    const confirmPassword = document.getElementById(confirmPasswordInputId).value.trim();
    let isValid = true;

    // Clear previous errors
    clearInputError(idInputId);
    clearInputError(passwordInputId);
    clearInputError(confirmPasswordInputId);

    if (!userId) {
        setInputError(idInputId, 'User ID is required.');
        isValid = false;
    }
    if (password.length < 6) {
        setInputError(passwordInputId, 'Password must be at least 6 characters.');
        isValid = false;
    }
    if (password !== confirmPassword) {
        setInputError(confirmPasswordInputId, 'Passwords do not match.');
        isValid = false;
    }

    if (!isValid) return;

    const email = `${userId}@email.com`;
    console.log("Attempting to sign up with email:", email);

    try {
        showLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        showToast('Account created successfully! Please sign in.', 'bg-green-500');
        
        // After successful signup, refresh the login page to the sign-in view
        renderLoginPage(handleLogin, handleSignUp, handleClearData, handleInputFocus);

    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            setInputError(idInputId, 'This User ID is already taken.');
        } else {
            setInputError(idInputId, 'An error occurred. Please try again.');
        }
        console.error("Sign up failed:", error);
    } finally {
        showLoading(false);
    }
}

document.addEventListener('click', async (e) => {
    if (e.target && e.target.id === 'install-pwa-btn') {
        if (!deferredInstallPrompt) return;
        deferredInstallPrompt.prompt();
        const { outcome } = await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        const installBtn = document.getElementById('install-pwa-btn');
        if (installBtn) {
            installBtn.classList.add('hidden');
        }
    }
});

window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    const installBtn = document.getElementById('install-pwa-btn');
    if (installBtn) {
        installBtn.classList.add('hidden');
    }
});

// --- Event Handlers & Logic ---
async function handleLogin(role) {
    const idInputId = `${role}-id-input`;
    const passwordInputId = `${role}-password-input`;

    const userId = document.getElementById(idInputId).value.trim();
    const password = document.getElementById(passwordInputId).value.trim();
    let isValid = true;

    // Clear previous errors
    clearInputError(idInputId);
    clearInputError(passwordInputId);

    if (!userId) {
        setInputError(idInputId, 'User ID is required.');
        isValid = false;
    }
    if (!password) {
        setInputError(passwordInputId, 'Password is required.');
        isValid = false;
    }

    if (!isValid) return;

    // Transform userId to email format
    const email = `${userId}@email.com`;

    console.log("Attempting to log in with email:", email);

    try {
        showLoading(true);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        state.isAuthReady = true;
        state.userId = user.uid;
        state.userRole = role;
        localStorage.setItem('userRole', role); // Store role
        localDataService.setUserId(user.uid);

        renderApp();

    } catch (error) {
        setInputError(idInputId, 'Invalid credentials. Please try again.');
        console.error("Login failed:", error);
    } finally {
        showLoading(false);
    }
}

function handleLogout() {
    signOut(auth).then(() => {
        localStorage.removeItem('userRole'); // Clear role on logout
        // The onAuthStateChanged listener will handle the rest.
    });
}

function handleClearData() {
    if (confirm('Are you sure you want to reset all saved progress for the current user? This cannot be undone.')) {
        localDataService.clearData(); // This will now clear data for the current user
        showToast('Your saved data has been reset.', 'bg-blue-500');
        renderApp(); // Re-render the dashboard
    }
}

function renderApp() {
    if (!state.isAuthReady) return;
    renderAppShell();
    
    if (state.userRole === 'admin') {
        renderAdminDashboard();
    } else {
        renderStudentDashboard();
    }
}

function handleInputFocus(inputElement, isFocused) {
    // Placeholder for future animations
}

async function renderStudentDashboard() {
    showLoading(true);
    await localDataService.ensureUserProfile(state.appId, state.adminSchoolId);

    localDataService.listenToUserData(state.appId, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            renderStudentUI(state.userId, data, {
                onLogout: handleLogout,
                onStartLearning: () => renderChapterList(data, chapterEventHandlers),
                onTakeQuiz: (quizType) => showQuizDialog(quizType, (score) => handleQuizCompletion(quizType, score))
            });
        }
        showLoading(false);
    });
}

const chapterEventHandlers = {
    onBackToDashboard: renderStudentDashboard,
    onSelectChapter: (index) => renderChapterDetail(index, null, chapterDetailEventHandlers),
};

const chapterDetailEventHandlers = {
    onBackToChapters: renderApp,
    onTakeQuiz: (quizType) => showQuizDialog(quizType, (score) => handleQuizCompletion(quizType, score)),
};

function updateAdminView() {
    const students = state.admin.students;
    const totalScore = students.reduce((sum, s) => sum + (s.score || 0), 0);
    const averageScore = students.length > 0 ? Math.round(totalScore / students.length) : 0;
    
    const achievementCounts = {};
    students.forEach(student => {
        (student.achievements || []).forEach(ach => {
            achievementCounts[ach] = (achievementCounts[ach] || 0) + 1;
        });
    });
    const topAchievement = Object.keys(achievementCounts).length > 0 
        ? Object.entries(achievementCounts).sort((a, b) => b[1] - a[1])[0][0] 
        : 'None';

    const stats = { totalScore, averageScore, topAchievement };

    renderAdminUI(students, state.admin.sort, state.admin.filter, stats, adminEventHandlers);
}

const adminEventHandlers = {
    onLogout: handleLogout,
    onFilter: (value) => {
        state.admin.filter = value;
        updateAdminView();
    },
    onSort: (column) => {
        if (state.admin.sort.column === column) {
            state.admin.sort.direction = state.admin.sort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            state.admin.sort.column = column;
            state.admin.sort.direction = column === 'score' ? 'desc' : 'asc';
        }
        updateAdminView();
    },
    onSelectStudent: (studentId) => {
        const studentData = state.admin.students.find(s => s.id === studentId);
        if (studentData) {
            renderStudentDetailModal(studentId, studentData);
        }
    }
};

// In app.js

async function renderAdminDashboard() {
    showLoading(true);
    // Fetch all student data for the admin view
    state.admin.students = await localDataService.getAllStudents(); // Add 'await' here!
    updateAdminView();
    showLoading(false);
}

function handleQuizCompletion(quizType, score) {
    if (score > 0) {
        localDataService.updateUserScore(state.appId, score);
        checkAndAwardAchievements();
        showToast(`You earned ${score} points!`, 'bg-green-500');
        if (score >= 60) localDataService.markQuizAsCompleted(state.appId, quizType);
        if (score === 200) {
            localDataService.awardUserAchievement(state.appId, 'Perfect Score');
            showToast('Perfect Score! Achievement Unlocked!', 'bg-amber-500');
        }
    }
}

async function checkAndAwardAchievements() {
    const docSnap = await localDataService.getUserDoc(state.appId);
    const data = docSnap.data();
    const score = data.score || 0;
    const achievements = data.achievements || [];
    const level = Math.floor(score / 100) + 1;

    if (score >= 50 && !achievements.includes('Fire Safety Pro')) localDataService.awardUserAchievement(state.appId, 'Fire Safety Pro');
    if (score >= 100 && !achievements.includes('Earthquake Expert')) localDataService.awardUserAchievement(state.appId, 'Earthquake Expert');
    if (score >= 150 && !achievements.includes('All-Rounder')) localDataService.awardUserAchievement(state.appId, 'All-Rounder');
    if (score >= 300 && !achievements.includes('Safety Superstar')) localDataService.awardUserAchievement(state.appId, 'Safety Superstar');

    const completed = data.completedQuizzes || [];
    if (completed.length > 0 && !achievements.includes('Quiz Novice')) localDataService.awardUserAchievement(state.appId, 'Quiz Novice');
    if (completed.includes('fire') && !achievements.includes('Fire Quiz Master')) localDataService.awardUserAchievement(state.appId, 'Fire Quiz Master');
    if (completed.includes('earthquake') && !achievements.includes('Earthquake Quiz Master')) localDataService.awardUserAchievement(state.appId, 'Earthquake Quiz Master');
    if (completed.includes('tornado') && !achievements.includes('Tornado Quiz Master')) localDataService.awardUserAchievement(state.appId, 'Tornado Quiz Master');
    if (completed.includes('flood') && !achievements.includes('Flood Quiz Master')) localDataService.awardUserAchievement(state.appId, 'Flood Quiz Master');
    if (completed.includes('wildfire') && !achievements.includes('Wildfire Quiz Master')) localDataService.awardUserAchievement(state.appId, 'Wildfire Quiz Master');
    if (completed.includes('hurricane') && !achievements.includes('Hurricane Quiz Master')) localDataService.awardUserAchievement(state.appId, 'Hurricane Quiz Master');
    if (completed.includes('active-shooter') && !achievements.includes('Response Protocol Master')) localDataService.awardUserAchievement(state.appId, 'Response Protocol Master');

    if (level >= 5 && !achievements.includes('Level 5 Reached')) localDataService.awardUserAchievement(state.appId, 'Level 5 Reached');
    if (level >= 10 && !achievements.includes('Level 10 Pro')) localDataService.awardUserAchievement(state.appId, 'Level 10 Pro');
    if (completed.length >= 3 && !achievements.includes('Triple Threat')) localDataService.awardUserAchievement(state.appId, 'Triple Threat');
    if (completed.length >= 5 && !achievements.includes('Penta-Perfect')) localDataService.awardUserAchievement(state.appId, 'Penta-Perfect');
    
    const allQuizTypes = chapters.filter(c => c.gameType !== 'none').map(c => c.gameType);
    if (allQuizTypes.every(q => completed.includes(q)) && !achievements.includes('Safety Savant')) localDataService.awardUserAchievement(state.appId, 'Safety Savant');
}

document.addEventListener('DOMContentLoaded', () => {
    const initParticles = (isDarkMode) => {
        const lightTheme = {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#3b82f6" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#3b82f6", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "repulse" } }
            }
        };

        const darkTheme = {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "repulse" } }
            }
        };

        const config = isDarkMode ? darkTheme : lightTheme;
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
        }
        particlesJS('particles-js', config);
    };

    let isDark = document.documentElement.classList.contains('dark');
    initParticles(isDark);
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const newIsDark = document.documentElement.classList.contains('dark');
                if (newIsDark !== isDark) {
                    isDark = newIsDark;
                    initParticles(isDark);
                }
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });
});

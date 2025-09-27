import { localDB as defaultDB } from './data.js';

// This will be our live, in-memory database, loaded from localStorage.
let localDB = {};

// Helper to save the current state of localDB to localStorage for the current user
function save(userId) {
    if (!userId) return;
    try {
        const allUsersData = JSON.parse(localStorage.getItem('disasterAppDB') || '{}');
        allUsersData[userId] = localDB;
        localStorage.setItem('disasterAppDB', JSON.stringify(allUsersData));
    } catch (e) {
        console.error("Failed to save to localStorage", e);
    }
}

const localDataService = {
    _userId: null,

    initialize: () => {
        // This function doesn't need to do anything on initial load anymore.
        // Data is loaded when a user logs in.
    },

    getAllStudents: () => {
        try {
            const allUsersData = JSON.parse(localStorage.getItem('disasterAppDB') || '{}');
            // We need to format it as an array of objects with IDs
            return Object.entries(allUsersData).map(([id, data]) => ({ id, ...data }));
        } catch (e) {
            console.error("Failed to get all students from localStorage", e);
            return [];
        }
    },

    loadUserData: (userId) => {
        const allUsersData = JSON.parse(localStorage.getItem('disasterAppDB') || '{}');
        if (allUsersData[userId]) {
            localDB = allUsersData[userId];
        } else {
            // If no data for this user, start with a fresh copy from the template
            localDB = JSON.parse(JSON.stringify(defaultDB)); 
        }
    },

    clearData: () => {
        if (!localDataService._userId) return;
        const allUsersData = JSON.parse(localStorage.getItem('disasterAppDB') || '{}');
        delete allUsersData[localDataService._userId];
        localStorage.setItem('disasterAppDB', JSON.stringify(allUsersData));
        // Reload the default data into memory for the session
        localDB = JSON.parse(JSON.stringify(defaultDB));
    },

    setUserId: (userId) => {
        localDataService._userId = userId;
        if (userId) {
            localDataService.loadUserData(userId);
        }
    },

    async ensureUserProfile(appId, schoolId) {
        // This check is now implicit. If a user has data, they have a profile.
        // If not, the default data is loaded, which acts as a new profile.
    },

    listenToUserData: (appId, callback) => {
        // localDB is now the user's data object.
        callback({ exists: () => !!localDB, data: () => localDB });
    },

    // Admin view of all students is no longer possible with this architecture
    listenToSchoolStudents: (appId, schoolId, callback) => {
        callback({ forEach: (cb) => {} }); // Return empty array
    },

    async getUserDoc(appId) {
        return { data: () => localDB };
    },

    async updateUserScore(appId, points) {
        if (localDB) {
            localDB.score = (localDB.score || 0) + points;
            save(localDataService._userId);
        }
    },

    async awardUserAchievement(appId, achievementId) {
        if (localDB) {
            if (!localDB.achievements) {
                localDB.achievements = [];
            }
            if (!localDB.achievements.includes(achievementId)) {
                localDB.achievements.push(achievementId);
                save(localDataService._userId);
            }
        }
    },

    async markQuizAsCompleted(appId, quizType) {
        if (localDB) {
            if (!localDB.completedQuizzes) {
                localDB.completedQuizzes = [];
            }
            if (!localDB.completedQuizzes.includes(quizType)) {
                localDB.completedQuizzes.push(quizType);
                save(localDataService._userId);
            }
        }
    }
};

export { localDataService };

import { db } from './firebase.js';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { localDB as defaultDB } from './data.js';

const localDataService = {
    _userId: null,
    _unsubscribe: null, // To stop listening for real-time updates on logout

    setUserId: (userId) => {
        localDataService._userId = userId;
        // If a real-time listener is active, stop it.
        if (localDataService._unsubscribe) {
            localDataService._unsubscribe();
        }
    },

    // REAL-TIME LISTENER for the logged-in student's data
    listenToUserData: (appId, callback) => {
        if (!localDataService._userId) return;
        
        const userDocRef = doc(db, "users", localDataService._userId);

        // onSnapshot creates a live connection to the database
        localDataService._unsubscribe = onSnapshot(userDocRef, (docSnap) => {
            if (docSnap.exists()) {
                callback(docSnap); // Pass the live data to the UI
            } else {
                // If the user has logged in for the first time, their document won't exist.
                // We create it here using the default template from data.js.
                setDoc(userDocRef, defaultDB).then(() => {
                    console.log("New user profile created in Firestore.");
                });
            }
        });
    },
    
    // FETCH ALL STUDENTS for the admin dashboard
    getAllStudents: async () => {
        const usersCollectionRef = collection(db, "users");
        try {
            const querySnapshot = await getDocs(usersCollectionRef);
            const students = [];
            querySnapshot.forEach((doc) => {
                // You can add logic here to exclude admins if needed
                students.push({ id: doc.id, ...doc.data() });
            });
            return students;
        } catch (e) {
            console.error("Failed to get all students from Firestore", e);
            return [];
        }
    },

    // UPDATE SCORE in Firestore
    updateUserScore: async (appId, points) => {
        if (!localDataService._userId) return;
        const userDocRef = doc(db, "users", localDataService._userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const currentScore = docSnap.data().score || 0;
            await updateDoc(userDocRef, {
                score: currentScore + points
            });
        }
    },

    // AWARD ACHIEVEMENT in Firestore
    awardUserAchievement: async (appId, achievementId) => {
        if (!localDataService._userId) return;
        const userDocRef = doc(db, "users", localDataService._userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const achievements = docSnap.data().achievements || [];
            if (!achievements.includes(achievementId)) {
                achievements.push(achievementId);
                await updateDoc(userDocRef, { achievements });
            }
        }
    },

    // MARK QUIZ AS COMPLETED in Firestore
    markQuizAsCompleted: async (appId, quizType) => {
        if (!localDataService._userId) return;
        const userDocRef = doc(db, "users", localDataService._userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const completedQuizzes = docSnap.data().completedQuizzes || [];
            if (!completedQuizzes.includes(quizType)) {
                completedQuizzes.push(quizType);
                await updateDoc(userDocRef, { completedQuizzes });
            }
        }
    },
    
    // These functions are kept to prevent errors but are no longer needed
    initialize: () => {},
    clearData: () => { console.warn("clearData is not recommended in Firestore mode."); },
    ensureUserProfile: async () => {}, // This is now handled automatically by listenToUserData
    getUserDoc: async (appId) => {
        if (!localDataService._userId) return { data: () => ({...defaultDB}) };
        const userDocRef = doc(db, "users", localDataService._userId);
        return await getDoc(userDocRef);
    }
};

export { localDataService };

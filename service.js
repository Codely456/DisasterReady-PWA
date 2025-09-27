// REPLACE THE ENTIRETY OF service.js WITH THIS CODE:

import { db } from './firebase.js';
import { doc, getDoc, setDoc, updateDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { localDB as defaultDB } from './data.js';

const localDataService = {
    _userId: null,

    setUserId: (userId) => {
        localDataService._userId = userId;
    },

    // Ensures a student profile exists in Firestore, creating one if it doesn't.
    ensureUserProfile: async () => {
        if (!localDataService._userId) return;
        const userDocRef = doc(db, "students", localDataService._userId);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
            // Create a new profile using the default template from data.js
            await setDoc(userDocRef, defaultDB);
        }
    },

    // Listens for real-time updates to a single student's data
    listenToUserData: (appId, callback) => {
        if (!localDataService._userId) return;
        const userDocRef = doc(db, "students", localDataService._userId);
        return onSnapshot(userDocRef, callback);
    },

    // Listens for real-time updates on ALL students for the admin view
    listenToSchoolStudents: (callback) => {
        const studentsCollectionRef = collection(db, "students");
        return onSnapshot(studentsCollectionRef, callback);
    },
    
    // Gets a single snapshot of the user's document
    getUserDoc: async () => {
        if (!localDataService._userId) return null;
        const userDocRef = doc(db, "students", localDataService._userId);
        return await getDoc(userDocRef);
    },

    // Updates the student's score in Firestore
    updateUserScore: async (appId, points) => {
        if (!localDataService._userId) return;
        const userDocRef = doc(db, "students", localDataService._userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const currentScore = docSnap.data().score || 0;
            await updateDoc(userDocRef, {
                score: currentScore + points
            });
        }
    },

    // Adds a new achievement to the student's record in Firestore
    awardUserAchievement: async (appId, achievementId) => {
        if (!localDataService._userId) return;
        const userDocRef = doc(db, "students", localDataService._userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const achievements = docSnap.data().achievements || [];
            if (!achievements.includes(achievementId)) {
                await updateDoc(userDocRef, {
                    achievements: [...achievements, achievementId]
                });
            }
        }
    },

    // Marks a quiz as completed for the student in Firestore
    markQuizAsCompleted: async (appId, quizType) => {
        if (!localDataService._userId) return;
        const userDocRef = doc(db, "students", localDataService._userId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const completedQuizzes = docSnap.data().completedQuizzes || [];
            if (!completedQuizzes.includes(quizType)) {
                await updateDoc(userDocRef, {
                    completedQuizzes: [...completedQuizzes, quizType]
                });
            }
        }
    }
};

export { localDataService };

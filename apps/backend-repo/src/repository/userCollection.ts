import { db } from "../config/firebaseConfig";
import User from "../entities/user";

const USERS_COLLECTION = "users";

export const getUserData = async (uid: string): Promise<User | null> => {
  const doc = await db.collection(USERS_COLLECTION).doc(uid).get();
  return doc.exists ? (doc.data() as User) : null;
};

export const getPaginatedUserDocs = async (page: number, limit: number) => {
  const snapshot = await db.collection("users").get();

  const scoredUsers = snapshot.docs.map(doc => {
    const data = doc.data();
    const score =
      (data.totalAverageWeightRatings ?? 0) * 1000000 +
      (data.numberOfRents ?? 0) * 1000 +
      (data.recentlyActive ?? 0);

    return {
      id: doc.id,
      ...data,
      score
    };
  });

  const sorted = scoredUsers.sort((a, b) => b.score - a.score);
  const paginated = sorted.slice((page - 1) * limit, page * limit);

  return {
    users: paginated,
    totalUsers: sorted.length,
    currentPage: page
  };
};


export const updateUserData = async (uid: string, userData: Partial<User>): Promise<void> => {
  await db.collection(USERS_COLLECTION).doc(uid).update(userData);
};

export const createUserData = async (uid: string, userData: Partial<User>): Promise<void> => {
  await db.collection(USERS_COLLECTION).doc(uid).set(userData);
};
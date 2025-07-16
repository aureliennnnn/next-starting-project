import { initializeApp } from "firebase/app"
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  query,
} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export class FirebaseAdapter {
  async auth(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  }

  async register(email: string, password: string, name: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName: name })
    return userCredential.user
  }

  async logout() {
    await signOut(auth)
  }

  async getItems() {
    const q = query(collection(db, "items"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async createItem(item: any) {
    const docRef = await addDoc(collection(db, "items"), {
      ...item,
      createdAt: new Date(),
    })
    return { id: docRef.id, ...item }
  }

  async updateItem(id: string, updates: any) {
    const docRef = doc(db, "items", id)
    await updateDoc(docRef, updates)
    return { id, ...updates }
  }

  async deleteItem(id: string) {
    await deleteDoc(doc(db, "items", id))
  }

  async uploadFile(file: File, path = "uploads") {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    return { url: downloadURL, path: snapshot.ref.fullPath }
  }
}

export const firebaseAdapter = new FirebaseAdapter()

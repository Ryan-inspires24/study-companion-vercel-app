import { db } from '../firebase.js';
import bcrypt from 'bcrypt';
import { collection, where, addDoc, query, getDocs } from 'firebase/firestore';

export async function register(req, res) {
    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

        const { username, email, password, phoneNumber } = body;
        if (!username || !email || !password || !phoneNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const usernameQuery = query(collection(db, 'users'), where('username', '==', username));
        const emailQuery = query(collection(db, 'users'), where('email', '==', email));

        const userSnapshot = await getDocs(usernameQuery);
        const emailSnapshot = await getDocs(emailQuery);

        if (!userSnapshot.empty) {
            return res.status(401).json({ error: 'Sorry, Username already exists.' });
        }

        if (!emailSnapshot.empty) {
            return res.status(401).json({ error: 'Sorry, Email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            email,
            phoneNumber,
            password: hashedPassword,
            status: 'active',
            createdAt: new Date()
        };

        const docRef = await addDoc(collection(db, 'users'), newUser);

        res.status(201).json({
            message: 'User created',
            data: { ...newUser, password: undefined },
            docId: docRef.id
        });

        console.log('User registered:', newUser);
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: error.message})
    }
}

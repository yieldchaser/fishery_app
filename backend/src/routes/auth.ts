import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '../db';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

const signupSchema = z.object({
    phone: z.string().min(10),
    password: z.string().min(6),
    name: z.string().min(2),
    farmerCategory: z.enum(['GENERAL', 'WOMEN', 'SC', 'ST']).default('GENERAL'),
    stateCode: z.string().min(2).default(''),
});

const loginSchema = z.object({
    phone: z.string().min(10),
    password: z.string().min(6),
});

// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const data = signupSchema.parse(req.body);

        // Check existing
        const existing = await query('SELECT id FROM users WHERE phone_number = $1', [data.phone]);
        if (existing.rowCount && existing.rowCount > 0) {
            return res.status(400).json({ success: false, error: 'Phone number already registered' });
        }

        const hashed = await bcrypt.hash(data.password, 10);

        const result = await query(`
      INSERT INTO users (phone_number, password_hash, name, farmer_category, state_code)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, phone_number, name, farmer_category, state_code
    `, [data.phone, hashed, data.name, data.farmerCategory, data.stateCode]);

        const user = result.rows[0];
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });

        res.json({ success: true, token, user });
    } catch (error: any) {
        if (error.errors) return res.status(400).json({ success: false, error: 'Validation Error', details: error.errors });
        console.error('Signup error', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const data = loginSchema.parse(req.body);

        const result = await query('SELECT id, phone_number, password_hash, name, farmer_category as "farmerCategory", state_code as "stateCode" FROM users WHERE phone_number = $1', [data.phone]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ success: false, error: 'Invalid phone or password' });
        }

        const valid = await bcrypt.compare(data.password, user.password_hash);
        if (!valid) {
            return res.status(401).json({ success: false, error: 'Invalid phone or password' });
        }

        delete user.password_hash;
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });

        res.json({ success: true, token, user });
    } catch (error: any) {
        if (error.errors) return res.status(400).json({ success: false, error: 'Validation Error', details: error.errors });
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

export { router as authRouter };

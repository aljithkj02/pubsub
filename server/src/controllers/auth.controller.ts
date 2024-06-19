import { Request, Response } from "express";
import { validateSignupPayload } from "@lib/validators/auth.validator";
import { handleValidationError } from "@lib/exceptions";
import prisma from "@lib/db";
import bcrypt from 'bcryptjs'
import { generateToken } from "@lib/utils/jwt.util";

export const signupUser = async (req: Request, res: Response) => {
    try {
        const validateResult = validateSignupPayload(req.body);

        if (!validateResult.success) {
            return handleValidationError(res, validateResult.error);
        }

        const {name, email, password } = validateResult.data;

        const isUserExist = await prisma.user.findUnique({ where: { email }});

        if (isUserExist) {
            return res.json({
                status: false,
                message: 'A user is already exist with this email!'
            })
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const token = generateToken({ id: user.id, name: user.name });

        return res.json({
            status: true,
            message: 'Signup Succeed!',
            token
        })
    } catch (error) {
        res.json({
            status: false,
            message: (error as Error).message
        })
    }
}
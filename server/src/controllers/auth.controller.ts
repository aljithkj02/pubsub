import { Request, Response } from "express";
import { validateSignupPayload } from "@lib/validators/auth.validator";
import { handleValidationError } from "@lib/exceptions";

export const signupUser = async (req: Request, res: Response) => {
    try {
        const validateResult = validateSignupPayload(req.body);

        if (!validateResult.success) {
            return handleValidationError(res, validateResult.error);
        }
    } catch (error) {
        res.json({
            status: false,
            message: (error as Error).message
        })
    }
}
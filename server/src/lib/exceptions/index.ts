import { Response } from "express";
import { ZodError } from "zod";

export const handleValidationError = (res: Response, errors: ZodError) => {
    return res.send({
        status: false,
        message: errors.errors[0].message
    })
}
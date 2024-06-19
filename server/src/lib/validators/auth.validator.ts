import z from "zod";

const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export type SignupPayload = z.infer<typeof signupSchema>;
export type LoginPayoload = z.infer<typeof loginSchema>;

export const validateSignupPayload = (payload: any) => {
    return signupSchema.safeParse(payload);
}

export const validateLoginPayload = (payload: any) => {
    return loginSchema.safeParse(payload);
}
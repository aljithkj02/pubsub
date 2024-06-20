import z from "zod";

const createRoomSchema = z.object({
    name: z.string()
})


export type CreateRoomPayload = z.infer<typeof createRoomSchema>;

export const validateCreateRoomPayload = (payload: any) => {
    return createRoomSchema.safeParse(payload);
}
import { Request, Response, NextFunction } from "express";

export function validateInput(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { input_text } = req.body;

    if (!input_text || typeof input_text !== "string") {
        return res.status(400).json({
            routing: { status: "invalid_input" },
            system_message: "input_text must be a non-empty string"
        });
    }

    if (input_text.length > 20_000) {
        return res.status(400).json({
            routing: { status: "invalid_input" },
            system_message: "input_text too long"
        });
    }

    next();
}

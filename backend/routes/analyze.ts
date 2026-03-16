import { Router } from "express";
import { callOpenClaw } from "../services/openclaw.js";
import { validateInput } from "../middleware/validateInput.js";

const router = Router();

router.post("/", validateInput, async (req, res) => {
    try {
        const { input_text, input_type } = req.body;

        const result = await callOpenClaw({
            input_text,
            input_type: input_type ?? "unknown"
        });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            routing: { status: "error" },
            system_message: "Internal analysis error"
        });
    }
});

export default router;

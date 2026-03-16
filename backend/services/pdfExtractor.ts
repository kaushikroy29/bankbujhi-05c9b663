
import fs from "fs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export async function extractTextFromPDF(path: string): Promise<string> {
    const dataBuffer = fs.readFileSync(path);

    // Basic options to ensure we get text
    const options = {
        pagerender: function (pageData: any) {
            return pageData.getTextContent()
                .then(function (textContent: any) {
                    let lastY, text = '';
                    for (let item of textContent.items) {
                        if (lastY == item.transform[5] || !lastY) {
                            text += item.str;
                        }
                        else {
                            text += '\n' + item.str;
                        }
                        lastY = item.transform[5];
                    }
                    return text;
                });
        }
    };

    try {
        const data = await pdf(dataBuffer); // pdf-parse default is usually good enough, custom pagerender is optional
        return data.text;
    } catch (error) {
        console.error("Error parsing PDF:", error);
        throw new Error("Failed to parse PDF document.");
    }
}

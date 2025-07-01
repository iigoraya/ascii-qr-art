const readline = require("readline");
const fs = require("fs");

function hashStringToMatrix(text: string, size: number): boolean[][] {
    const matrix: boolean[][] = [];
    let hash = 0;

    for (let i = 0; i < text.length; i++) {
        hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let y = 0; y < size; y++) {
        matrix[y] = [];
        for (let x = 0; x < size; x++) {
            const val = Math.sin(x * hash + y * 17) * 10000;
            matrix[y][x] = (val % 2) > 1;
        }
    }

    return matrix;
}

function renderMatrix(matrix: boolean[][]): string {
    return matrix
        .map(row => row.map(cell => (cell ? "█" : " ")).join(""))
        .join("\n");
}

function saveToFile(filename: string, content: string) {
    fs.writeFileSync(filename, content);
    console.log(`Saved to ${filename}`);
}

function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter text to convert to ASCII QR art: ", (answer: string) => {
        const size = 25;
        const matrix = hashStringToMatrix(answer, size);
        const art = renderMatrix(matrix);
        console.log("\nHere is your ASCII QR Art:\n");
        console.log(art);
        rl.question("\nSave to file? (y/n): ", (saveAns: string) => {
            if (saveAns.toLowerCase() === "y") {
                saveToFile("ascii-qr-art.txt", art);
            }
            rl.close();
        });
    });
}

main();

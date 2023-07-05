/**
 * @param value 4
 * @returns number[]
 */
export const generateMines = (value?: number): number[] => {
    const mines = value ?? 5
    let numbers: Set<number> = new Set()
    while (numbers.size < mines) {
        let rand = Math.floor(Math.random() * 25)
        numbers.add(rand)
    }
    return Array.from(numbers)
}
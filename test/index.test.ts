import { InputReader } from "../src/InputReader";
import { OutputWriter } from "../src/OutputWriter";
import { Runner } from "../src/Runner";

describe('main program test',()=>{
    const fixtures:[string, string[]][] = [
        ['1.txt', ['(4, 4, E)', '(0, 4, W) LOST']],
        ['2.txt', ['(2, 3, W)', '(1, 0, S) LOST']],
    ]
    const baseFixturePath = 'test/__fixtures__/';
    it.each(fixtures)('should return correct result for fixture %s', (fileName, expected)=>{
        // Arrange
        const inputReader = new InputReader(`${baseFixturePath}${fileName}`);
        const outputWriter = new OutputWriter();

        const mockConsoleLog = jest.spyOn(console,'log');
        const runner = new Runner(inputReader, outputWriter);

        // Act
        runner.start();

        // Assert
        expect(mockConsoleLog).toHaveBeenCalledTimes(2);
        expect(mockConsoleLog).toHaveBeenNthCalledWith(1,expected[0]);
        expect(mockConsoleLog).toHaveBeenNthCalledWith(2,expected[1]);
    }); 
});
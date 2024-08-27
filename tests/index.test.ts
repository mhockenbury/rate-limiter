import { helloworld } from "../src";

describe('sample test', () => {
    test('calls console.log', () => {
        const logSpy = jest.spyOn(global.console, 'log');
        const testMessage = 'Hi'
        
        helloworld(testMessage);
        
        expect(logSpy).toHaveBeenCalledWith(`A message to you: ${testMessage}`);
        
        logSpy.mockRestore();
    });
});
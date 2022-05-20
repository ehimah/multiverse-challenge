import * as fs from 'fs';
import { InputReader } from './InputReader';
import { OutputWriter } from './OutputWriter';
import { Runner } from './Runner';

const inputReader = new InputReader('input.txt');
const outputWriter = new OutputWriter();
const runner = new Runner(inputReader, outputWriter);
runner.start();


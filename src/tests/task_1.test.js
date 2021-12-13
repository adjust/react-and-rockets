import { prepareData } from '../solutions/task_1';
import data from './__fixtures__/data.json';

/* 
  PLEASE DO NOT MODIFY THIS FILE
*/

describe(`# prepareData`, () => {
  test.each`
    year    | customerName
    ${2008} | ${'SpaceX'}
    ${2010} | ${'SpaceX'}
    ${2018} | ${'NASA'}
    ${2019} | ${'Iridium'}
    ${2018} | ${'CRS'}
    ${2018} | ${'S'}
    ${2018} | ${'t'}
    ${2016} | ${'t'}
  `(
    `consolidates the data correctly for year $year and customer $customerName`,
    ({ year, customerName }) => {
      expect(prepareData({ year, customerName })(data)).toMatchSnapshot();
    }
  );
});

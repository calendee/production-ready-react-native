import { changeCurrencyAmount, getInitialConversion } from '../currencies';

describe('getInitialConversion', () => {
  it('creates a properly formatted action', () => {
    // const expected = { type: 'GET_INITIAL_CONVERSION' };
    // const actual = getInitialConversion();
    // expect(actual).toEqual(expected);
    expect(getInitialConversion()).toMatchSnapshot();
  });
});

describe('changeCurrencyAmount', () => {
  it('creates an action with an amount of 100', () => {
    // const expected = {
    //   type: 'CHANGE_CURRENCY_AMOUNT',
    //   amount: 100,
    // };

    // const actual = changeCurrencyAmount(100);
    // expect(actual).toEqual(expected);
    expect(changeCurrencyAmount(100)).toMatchSnapshot();
  });

  it('converts a string value to a float', () => {
    // const expected = {
    //   type: 'CHANGE_CURRENCY_AMOUNT',
    //   amount: 100,
    // };

    // const actual = changeCurrencyAmount('100');
    // expect(actual).toEqual(expected);
    expect(changeCurrencyAmount('100')).toMatchSnapshot();
  });
});

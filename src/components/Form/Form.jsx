import React, { useEffect } from 'react';
import generateRandomNumber from '../../utils/generateRandomNumber';
import InputField from '../InputField';
import Table from '../Table';

const DEFAULT_CURRENCY = 'eur';
const DEFAULT_FX_RATE = {
  eur: 1.1,
  usd: 0.91
};

const Form = () => {
  const [fxRate, setFxRate] = React.useState(DEFAULT_FX_RATE[DEFAULT_CURRENCY]);
  const [amount, setAmount] = React.useState(0);
  const [selectedCurrency, setSelectedCurrency] =
    React.useState(DEFAULT_CURRENCY);
  const [isOverride, setIsOverride] = React.useState(false);
  const [overrideValue, setOverrideValue] = React.useState(
    DEFAULT_FX_RATE[DEFAULT_CURRENCY]
  );
  const [entries, setEntries] = React.useState(null);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setSelectedCurrency(newCurrency);
    setFxRate(DEFAULT_FX_RATE[newCurrency]);
  };

  const handleOverrideToggle = () => {
    setIsOverride(!isOverride);
  };

  const hnadleOverrideChange = (e) => {
    setOverrideValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) {
      alert('Please enter an amount');
      return;
    }
    const difference = Math.abs(fxRate - overrideValue);
    const twoPercentRealTimeValue = (fxRate * 2) / 100;
    const isDisableOverride = difference > twoPercentRealTimeValue;
    if (isDisableOverride) setIsOverride(isDisableOverride);
    const newIsOverride = isDisableOverride ? false : isOverride;
    const convertedAmount = newIsOverride
      ? amount * overrideValue
      : amount * fxRate;
    const newEntry = {
      fxRate,
      amount: `${amount} ${selectedCurrency === 'usd' ? 'EUR' : 'USD'}`,
      convertedAmount: `${convertedAmount.toFixed(
        2
      )} ${selectedCurrency.toUpperCase()}`,
      overrideValue: newIsOverride && overrideValue
    };
    setEntries((prev) => (prev ? [...prev, newEntry].slice(-5) : [newEntry]));
  };

  useEffect(() => {
    const intervalCall = setInterval(() => {
      const randomNumber = generateRandomNumber();
      setFxRate((DEFAULT_FX_RATE[selectedCurrency] + randomNumber).toFixed(2));
    }, 3000);

    return () => {
      clearInterval(intervalCall);
    };
  }, [selectedCurrency]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-12 bg-lime-50 rounded-lg shadow sm:max-w-xl sm:w-full sm:mx-auto sm:overflow-hidden"
    >
      <div className="px-4 py-4 sm:px-10">
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center"></div>
        </div>
        <div className="mt-6">
          <div className="w-full space-y-6">
            {/* FX Rate Field */}
            <InputField
              required
              disabled
              id="form--fx-rate"
              placeholder="FX rate"
              label="FX rate"
              value={fxRate}
            />
            {/* AMOUNT FIELD */}
            <InputField
              required
              id="form--amount"
              placeholder="Amount"
              label="Amount"
              value={amount}
              onChange={handleAmountChange}
            />
            {/* CURRENCY RADIO */}
            <div className="w-full">
              <div class="flex items-center gap-8">
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    name="currency"
                    value="eur"
                    checked={selectedCurrency === 'eur'}
                    onChange={handleCurrencyChange}
                    class="w-5 h-5 text-red-600"
                  />
                  <span class="ml-2 text-gray-700">EUR</span>
                </label>
                <label class="inline-flex items-center">
                  <input
                    type="radio"
                    name="currency"
                    value="usd"
                    checked={selectedCurrency === 'usd'}
                    onChange={handleCurrencyChange}
                    class="w-5 h-5 text-red-600"
                  />
                  <span class="ml-2 text-gray-700">USD</span>
                </label>
              </div>
            </div>
            {/* TOGGLE OVERRIDE */}
            <div class="mb-3">
              <div class="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  name="toggle"
                  checked={isOverride}
                  onChange={handleOverrideToggle}
                  id="form--override-checkbox"
                  class="checked:bg-blue-500 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label
                  for="form--override-checkbox"
                  class="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer"
                ></label>
              </div>
              <span class="font-medium text-gray-400">FX override</span>
            </div>
            {/* OVERRIDE FIELD */}
            <InputField
              disabled={!isOverride}
              required={isOverride}
              id="form--override-value"
              placeholder="FX override"
              value={overrideValue}
              onChange={hnadleOverrideChange}
            />
            {/* SUBMIT BUTTON */}
            <div>
              <span className="block w-full rounded-md shadow-sm">
                <button
                  type="submit"
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Convert
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {entries !== null && (
        <div className="px-4 py-6 border-t-2 border-gray-200 bg-gray-50 sm:px-10 flex justify-center">
          <Table entries={entries} />
        </div>
      )}
    </form>
  );
};

export default Form;

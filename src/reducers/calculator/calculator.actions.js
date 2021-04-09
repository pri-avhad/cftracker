import CalcActionTypes from './calculator.actions';

export const addEntry = entry => ({
  type: CalcActionTypes.LOG,
  payload: entry
});


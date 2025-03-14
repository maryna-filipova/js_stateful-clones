'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  // write code here
  let currentState = { ...state };
  const statesHistory = [];

  actions.forEach((action) => {
    if (action.type === 'clear') {
      currentState = {};
    } else if (action.type === 'addProperties' && action.extraData) {
      currentState = { ...currentState, ...action.extraData };
    } else if (
      action.type === 'removeProperties' &&
      Array.isArray(action.keysToRemove)
    ) {
      currentState = Object.fromEntries(
        Object.entries(currentState).filter(
          ([key]) => !action.keysToRemove.includes(key),
        ),
      );
    }
    statesHistory.push({ ...currentState });
  });

  return statesHistory;
}

module.exports = transformStateWithClones;

// fakeUserData.js

export const fakeUserData = [
  new Array(224).fill([false, false]),
  new Array(224).fill([false, false]),
  new Array(224).fill([false, false]),
  new Array(224).fill([false, false]),
];

const updateAvailability = (userIndex, timeBlockIndex, newAvailability) => {
    fakeUserData[userIndex][timeBlockIndex] = [newAvailability, fakeUserData[userIndex][timeBlockIndex][1]];
};

const updatePreferences = (userIndex, timeBlockIndex, newPreference) => {
    fakeUserData[userIndex][timeBlockIndex] = [fakeUserData[userIndex][timeBlockIndex][0], newPreference];
};

// Sunday
for (let i = 1; i < 224; i += 8) {
  // user 1
  if (i < 129) {
    updateAvailability(0, i, true);
  }
  if (i > 64 && i < 97) {
    updatePreferences(0, i, true);
  }

  // user 2
  if (i > 64 && i < 193) {
    updateAvailability(1, i, true);
  }
  if (i > 64 && i < 129) {
    updatePreferences(1, i, true);
  }

  // user 3
  if (i > 48 && i < 161) {
    updateAvailability(2, i, true);
  }
  if (i > 48 && i < 97) {
    updatePreferences(2, i, true);
  }

  // user 4
  if (i > 32 && i < 224) {
    updateAvailability(3, i, true);
  }
  if (i > 80 && i < 161) {
    updatePreferences(3, i, true);
  }
}

// Monday
for (let i = 2; i < 224; i += 8) {
  if (i > 129 && i < 193) {
    updateAvailability(0, i, true);
  }
  if (i > 97 && i < 162) {
    updateAvailability(2, i, true);
  }
}

// Tuesday
for (let i = 3; i < 224; i += 8) {
  // user 1
  if (i > 113 && i < 163) {
    updateAvailability(0, i, true);
  }
  if (i > 113 && i < 147) {
    updatePreferences(0, i, true);
  }

  // user 2
  if (i > 113 && i < 163) {
    updateAvailability(1, i, true);
  }

  // user 3
  if (i > 113 && i < 195) {
    updateAvailability(2, i, true);
  }
  if (i > 113 && i < 131) {
    updatePreferences(2, i, true);
  }

  // user 4
  if (i > 98 && i < 179) {
    updateAvailability(3, i, true);
  }
}

// Wednesday
for (let i = 4; i < 224; i += 8) {
  if (i > 131 && i < 195) {
    updateAvailability(1, i, true);
  }
  if (i > 99 && i < 180) {
    updateAvailability(2, i, true);
  }
}

// Thursday
for (let i = 5; i < 224; i += 8) {
  if (i > 132 && i < 196) {
    updateAvailability(0, i, true);
  }
  if (i > 164 && i < 224) {
    updateAvailability(1, i, true);
  }
  if (i > 100 && i < 213) {
    updateAvailability(2, i, true);
  }
  if (i < 52 || (i > 100 && i < 165)) {
    updateAvailability(3, i, true);
  }
}

// Friday
for (let i = 6; i < 224; i += 8) {
  if (i > 69 && i < 132) {
    updateAvailability(1, i, true);
  }
  if (i > 37 && i < 116) {
    updateAvailability(3, i, true);
  }
}

// Saturday
for (let i = 7; i < 224; i += 8) {

  // user 1
  if (i < 167) {
    updateAvailability(0, i, true);
  }

  // user 2
  if (i > 22 && i < 117) {
    updateAvailability(1, i, true);
  }
  if (i > 22 && i < 54) {
    updatePreferences(1, i, true);
  }

  // user 3
  if (i > 38 && i < 167) {
    updateAvailability(2, i, true);
  }

  // user 4
  if (i > 38 && i < 133) {
    updateAvailability(3, i, true);
  }
  if (i > 86 && i < 133) {
    updatePreferences(3, i, true);
  }
}

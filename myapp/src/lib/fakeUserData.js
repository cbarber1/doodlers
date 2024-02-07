// fakeUserData.js

export const fakeUserData = [
  new Array(224).fill(false),
  new Array(224).fill(false),
  new Array(224).fill(false),
  new Array(224).fill(false),
];

// Sunday
for (let i = 1; i < 224; i += 8) {
  if (i < 129) {
    fakeUserData[0][i] = true;
  }
  if (i > 64 && i < 193) {
    fakeUserData[1][i] = true;
  }
  if (i > 48 && i < 161) {
    fakeUserData[2][i] = true;
  }
  if (i > 32 && i < 224) {
    fakeUserData[3][i] = true;
  }
}

// Monday
for (let i = 2; i < 224; i += 8) {
  if (i > 129 && i < 193) {
    fakeUserData[0][i] = true;
  }
  if (i > 97 && i < 162) {
    fakeUserData[2][i] = true;
  }
}

// Tuesday
for (let i = 3; i < 224; i += 8) {
  if (i > 113 && i < 163) {
    fakeUserData[0][i] = true;
  }
  if (i > 113 && i < 163) {
    fakeUserData[1][i] = true;
  }
  if (i > 113 && i < 195) {
    fakeUserData[2][i] = true;
  }
  if (i > 98 && i < 179) {
    fakeUserData[3][i] = true;
  }
}

// Wednesday
for (let i = 4; i < 224; i += 8) {
  if (i > 131 && i < 195) {
    fakeUserData[1][i] = true;
  }
  if (i > 99 && i < 180) {
    fakeUserData[2][i] = true;
  }
}

// Thursday
for (let i = 5; i < 224; i += 8) {
  if (i > 132 && i < 196) {
    fakeUserData[0][i] = true;
  }
  if (i > 164 && i < 224) {
    fakeUserData[1][i] = true;
  }
  if (i > 100 && i < 213) {
    fakeUserData[2][i] = true;
  }
  if (i < 52 || (i > 100 && i < 165)) {
    fakeUserData[3][i] = true;
  }
}

// Friday
for (let i = 6; i < 224; i += 8) {
  if (i > 69 && i < 132) {
    fakeUserData[1][i] = true;
  }
  if (i > 37 && i < 116) {
    fakeUserData[3][i] = true;
  }
}

// Saturday
for (let i = 7; i < 224; i += 8) {
  if (i < 167) {
    fakeUserData[0][i] = true;
  }
    if (i > 22 && i < 117) {
      fakeUserData[1][i] = true;
    }
  if (i > 38 && i < 167) {
      fakeUserData[2][i] = true;
  }
  if (i > 38 && i < 133) {
    fakeUserData[3][i] = true;
  }
}

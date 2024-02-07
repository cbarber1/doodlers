// fakeUserData.js
export const fakeUserData = [
    new Array(224).fill(false), // Assuming 8 columns * 28 rows
    new Array(224).fill(false),
    new Array(224).fill(false),
    new Array(224).fill(false),
];
  
// Example of setting some availability
fakeUserData[0][2] = true;
fakeUserData[0][10] = true;
fakeUserData[0][18] = true;
fakeUserData[0][26] = true;
fakeUserData[1][10] = true;
fakeUserData[1][11] = true;
fakeUserData[2][10] = true;
fakeUserData[3][10] = true;
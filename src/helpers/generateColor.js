/**
 * function generates random color, to differentiate users posted messsages in the room on UI
 * @returns random color
 */

const generateColor = () => Math.floor(Math.random() * 16777215).toString(16);

module.exports = { generateColor };

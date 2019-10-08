const fs = require("fs");
const axios = require("axios");

// const test = `31 00 4b 46 ff ff 05 10 1c : crc=1c YES
// 31 00 4b 46 ff ff 05 10 1c t=24437`
const id = ''; //insert ID here
const filePath = `/sys/bus/w1/devices/${id}/w1_slave`;
let temp = 0;

const getTemperature = () => {
    const contents = fs.readFileSync(filePath, 'utf8');
    temp = contents.split("\n")[1].split("=")[1];
};

const setTemperature = async () => {
    try {
        await axios.post('/temperature', { temp });
        console.log("Succesfully posted temperature");
    }
    catch (error) {
        console.log("Failed to post temperature", error);
    }
}

setInterval(async () => {
    await getTemperature();
    setTemperature();
}, 60000);
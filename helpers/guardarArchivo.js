const fs = require('fs');

const file = './db/data.json';
const guardarData = (data) => {
  // convierto con JSON.stringify(data) a un string porque la data recive solo string
  fs.writeFileSync(file, JSON.stringify(data));
};

const leerData = () => {
  if (!fs.existsSync(file)) {
    return null;
  }

  const info = fs.readFileSync(file, 'utf-8');
  const data = JSON.parse(info);

  return data;
};

module.exports = {
  guardarData,
  leerData,
};

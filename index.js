const ds18b20 = require('ds18b20');

// Get  running sensors`s id
ds18b20.sensors(function(err, ids) {
 console.log(JSON.stringify(ids))
});

const TIME_FORMAT = new Intl.DateTimeFormat('pt-BR');

let temps = {
  max: -100,
  min: 100
};

//let currentDate = TIME_FORMAT.format(new Date());
let currentDate = 'DATAINICIAL';

const getTemp = () => {
  ds18b20.temperature('28-041722a1caff', function(err, value) {
    temps.max = value > temps.max ? value : temps.max;
    temps.min = value < temps.min ? value : temps.min;
    
    var date = TIME_FORMAT.format(new Date());

    console.log('Current date is ', date);
    console.log('Current temperature is ', value);
    console.log('Max temperature today is ', temps.max);
    console.log('Min temperature today is ', temps.min);

    if (date !== currentDate) {
      storeTemp(temps, currentDate);
      currentDate = date;
    }

  });
  setTimeout(getTemp, 10000)
}

const storeTemp = (temps, date) => {
  console.log(`Atualizando temperaturas para data ${date} - MAX: ${temps.max} MIN: ${temps.min}`)  
}

getTemp();
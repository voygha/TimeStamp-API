const indexCtrl = {};

indexCtrl.renderIndex = (req, res) => {
    const date = new Date();
    console.log(date);
    res.render('index', {date});
}

indexCtrl.apiDate = (req,res) =>{
    let dateInput = req.params.date;
  
    // Si no se proporciona una fecha, utiliza la fecha actual
    if (!dateInput) {
      dateInput = new Date();
    } else {
      // Intenta analizar la fecha proporcionada
      dateInput = new Date(dateInput);
    }
    
    // Verifica si la fecha es válida
    if (isNaN(dateInput.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
    
    // Construye el objeto de respuesta
    const responseObject = {
      unix: dateInput.getTime(),
      utc: dateInput.toUTCString()
    };
  
    // Envía el objeto de respuesta JSON
    res.json(responseObject);
}

module.exports = indexCtrl;
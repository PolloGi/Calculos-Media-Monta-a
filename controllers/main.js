const mainController = {
    index: (req, res) => {
		res.render('home');
	}
};

console.log("Controladores corriendo");

module.exports = mainController;

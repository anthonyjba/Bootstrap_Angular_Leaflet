/***************************************************/
/*Funciones                                        */
/***************************************************/

function formatoEuro(v) {
	if (v == undefined) return '0 €';
	else return formatoNumero(v) + ' €';
	
};

function formatoNumero(v) {
	if (v == undefined) return '0';
	else return (v.toLocaleString('es-ES'));
};

function formatoDecimal(v) {
	return v.replace('.', ',');
};

function parseMSDate(s) {
	// Jump forward past the /Date(, parseInt handles the rest
	return new Date(parseInt(s.substr(6)));
}
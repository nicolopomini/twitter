function rispondi(res, code, json) {
	res.statusCode = code;
  	res.setHeader("Content-Type", "application/json");
  	res.json(json);
}

function badRequest(res, message) {
	let r = {ok: false, error_code: 400, description: message};
	rispondi(res, 400, r);
}
function internalError(res, message) {
	let r = {ok: false, error_code: 500, description: message};
	rispondi(res, 500, r);
}

module.exports.badRequest = badRequest;
module.exports.internalError = internalError;
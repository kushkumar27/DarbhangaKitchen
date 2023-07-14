function OTPNotMatchedError(message = "Otp not matched") {
    this.name = "OTPNotMatchedError";
    this.message = message;
}
OTPNotMatchedError.prototype = Error.prototype;

module.exports = {
    OTPNotMatchedError
}
exports.validateRequired = (field) => {
    return (field && field != "");
}

exports.validateMinimum = (field, min) => {
    return (field >= min);
}

exports.validateMaximum = (field, max) => {
    return (field <= max);
}

exports.validateBetween = (field, min, max) => {
    return (field >= min && field <= max);
}

exports.validateMaxLength = (field, max) => {
    return (field.length <= max);
}

exports.validateMinLength = (field, min) => {
    return (field.length >= min);
}

exports.validateBetweenLength = (field, min, max) => {
    return (field.length >= min && field.length <= max);
}

exports.validateEmail = (field) => {
    return field.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
}
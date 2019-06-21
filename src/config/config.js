export const AnimationConstants = {
    defaultDuration: 300,
}

export const RxConstants = {
    debounceTime: 300
}

export const Regex = {
    emailRegex:  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    passwordRegex: /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/,   //at least 1 Number and 1 Char
    passwordCharacters: 3,
    phoneRegex: /^\d+$/,
    nameCharacters: 4,
    phoneNumberCharacters: 8,
}
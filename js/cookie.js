
//register we set
function setCookie(name, value, expDay =10) {
    let today = new Date();
    let expiry = new Date(today.getTime() + expDay * 24 * 3600 * 1000);
    let expires = "expires=" + expiry.toUTCString();

    // document.cookie = `${name}=${value};expires=${expiry.toUTCString()};path=/"`;
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// login we get
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


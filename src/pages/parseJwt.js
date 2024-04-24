function parseJwt(token) {
    if (typeof token !== 'string') {
        console.error('Token must be a string');
        return null; // または適切なエラー処理
    }
    var base64Url = token.split('.')[1];
    if (!base64Url) {
        console.error('Invalid token: missing payload');
        return null;
    }
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

export default parseJwt;

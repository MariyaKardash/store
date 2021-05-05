export const parseRequestURL = () => {
    const url = document.location.hash.toLocaleLowerCase();
    const request = url.split('/');
    return {
        resourse: request[1],
        id: request[2],
        action: request[3],
    };
};
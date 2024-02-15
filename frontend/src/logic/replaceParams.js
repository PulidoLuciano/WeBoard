export default function replaceParams(url, paramsObject){
    for(let params in paramsObject){
        url = url.replace(`:${params}`, paramsObject[params]);
    }
    return url;
}
import { API_BASE_URL } from '../config';
// eslint-disable-next-line import/no-anonymous-default-export
//eslint-disable-next-line no-restricted-globals
onmessage = (message) => {
     console.log("receive", message.data);
     const helloStr = `Hello, welcome ${message.data} ` + API_BASE_URL;
     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
     // @ts-ignore
     postMessage({ msg: helloStr });
};

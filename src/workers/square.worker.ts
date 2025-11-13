// eslint-disable-next-line import/no-anonymous-default-export
export const SquareWorker = () => {
     //eslint-disable-next-line no-restricted-globals
     onmessage = (message) => {
          const data = message.data;
          const square = data * data;
          console.log("data ", data);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          postMessage({ msg: square });
     };
};

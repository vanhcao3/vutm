interface ItemLocalProps {
     name: string;
     value: string | number;
}

interface SaveDataToLocalStorageProps {
     name: string;
     type?: string;
     id?: string;
     modify?: ItemLocalProps[];
     dataPush?: any;
}

export function checkLengthDataLocalStorage(name: string) {
     const lengthData = JSON.parse(window.localStorage.getItem(name)) || [];
     return lengthData.length;
}

export function saveDataToLocalStorage(props: SaveDataToLocalStorageProps) {
     const { name, type, id, modify, dataPush } = props;
     const listText = JSON.parse(window.localStorage.getItem(name)) || [];
     const itemText = listText.find((item) => item.id === id);

     dataPush && listText.push(dataPush);
     if (modify) {
          modify.map((item) => {
               itemText[item!.name] = item?.value;
          });
          listText[listText.findIndex((item) => item.id === id)] = itemText;
     }
     window.localStorage.setItem(name, JSON.stringify(listText));
}

export function deleteDataLocalStorage(name: string) {
     window.localStorage.removeItem(name);
}

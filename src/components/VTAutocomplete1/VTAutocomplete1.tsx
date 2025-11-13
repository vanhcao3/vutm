import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { RenderRow } from "./VTTreeAutocompleteRow";
import { Autocomplete, Checkbox, TextField } from "@mui/material";

export interface columnsType {
     title: string | JSX.Element;
     key: string;
     render?: (any) => JSX.Element;
     root?: boolean;
     width?: string;
}

export interface VTAutocomplete1Props {
     /**
      * Label Input
      */
     label: string;

     /**
      * Placeholder Input
      */
     placeholder?: string;

     dataTree: any;

     // Loại đường kẻ nối giữa các node cha và con
     type?: "lineSolid" | "lineDashed" | "unLine";

     className?: string;

     // Collapse All | Expand All
     isToggleAll?: boolean;

     dataSearch?: string;

     // Loại checkBox: 'single' : checkbox từng node riêng biệt | 'dependent': checkbox phụ thuộc cha/con
     typeCheckBoxNode?: "single" | "dependent";

     // Bắt sự kiện checkBox trả về  Obj dataCheckBox: {idNode: boolean}
     checkBoxEmit?: (dataCheckBox: any) => void;

     isCheckBoxNodeAll?: boolean;
     handleChangeInput?: (value) => void;
}

export const VTAutocomplete1 = (props: VTAutocomplete1Props) => {
     const {
          label,
          placeholder,
          className,
          dataTree,
          type,
          isToggleAll,
          dataSearch,
          typeCheckBoxNode,
          checkBoxEmit,
          isCheckBoxNodeAll,
          handleChangeInput,
     } = props;
     const [dataListNode, setDataListNode] = useState([]);
     const [dataCheckBox, setDataCheckBox] = useState({});
     const [rawDataListNode, setRawDataListNode] = useState([]);
     const rawDataListNodeInit = [];
     const isSetInitDataCheckBox = useRef(false);
     const [dataSelected, setDataSelected] = useState([]);
     const [listValueInput, setListValueInput] = useState([]);
     const [isDisplay, setIsDisplay] = useState(false);
     const columns = [
          {
               title: "",
               key: "name",
               render: null,
               root: true,
          },
     ];

     useEffect(() => {
          if (dataTree) {
               dataUpdate(dataTree, null);
               setDataListNode(rawDataListNodeInit);
          }
     }, [dataTree]);

     useEffect(() => {
          if (!isSetInitDataCheckBox.current && dataListNode.length) {
               setDataCheckBox(defaultDataCheckBox());
               isSetInitDataCheckBox.current = true;
          }
     }, [dataListNode]);

     useEffect(() => {
          if (typeCheckBoxNode) {
               const rawDataCheckBoxEmit = {
                    idChecked: [],
                    idUnchecked: [],
               };
               const objArray = Object.entries(dataCheckBox);

               rawDataCheckBoxEmit.idChecked = objArray
                    .filter(([key, value]) => {
                         return value === true;
                    })
                    .map(([key, value]) => key);

               rawDataCheckBoxEmit.idUnchecked = objArray
                    .filter(([key, value]) => {
                         return value === false;
                    })
                    .map(([key, value]) => key);

               checkBoxEmit(rawDataCheckBoxEmit);
               setDataSelected(rawDataCheckBoxEmit.idChecked);
          }
     }, [dataCheckBox]);

     const defaultDataCheckBox = () => {
          const rawDefaultDataCheckBox = {};
          dataListNode.forEach((item) => {
               return (rawDefaultDataCheckBox[item.id] = isCheckBoxNodeAll || false);
          });
          return rawDefaultDataCheckBox;
     };

     // Làm phẳng mảng dataTree
     const dataUpdate = (data, id_Parent) => {
          data?.map((item) => {
               const rawItem = item;
               rawItem.idParent = id_Parent;

               // Nếu có children thì tiếp tục đi sâu vào để lấy đủ tất cả data tree
               if (item.children) {
                    dataUpdate(item.children, item.id);
               }
               return rawDataListNodeInit.push(rawItem);
          });
          setRawDataListNode(rawDataListNodeInit);
     };

     const handleChangeCheckBoxNode = (e: ChangeEvent<HTMLInputElement>) => {
          // Tìm node vừa được change
          const nodeCheck = dataListNode.find((item) => item.id === e.target.id);

          // Nếu node đó là node cha thì check all node child (type: dependent)
          if (nodeCheck.children && typeCheckBoxNode === "dependent") {
               const rawDataCheckBox = dataCheckBox;
               handleCheckChildren(nodeCheck.children, rawDataCheckBox, e);
               setDataCheckBox((prev) => ({ ...prev, ...rawDataCheckBox }));
          } else {
               setDataCheckBox((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
          }

          // Nếu node đó là con của 1 node, kiểm tra tất cả các node con cùng cấp checked hết chưa (type: dependent)
          if (nodeCheck.idParent && typeCheckBoxNode === "dependent") {
               checkAllChild(nodeCheck.idParent, e.target.id, e.target.checked);
          }
     };

     // Xử lý check/uncheck tất cả các node child khi check/uncheck node parent
     const handleCheckChildren = (dataChild, rawDataCheckBox, e) => {
          dataChild.forEach((item) => {
               if (item.children) {
                    handleCheckChildren(item.children, rawDataCheckBox, e);
               }
               return (rawDataCheckBox[`${item.id}`] = e.target.checked);
          });
          rawDataCheckBox[e.target.name] = e.target.checked;
     };

     // Xử lý khi đã check đủ các node child hay chưa đề check/uncheck node parent
     const checkAllChild = (id_Parent, id_Child, value) => {
          const rawDataCheckBox = dataCheckBox;
          rawDataCheckBox[`${id_Child}`] = value;
          const dataParent = dataListNode.find((item) => item.id === id_Parent);

          const lengthChild = dataParent.children.length;
          let totalChecked = 0;
          let totalUnChecked = 0;

          dataParent.children.map((item) => {
               if (rawDataCheckBox[`${item.id}`]) {
                    totalChecked = totalChecked + 1;
               } else {
                    totalUnChecked = totalUnChecked + 1;
               }
          });

          if (totalChecked === lengthChild) {
               setDataCheckBox((prev) => ({ ...prev, [`${id_Parent}`]: true }));

               // Nếu parent vẫn có parent hơn cấp thì tiếp tục check
               if (dataParent.idParent) {
                    checkAllChild(dataParent.idParent, id_Parent, true);
               }
          } else {
               setDataCheckBox((prev) => ({ ...prev, [`${id_Parent}`]: false }));

               // Nếu parent vẫn có parent hơn cấp thì tiếp tục check
               if (dataParent.idParent) {
                    checkAllChild(dataParent.idParent, id_Parent, false);
               }
          }
     };

     const getValueSelected = useCallback(
          (value?: any) => {
               if (value) {
                    const data = [];
                    value.forEach((item) => data.push(item.id));
                    const cloneDataCheckBox = dataCheckBox;
                    const objectToArray = [];
                    Object.keys(cloneDataCheckBox).forEach((objectKey) => {
                         if (data.includes(objectKey)) {
                              objectToArray.push({
                                   [`${objectKey}`]: true,
                              });
                         } else
                              objectToArray.push({
                                   [`${objectKey}`]: false,
                              });
                    });
                    const arrayToObject = {};
                    objectToArray.forEach((item) => {
                         Object.assign(arrayToObject, item);
                    });

                    setDataCheckBox(arrayToObject);
                    setDataSelected(data);
                    return value;
               }

               const valueSelecteds = [];
               dataSelected.map((data) => {
                    const value = rawDataListNode.find((item) => item.id === data);
                    valueSelecteds.push(value);
               });
               return valueSelecteds;
          },
          [dataSelected]
     );

     useEffect(() => {
          setListValueInput(getValueSelected());
     }, [getValueSelected]);

     const handleBlur = (e) => {
          const currentTarget = e.currentTarget;
          requestAnimationFrame(() => {
               if (!currentTarget.contains(document.activeElement)) {
                    setIsDisplay(false);
               }
          });
     };
     return (
          <div onBlur={handleBlur}>
               <Autocomplete
                    multiple
                    open={false}
                    disableClearable
                    value={listValueInput}
                    onOpen={(e: any) => {
                         if (!e.target.value) {
                              handleChangeInput("");
                              setIsDisplay(true);
                         }
                    }}
                    onChange={(e, value) => {
                         setListValueInput(getValueSelected(value));
                    }}
                    blurOnSelect={true}
                    onInputChange={(event, value, reason) => {
                         if (reason === "reset") {
                              return;
                         } else handleChangeInput(value);
                    }}
                    options={[]}
                    getOptionLabel={(option: any) => option.name}
                    renderInput={(params) => {
                         return <TextField {...params} label={label} placeholder={placeholder} />;
                    }}
               />
               {isDisplay && (
                    <table className={`${className}`}>
                         <thead>
                              <tr></tr>
                         </thead>
                         <tbody>
                              {dataSearch &&
                                   dataListNode.map((item, index) => {
                                        if (
                                             item.name
                                                  .toLowerCase()
                                                  .includes(dataSearch.toLowerCase())
                                        ) {
                                             return (
                                                  <tr key={index}>
                                                       {
                                                            <td
                                                                 key={columns[0].key}
                                                                 className={`p-2 ${
                                                                      columns[0].root
                                                                           ? ""
                                                                           : "text-center"
                                                                 } `}
                                                            >
                                                                 {columns[0].root &&
                                                                      typeCheckBoxNode && (
                                                                           <Checkbox
                                                                                className="mr-3 cursor-pointer"
                                                                                name={`${item.id}`}
                                                                                id={item.id}
                                                                                checked={
                                                                                     dataCheckBox?.[
                                                                                          `${item.id}`
                                                                                     ] ?? false
                                                                                }
                                                                                onChange={
                                                                                     handleChangeCheckBoxNode
                                                                                }
                                                                           />
                                                                      )}
                                                                 {columns[0].render
                                                                      ? columns[0].render(item)
                                                                      : item[columns[0].key]}
                                                            </td>
                                                       }
                                                  </tr>
                                             );
                                        }
                                   })}

                              {!dataSearch &&
                                   dataTree.map((personData) => {
                                        return (
                                             <RenderRow
                                                  key={personData.id}
                                                  type={type || "unLine"}
                                                  personData={personData}
                                                  columns={columns}
                                                  isToggleAll={isToggleAll}
                                                  typeCheckBoxNode={typeCheckBoxNode}
                                                  dataCheckBox={dataCheckBox}
                                                  onChangeCheckBox={handleChangeCheckBoxNode}
                                             />
                                        );
                                   })}
                         </tbody>
                    </table>
               )}
          </div>
     );
};

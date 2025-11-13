interface StatusAllCheckedProps {
    totalItem: number,
    type?: string,
    listChecked?: any
}

interface SetAllSelectedProps {
    checked: boolean,
    dragData: any,
    listChecked: any,
    handleListCheck: any,
    handleDataSelected: any,
    listDataTable?: any,
}

interface HandleInCrementSelectProps {
    index: number,
    checked: boolean,
    listChecked: any,
    handleListCheck: any
}

/**
 * Hàm xử lý: thay đổi trạng thái checkbox từng row
 * @param checked 
 */
export const handleIndeterminateSelect = (props: HandleInCrementSelectProps) => {
    const { index, checked, listChecked, handleListCheck } = props;
    const selectIndex = listChecked.map((c, i) => {
        if (i === index) {
            return checked;
        } else {
            return c;
        }
    });
    handleListCheck(selectIndex)
}

/**
 * Hàm xử lý: chọn tất cả hoặc bỏ chọn tất cả
 * @param checked : value checked in checkbox
 */
export const setAllSelected = (props: SetAllSelectedProps) => {
    const { checked, dragData, listChecked, handleListCheck, handleDataSelected, listDataTable } = props;
    const selectIndex = listChecked.map(() => {
        return checked;
    })
    handleListCheck(selectIndex)
    if (checked) {
        handleDataSelected(listDataTable)
    } else {
        handleDataSelected([])
    }
}

/**
 * Hàm kiểm tra trạng thái checkbox trên thanh table header
 * @param type : có hai giá trị truyền vào: checkAll và indeterminate
 * @returns booble
 */
export const statusAllChecked = (props: StatusAllCheckedProps): boolean => {
    const { totalItem, type, listChecked } = props;

    const a = listChecked.filter(item => item === true);
    if (type === 'checkAll' && a.length === totalItem) {
        return true;
    }
    if (type === 'indeterminate' && a.length !== 0 && a.length !== totalItem) {
        return true;
    }
    return false;
}
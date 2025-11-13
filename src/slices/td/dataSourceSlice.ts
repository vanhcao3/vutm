// eslint-disable-next-line no-restricted-imports
import { DataSource } from "@/features/airtrans/dataSource/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialDataSource: DataSource = {
     connection_type: null,
     coverage: null,
     created_at: null,
     created_by: null,
     datasource_add: null,
     datasource_port: null,
     id: null,
     position: [],
     updated_at: null,
     updated_by: null,
     is_display: true,
};

interface DataSourceState {
     dataSourceList: DataSource[];
}

const initialState: DataSourceState = {
     dataSourceList: [],
};

export const dataSourceSlice = createSlice({
     name: "dataSource",
     initialState,
     reducers: {
          setDataSourceList: (state, action: PayloadAction<Array<DataSource>>) => {
               state.dataSourceList = action.payload;
          },
          toggleDataSourceDisplay: (state, action: PayloadAction<string>) => {
               const source = state.dataSourceList.find((item) => item.id === action.payload);
               if (source) {
                    if (source.is_display === undefined) source.is_display = false;
                    else source.is_display = !source.is_display;
               }
          },
     },
});

export const { setDataSourceList, toggleDataSourceDisplay } = dataSourceSlice.actions;

export default dataSourceSlice.reducer;

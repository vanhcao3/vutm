import { setPrivileges } from "@/slices/td/drawerSlice";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { deletePrivileges, getPrivileges, postPrivileges, putPrivileges } from "../api";
import { initPrivilege, Privilege } from "../type";

export interface ModifiedQuery {
     id: string;
     data: Privilege;
}

export const usePrivileges = () => {
     const dispatch = useDispatch();
     const queryClient = useQueryClient();
     const get = useQuery("privileges", getPrivileges, {
          onSuccess: (data) => {
               dispatch(setPrivileges(data));
          },
     });

     const deleteFn = useMutation(deletePrivileges, {
          onSuccess: () => {
               queryClient.invalidateQueries("privileges");
          },
     });

     const updateFn = useMutation(({ id, data }: ModifiedQuery) => putPrivileges(id, data), {
          onSuccess: () => {
               queryClient.invalidateQueries("privileges");
          },
          onError: (err) => {
               console.log(err);
          },
     });

     const createFn = useMutation(postPrivileges, {
          onSuccess: () => {
               queryClient.invalidateQueries("privileges");
          },
     });
     return { get, deleteFn, updateFn, createFn };
};

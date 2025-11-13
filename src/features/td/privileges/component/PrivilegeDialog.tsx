/* eslint-disable react/jsx-key */
import {
     Button,
     Dialog,
     DialogActions,
     DialogContent,
     DialogTitle,
     FormControl,
     MenuItem,
     Select,
     TextField,
     Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { initPrivilege, Privilege } from "../type";
import { useSelector } from "react-redux";
import { usePrivileges } from "../hook/usePrivileges";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";

interface DialogProps {
     open: boolean;
     onClose: () => void;
     initValue: Privilege | null;
     action: string;
}
export const PrivilegeDialog = (props: DialogProps) => {
     const { t } = useTranslation();
     const { open, initValue, action } = props;
     const { privileges } = useSelector((state: any) => state.drawer);
     const apiPrivileges = usePrivileges();

     const {
          control,
          handleSubmit,
          formState: { errors },
          reset,
     } = useForm({
          defaultValues: { ...(initValue ? initValue : initPrivilege) },
     });

     useEffect(() => {
          reset({ ...(initValue ? initValue : initPrivilege) });
          // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [initValue]);

     const onConfirm = (data: Privilege) => {
          if (action === "create") {
               apiPrivileges.createFn.mutate(data);
          } else {
               if (data.id) apiPrivileges.updateFn.mutate({ id: data.id, data: data });
          }

          props.onClose();
     };

     const onClose = () => {
          props.onClose();
     };
     return (
          <Dialog open={open} onClose={props.onClose} maxWidth="xs">
               <DialogTitle
                    sx={{
                         textTransform: "uppercase",
                         fontWeight: "700",
                         textAlign: "center",
                         backgroundColor: "royalblue",
                         color: "white",
                    }}
               >
                    {t(`${action}`)}
               </DialogTitle>
               <DialogContent sx={{ display: "flex", flexDirection: "column", marginTop: "1em" }}>
                    <Grid container rowSpacing={2}>
                         <Grid sx={{ display: "flex", margin: "auto" }}>
                              <Typography>{t("privilege.code")}</Typography>
                         </Grid>
                         <Grid>
                              <Controller
                                   name="code"
                                   control={control}
                                   rules={{ required: true }}
                                   render={({ field }) => (
                                        <TextField
                                             {...field}
                                             error={errors.code !== undefined}
                                             helperText={errors.code && "Code is required"}
                                             sx={{ width: "100%" }}
                                        />
                                   )}
                              />
                         </Grid>

                         <Grid size={4} sx={{ display: "flex", margin: "auto" }}>
                              <Typography>{t("privilege.name")}</Typography>
                         </Grid>
                         <Grid size={8}>
                              <Controller
                                   name="name"
                                   control={control}
                                   rules={{ required: true }}
                                   render={({ field }) => (
                                        <TextField
                                             {...field}
                                             error={errors.name !== undefined}
                                             helperText={errors.name && "Name is required"}
                                             sx={{ width: "100%" }}
                                        />
                                   )}
                              />
                         </Grid>

                         <Grid size={4} sx={{ display: "flex", margin: "auto" }}>
                              <Typography>{t("privilege.parent")}</Typography>
                         </Grid>
                         <Grid size={8}>
                              <FormControl sx={{ width: "100%" }}>
                                   <Controller
                                        control={control}
                                        name="parent_id"
                                        render={({ field }) => (
                                             <Select {...field} onChange={field.onChange}>
                                                  <MenuItem value={""}>
                                                       <em>None</em>
                                                  </MenuItem>
                                                  {(privileges as Privilege[])
                                                       .filter(
                                                            (pri) => pri.code !== initValue?.code
                                                       )
                                                       .map((item) => (
                                                            <MenuItem value={item.id} key={item.id}>
                                                                 {item.name}
                                                            </MenuItem>
                                                       ))}
                                             </Select>
                                        )}
                                   />
                              </FormControl>
                         </Grid>
                    </Grid>
               </DialogContent>
               <DialogActions sx={{ alignContent: "center" }}>
                    <Button onClick={handleSubmit(onConfirm)}>{t("confirm")}</Button>
                    <Button onClick={onClose}>{t("cancel")}</Button>
               </DialogActions>
          </Dialog>
     );
};

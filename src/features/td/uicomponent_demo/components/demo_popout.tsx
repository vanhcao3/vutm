import { Button as MUIButton } from "@mui/material";

export function DemoPopout() {
    const handleClick = () => {
        const td: any = window.open("/td/demo", "", "width=1920,height=1080,left=1920,top=0");
        td.onload = () => {
            td.document.title = "TD";
        };
    }
    return (
        <div>
            <MUIButton sx={{ mx: "auto" }} variant='outlined' onClick={handleClick}>
                Open popup
            </MUIButton>
        </div >
    )
}

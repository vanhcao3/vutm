import VTNotificationDialog from '@/components/VTNotificationDialog';
import { Button } from '@mui/material';
import { useState } from 'react';

export function DemoDialog() {
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [metaData, setMetaData] = useState(0);
    const footerDialog = [
        {
            title: 'Xac  Nhan',
            baseFunction: (event) => {
                setOpenDeleteConfirm(false)
                console.log('Xac  Nhan', event);
            },
        },
        {
            title: 'Huy',
            baseFunction: (event) => {
                setOpenDeleteConfirm(false)
                console.log('Huy', event);
            },
        },
    ];
    const handleButton1Click = () => {
        setTitle("Dialog 1");
        setContent("Dialog 1 message");
        setMetaData(1);
        setOpenDeleteConfirm(true);
    }
    const handleButton2Click = () => {
        setTitle("Dialog 2");
        setContent("Dialog 2 message");
        setMetaData(2);
        setOpenDeleteConfirm(true);
    }
    return (
        <div>
            <Button className='flex w-80' onClick={handleButton1Click} variant="outlined">
                Open Dialog 1
            </Button>
            <Button className='flex w-80' onClick={handleButton2Click} variant="outlined">
                Open Dialog 2
            </Button>
            <VTNotificationDialog
                title={title}
                content={content}
                onClose={() => setOpenDeleteConfirm(false)}
                open={openDeleteConfirm}
                footer={footerDialog}
                metaData={metaData}
            />
        </div>
    )
}   
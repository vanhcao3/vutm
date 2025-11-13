import { VTImagePdfView } from "@/components/VTImagePdfView";

export function DemoImagePdfView() {
    const dataImage = '/storage/files/779304b8-2626-429c-b23a-f3693ed3cf6f';
    const dataPdf = '/storage/files/3440a904-87c6-4acc-b912-b76f58bcc155';
    return (
        <div>
            <VTImagePdfView data={dataImage} type='image' />
            <VTImagePdfView data={dataPdf} type='pdf' />
        </div>
    )
}
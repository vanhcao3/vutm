
enum IVTImagePdf {
    IMAGE = 'image',
    PDF = 'pdf',
}

interface VTImageViewProps {
    /**
     * có 2 giá trị: image và pdf
     */
    type: string;

    /**
     * Link data
     */
    data: string;

    /**
     * Chiều dài
     */
    width?: string;

    /**
     * Chiều rộng
     */
    height?: string;
}

export function VTImagePdfView(props: VTImageViewProps) {
    const { type = IVTImagePdf.IMAGE, data, width = '100%', height = "100%" } = props;
    if (type === IVTImagePdf.PDF) {
        return (
            <div>
                <embed
                    src={data}
                    type="application/pdf"
                    width={width}
                    height={height}
                />
            </div>
        )
    }
    return (
        <div>
            <img src={data} style={{ width: `${width}`, height: `${height}` }} alt='' />
        </div>
    )
}
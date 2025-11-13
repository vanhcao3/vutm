import { useDrop } from "react-dnd";

interface ColumnDndProps {
    children: React.ReactNode;
    className?: string;
    title: string;
    type: string | Array<string>;
}

export const ColumnDnd = ({ children, className, title, type }: ColumnDndProps) => {

    const [, drop] = useDrop({
        accept: type,
        drop: () => ({ name: title }),
    });

    return (
        <div ref={drop} className={className}>
            {children}
        </div>
    );
};
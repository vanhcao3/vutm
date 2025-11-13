import React, { useEffect, useState } from "react";

interface TestProps {
    children?: React.ReactNode;
}
export default function TestLoading(props: TestProps) {
    return (<>{props.children}</>)
}


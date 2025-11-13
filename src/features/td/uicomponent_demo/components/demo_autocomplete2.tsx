import VTAutocomplete2 from "@/components/VTAutocomplete2";

export function DemoAutocomplete2() {
    const top10Songs = [
        {
            id: '1',
            label: "Option 1",
        },
        {
            id: '2',
            label: "Option 2",
        },
        {
            id: '3',
            label: "Option 3",
        },
        {
            id: '4',
            label: "Option 4",
        },
        {
            id: '5',
            label: "Option 5",
        },
        {
            id: '6',
            label: "Option 6",
        },
        {
            id: '7',
            label: "Option 7",
        },
        {
            id: '8',
            label: "Option 8",
        },
    ];

    const handleSubmit = (value) => {
        console.log('ValueSubmit', value);
    }

    const handleInputValue = (value) => {
        console.log('InputValue', value);
    }

    return (
        <div>
            Autocomplete with checkbox, multiselect
            <VTAutocomplete2 data={top10Songs} label='Songs' multiply checkbox handleSubmit={handleSubmit} handleInputValue={handleInputValue} />
        </div>
    )
}
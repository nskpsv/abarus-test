import { useSearchParams } from "react-router-dom";

const [searchParams, setSearchParams] = useSearchParams();
const setSearchParamsState = (newParam: string, value: string) => {
    const next = Object.assign(
        {},
        Array.from(searchParams.entries()).reduce(
            (o, [key, value]) => ({ ...o, [key]: value }),
            {}
        ),
        { [newParam]: value }
    );
    setSearchParams(next);
};

export {setSearchParamsState}
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("_sort") ? searchParams.get("_sort") + "|" + searchParams.get("_order") : "";

    const sortDevicesHandler = (e) => {
        const sortParamsString = e.target.value;
        const [sortValue, orderValue] = sortParamsString.split("|");
        searchParams.set("_sort", sortValue);
        searchParams.set("_order", orderValue);
        setSearchParams(searchParams);
    };

    return <Select options={options} type="white" value={sortBy} onChange={sortDevicesHandler} />;
}

export default SortBy;

export default function (locationSearch) {
    const searchParams = new URLSearchParams(locationSearch);
    const page = parseInt(searchParams.get("page"));
    const sortDirection = searchParams.get("sort_direction");
    const sortField = searchParams.get("sort_field");
    return { page, sortDirection, sortField };
}

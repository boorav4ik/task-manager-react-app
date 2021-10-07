export default function (newParams, oldParams) {
    const searchParams = new URLSearchParams();
    searchParams.append(
        "sort_field",
        newParams.sortField ?? oldParams.sortField
    );
    searchParams.append(
        "sort_direction",
        newParams.sortDirection ?? oldParams.sortDirection
    );
    searchParams.append("page", newParams.page ?? oldParams.page);
    return `?${searchParams.toString()}`;
}

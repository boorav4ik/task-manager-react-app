export default function (pathname) {
    const match = pathname.match(/^\/login\/(?<param>[0])/);
    if (match) {
        switch (match.groups.param) {
            case "0":
                return { color: "error", children: "You need to log in" };
            default:
                break;
        }
    }
    return {};
}

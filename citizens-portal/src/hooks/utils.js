export const generateUrl = (path, application) => {
    const cleanedPath = !path.startsWith("/") ? `/${path}`:path;
    return `${application}/api/v1/${application}${cleanedPath}`;
}
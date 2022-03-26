import {useState, useCallback} from "react";
import API from "../utils/api";
import {generateUrl} from "./utils";

function UseUploadFile(url, application) {
    const [response, setResponse] = useState({
        data: null,
        loading: false,
        error: null,
    });

    const apiCall = useCallback((payload, actionCallback = () =>{}, errorCallback = () => {}) => {
            setResponse((prevState) => ({...prevState, loading: true, error: null}));

            API.post(generateUrl(url, application), payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(res => {
                    setResponse({data: res.data, loading: false, error: null});
                    actionCallback();
                })
                .catch(error => {
                    setResponse({data: null, loading: false, error: error.response.data.error[0] || error});
                    errorCallback();
                });
        }
        , [application, url]);

    return [apiCall, response];
}

export default UseUploadFile;
import {useState, useCallback} from "react";
import API from "../utils/api";
import {generateUrl} from "./utils";

function UsePost(url, application) {
    const [response, setResponse] = useState({
        data: null,
        loading: false,
        error: null,
    });

    const apiCall = useCallback((payload, actionCallback = () =>{}) => {
            setResponse((prevState) => ({...prevState, loading: true, error: null}));

            API.post(generateUrl(url, application), payload)
                .then(res => {
                    setResponse({data: res.data, loading: false, error: null});
                    actionCallback(res.data);
                })
                .catch(error => setResponse({data: null, loading: false, error: error.response.data.error[0] || error}));
        }
        , [application, url]);

    return [apiCall, response];
}

export default UsePost;
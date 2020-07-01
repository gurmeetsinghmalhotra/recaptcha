import useSWR from "swr";
// import Person from "../components/Person";
import Head from "next/head";

const fetcher = (url) => fetch(url).then((res) => res.json());

// const apiRequestPost = async (url = "", additionalData = {}, token = "") => {
//   const formData = JSON.stringify(additionalData);

//   try {
//     const response = await axios({
//       method: "post",
//       url: url,
//       data: formData,
//       headers: {
//         Authorization: token,
//         Accept: "application/json",
//         "Access-Control-Allow-Origin": "*",
//         "Content-Type": "application/json",
//       },
//     });

//     // const response = await fetch(`${url}`, {
//     //   credentials: "include",
//     //   headers: {
//     //     Authorization: token,
//     //     'Accept': "application/json",
//     //     'Access-Control-Allow-Origin': '*',
//     //     "Content-Type": "application/json"
//     //   },
//     //   method: "POST",
//     //   cache: "no-cache",
//     //   timeout: 30 * 1000,
//     //   body: formData,
//     // });
//     const resp = await checkStatus(response);
//     // return parseJSON(resp);
//     // console.log(resp.data);
//     return resp.data;
//   } catch (error) {
//     console.log("request failed", error);
//     return {};
//   }
// };

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

// const addComment = (params) =>
// apiRequestPost(`${HOST}/api/comment/secure-create`, params, fcpressToken);

export default function Index() {
  const { data, error } = useSWR("/api/people", fetcher);

  const [resp, setResp] = React.useState({});

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loadingssssss...</div>;

  const onSubmit = async () => {
    console.log('here');
    grecaptcha.ready(function () {
      grecaptcha
        .execute("6Ldb56sZAAAAAIZh5zd7ZTeCah1mUawiRxSLc8GK", {
          action: "submit",
        })
        .then(function (token) {
          console.log(token);
          // const res = await addComment({token: token});
          postData("/api/recaptcha", {token: token}).then(
            (data) => {
              console.log(data); // JSON data parsed by `data.json()` call
              setResp(data);
            }
          );
          // Add your logic to submit to your backend server here.
        });
    });
    // const res = await addComment(values);
    // console.log(res);
    // console.log(values);
    //await ajax func for api call on submit
    // alert(JSON.stringify(values, null, 2));
  };

  return (
    <>
      <Head>
        <script src="https://www.google.com/recaptcha/api.js?render=6Ldb56sZAAAAAIZh5zd7ZTeCah1mUawiRxSLc8GK"></script>
      </Head>
      <button onClick={onSubmit}>Get User Score</button>
      {JSON.stringify(resp, null, 2)}
      {/* <ul>
        {data.map((p, i) => (
          <Person key={i} person={p} />
        ))}
      </ul> */}
    </>
  );
}

async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //   credentials: "same-origin", // include, *same-origin, omit
      headers: {
        // "Content-Type": "application/json",
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

export default function handler(req, res) {
    const token = req.body.token;
    // postData("https://www.google.com/recaptcha/api/siteverify", `secret='6Ldb56sZAAAAAPofNwr28BFT9e0k660PwGXmi1YB'&response=${token}`).then(
    //     (data) => {
    //     //   console.log(data); // JSON data parsed by `data.json()` call
    //     // return data;
    //     res.status(200).json(data);
    //     }
    //   );

    const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

  return fetch(VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=6Ldb56sZAAAAAPofNwr28BFT9e0k660PwGXmi1YB&response=${token}`,
  })
  .then(response => response.json())
  .then(data => {
    res.status(200).json(data);
  });
    
  }
const https = require("https");
const fs = require("fs");

function makeRequest2(path) {
  const options2 = {
    method: "GET",
    hostname: "www.domain.com.au",
    path,
    headers: {
      authority: "www.domain.com.au",
      accept: "*/*",
      "accept-language": "en,id;q=0.9,en-AU;q=0.8,en-US;q=0.7",
      cookie:
        'searchSOI=qld; domain-mixpanel-id_ab0bde70050c3eabaaf8824402fa01e0=17c86383f0722f-060dc2757979da-1d3b6650-4da900-17c86383f08b93; DEVICE_SESSIONID=fbeb9142-57a1-4c24-8ee9-11079957fa49; _gcl_au=1.1.967721555.1689028626; _duid=undefined; _tgpc=1142aaae-8f76-5822-9ded-8d207fa445a3; _hjid=22df061d-236e-4a85-8929-6645a3edb49c; _hjSessionUser_966278=eyJpZCI6IjAxNTcxZDBjLWRjOGYtNWM5OC1iMDliLTY3ZWY4MDRiYTJmYiIsImNyZWF0ZWQiOjE2ODkwMjg2MjY4MTEsImV4aXN0aW5nIjp0cnVlfQ==; DM_SitId1455=1; DM_SitId1455SecId12673=1; AMCVS_50AB0C3A53DB1B290A490D4D%40AdobeOrg=1; _dommem=member; aam_did=73479434817952325833538647447935282675; NUID=31c519041bef4105a6803fc01e7952a5; __gsas=ID=b542a291dc613b5b:T=1689028659:RT=1689028659:S=ALNI_MbX5xS0W5YFUykzkFtXMiyc_ZxGVw; DM_SitId1455SecId12671=1; __hstc=80052872.4ffe0d9299b627a583239f72a3e2d933.1689030446073.1689030446073.1689030446073.1; hubspotutk=4ffe0d9299b627a583239f72a3e2d933; __hssrc=1; _pin_unauth=dWlkPU1UTmlZekpoWldFdFpqUTFOaTAwWWpJM0xUaGlZbVF0TldWalpqRmlNMk5pTjJFNA; HPG2=false; _ltm_referrer=https%3A%2F%2Fwww.google.com%2F; optimize=segment%3D18388029; _ga_XQ0HFHLTBL=GS1.1.1689114162.2.0.1689114162.0.0.0; _gid=GA1.3.1260387671.1689382852; _ga_3W8KH4GD7S=GS1.1.1689382852.3.0.1689382852.0.0.0; _derived_epik=dj0yJnU9eTZXNnVyVnBHQXdaNTJHMGhGMTVrcnNvNEJxOE5pdmkmbj1PZ1pzNTFac3VnbWJXcF8yVUxnQnd3Jm09MSZ0PUFBQUFBR1N5VV9rJnJtPTEmcnQ9QUFBQUFHU3lVX2smc3A9Mg; bm_sz=38B7F0483552BF5CA6DBDF70299CFA4C~YAAQLKgtF9rU3k6JAQAA7R3OWxSPTieb097V78SFZ573e0RUMHrImQofm5SNi484lBrXrHWqozMMfHUucTuHttcRAOSSUZhlHAUwDMsyD33Obr/xiimW8REjwywLG0RsU+x9gtXXmKeA9AlG9H22HJzKfY2mbvSpjgyUoJ45c+oJpP3hLD5INHP0n6IqySBH9JGvJ96DYfpyJ53vvXCFL5dWJkNipwLM8q5m+TPBIt1oEgnwk3whD1rsPqmyD0R85v7R4RuF4Ys06ijlBRPRda8vbL5xdXh2c16LuTEfn/1YuUir9xc=~3485766~3229251; _abck=4773194439C20684580456EE14DC3422~0~YAAQLKgtF/zU3k6JAQAAdB/OWwrvFBT+gXMskEfjpthgB6wXUGelFX+xwOKtTDfs8DLqeWosHGt1xTF8nR9bE5X8isQS2lKK+Ds2eGnuCLI8Ju+czbideQ5tNYdthLhck0499uriQfP6lyhnG4xTatXEQKXwTVik1obubRpm9JOjtn+RgSbntuN5hl4xFfNcCZsihpuIHAxYn8Xpqgrq3lXweKvbkdsZm5gROf3/ej7tuZRFGT/1GNvNBBrxmUpmKaZvACofIAxVr23myY65M3NvsnFWFHzJu/okAfwXdga3gHbM++qe4Je1bTVogQlHUt3h2nVhQEt+0/9Fx7JEk4iOAxUWV33y5OHJhgKgbpGkeAPn8z20C/kdyFN4SvDlplWcZxO33nb7FNRkfGCinOMvvm3DiSMryyzA~-1~-1~1689465869; ak_bmsc=CF34C007DA04F84FEFECD6453F8C2CCD~000000000000000000000000000000~YAAQLKgtFyjV3k6JAQAA2iHOWxQuGpkn99lQG5McqntRZKFuqhxf4IbHMnWukwzh72CaNm0KOsPCi6t9anMWCuZqBgG9AFnQXVxaq2O9kLiuqdoeYvu2tug6Wlyn8dpydnVpfNm1ydj15do9sDJ27mnad3vVElkZuRt2MZA+GRyevFhMrfQGWUxryFl+0QbsxOmP2xYFCGrK6miiDgtSrYh3HstSFpMWWNz+wPddB+wsJHNrwpzyaL6ECT/ylw1JqTVkWm92V9lTDaHAgEN9i/SHZz7KF8w7XXHtXjAwVoWfMignvyWkm9HMKDPhJZbFrgSp5hlHprge5tC+vF3Gj5cJdfMIZM2MBqsAaEsJ4Ipd4q9pmAXeYYr6nZvccPeaqT+N3sJSwxS9+5MpJujS3W9Vu/HlGMqOqTHvEQ/1LOrVg+/TgCoPNaqxCSLGowHKmAKkm4ifbFeNLeMYwu7NLAqV5KIX3vl4IrmlcBGG9cIc2W6heXfgpkhm+J8w; _tguatd={"sc":"(direct)"}; _tgidts={"sh":"d41d8cd98f00b204e9800998ecf8427e","ci":"c13dbc69-2e02-5174-b03e-5e2f97b7bd4a","si":"6980b351-5b6a-5ab3-97dc-24af10fc3127"}; _hjSession_966278=eyJpZCI6ImEwOWJjNGYzLTMzYTgtNGNjNi1hNzg0LTQxM2M5NmQwODhhMCIsImNyZWF0ZWQiOjE2ODk0NjIzODMzNDAsImluU2FtcGxlIjp0cnVlfQ==; _hjAbsoluteSessionInProgress=0; AMCV_50AB0C3A53DB1B290A490D4D%40AdobeOrg=-1124106680%7CMCIDTS%7C19554%7CMCMID%7C73462533263068506283535832354595936752%7CMCAAMLH-1690067183%7C8%7CMCAAMB-1690067183%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1689469583s%7CNONE%7CMCAID%7C30B5067EA35D072F-60000DF797DEE80A%7CvVersion%7C5.2.0%7CMCCIDH%7C1320732531; _tgsc=6980b351-5b6a-5ab3-97dc-24af10fc3127:-1; _tgtim=6980b351-5b6a-5ab3-97dc-24af10fc3127:1689462386704:-1; _ga_MCWE28T85S=GS1.3.1689462428.1.0.1689462428.60.0.0; __zlcmid=1GrlyOO2He35Lz6; _tglksd={"s":"6980b351-5b6a-5ab3-97dc-24af10fc3127","st":1689462383150,"sod":"(direct)","sodt":1689408440030,"sods":"c","sodst":1689462432330}; _ga_HFSVJ1Z577=GS1.1.1689462383.9.1.1689463487.58.0.0; _ga_2EL8LE3P1V=GS1.1.1689462383.9.1.1689463487.0.0.0; _ga=GA1.1.172928287.1689028625; _uetsid=9f22de6022e611ee8a0f2f665fdb4a03; _uetvid=0957f9c02e0d11ec969885b89a1a52dc; TEAL=v:218941f38911179105927755697225375331a6d7b60$t:1689465287852$sn:8$en:3$s:1689462383670%3Bexp-sess; _hjIncludedInSessionSample_966278=1; _tgsid={"lpd":"{"lpu":"https://www.domain.com.au%2F","lpt":"Domain.com.au%20%7C%20Real%20Estate%20%26%20Properties%20For%20Sale%20%26%20Rent"}","ps":"7bf7ca4b-5949-4ed0-9d6e-a6fae66550f1","ec":"6","pv":"1"}; cto_bundle=aDUnCF9UY0I3ZTMzNWNpbFdVR1BQZWF5M0JPcUkyJTJCT21tUDFYTTJneURybXRDaSUyRllFOWVlYVFMUSUyRlZzVHdyJTJGeU1ldGpuU1FkamhvcERoZkkzSnRnNmd4UUdlOWlZJTJCUGRodnlYY0NhYWxXYlZRcHJ4ajRDYnFtQ2o2VE5PRk5GUjVpUExISm9IMGNLYUc5Z2NYQiUyRlBzZzRGSkREeDk3bjFBTiUyQlo5NlNPblRVb1FVWWQ4VWVYT3lZRm9lJTJCSWxFNk9YbE82alJiYmVwVzRPSVJFZXJ3MnZFdGIydyUzRCUzRA; nol_fpid=wegm0obowja5gkivyyn5szyblxfra1689028626|1689028626941|1689463488203|1689463488473; bm_sv=05CB586BC72181C166B9F60FDBCD7626~YAAQLKgtF6k14U6JAQAAxQHlWxS8Fd8srvw5C17c1p5x2kk99KzJfcOq1C+9kV5sdl5nTQY/JX8cdR8uakwjlnZNBk/njUaOOcxOsRxrKZV6eVPP/ni6OWIY5FXN/0Ujvm46drhyvfJUsIuL1WDK/W4K0QsZK7Lb8h0osCoLTmr40LzDT6PYbr4id+KQWyKBTNEbjbR2I8YXAeBfSBcdohGkmoQcgMetYeUDZt8EovWYJG4kvYtNCli7jauC94rc84CcHQ==~1; searchSOI=qld; _abck=4773194439C20684580456EE14DC3422~-1~YAAQLKgtF/zZ4U6JAQAASN7qWwqrwQWCKyhlQbmF3XyfeYUN7PggYiBjFy2oevAYzBnbzIMHQ/hXgmxoC9Oe7+osjD9AWrbUhilCl725PD5YSDSvoTjhdAzA7BfFnWi3hZrzBzws4D7NVYQYhvELj3Y9Idl+TZoSVRKFQD9kruQFuukfsUmuMBWOItw248fk4fBclC1ldU2CtGkcw69PW7g7VKX8bgW9uEgOytlUAIMbpX4nLumfUsds/h2TR4DShsJKD5iHA0NevRYgWGJJiZu2F89Kg+doSk/ABUtkDE7SKZuq+wvh+fcUAjpwmV5eSkvLLGpYd0ZGDGQB+UXg3D2aoIaJR5MsaU95oeOyU78yfphW8zB0CVPSkwAnCHO/isfQFoxn3JNtw1ywwLAB9eeYCdiemhYubTyA~0~-1~1689465869; bm_sv=05CB586BC72181C166B9F60FDBCD7626~YAAQLKgtF/3Z4U6JAQAASN7qWxQx3dNUqn7xSAhlRI4iRMB7H/zm6tStPpHtLGDSyDaSsjT841rjDxatllm3qA7eKPmhghqUX/Zs9PfoHBhM484kbqph020wBXmKb9Z86F63YSX3uRjFH6KNwVJREL4UwwzeUD9X0jpGLOm1aJx7ARpGPmjR+C8BKbK8axEj6O+R60YKywj7QL68+eGgbKHbAhfspViuN9tUE9UmINCxQ4fB57/dulAkYcSkBSc8dZIxBQ==~1',
      referer: "https://www.domain.com.au/",
      "sec-ch-ua":
        '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "user-agent": "",
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options2, (res) => {
      const chunks = [];

      res.on("data", (chunk) => {
        chunks.push(chunk);
      });

      res.on("end", () => {
        const body = Buffer.concat(chunks);
        resolve(body.toString());
      });

      res.on("error", (error) => {
        reject(error);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

let data = fs.readFileSync("./rawsuburbs.json", "utf8");

data = JSON.parse(data);

let count = 0;


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const output = []
const run = async () => {
  for (const item of data.data) {
    if (
      ["NSW", "VIC", "QLD"].includes(item.state) &&
      item.population > 2000 &&
      item.type === "Major Urban locality"
    ) {
      const formattedSuburb = item.suburb.replace(/ /g, "+").toLowerCase();
      const path = `/phoenix/api/locations/autocomplete/v2?prefixText=${formattedSuburb}&stateBoost=${item.state.toLowerCase()}`;
      let response = await makeRequest2(path);

      response = JSON.parse(response);
      const filtered = response.filter((x) => {
        if (x.category !== "Suburb") {
          return false;
        }
        if (!x.value.includes(item.state.toLowerCase())) {
          return false;
        }
        const firstThreeLetters = formattedSuburb.substring(0,3);
        if(!x.value.includes(firstThreeLetters)) {
          return false
        }
        if (!x.value.includes(item.state.toLowerCase())) {
          return false;
        }
        return true;
      });
      

      if(filtered.length) {

        output.push(filtered[0])
        console.log(output)
        
        fs.writeFileSync(`data/${count}.json`, JSON.stringify(output), {
          flag: "wx",
          encoding: "utf8",
        });
      }
      

      await sleep(50);
      count++;
    }
  }
  console.log("count", count);
};

run();

const https = require("https");
const fs = require("fs");

function makeRequest(options) {
  options.headers = {
    authority: "www.domain.com.au",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "en,id;q=0.9,en-AU;q=0.8,en-US;q=0.7",
    "cache-control": "max-age=0",
    cookie:
      'searchSOI=qld; domain-mixpanel-id_ab0bde70050c3eabaaf8824402fa01e0=17c86383f0722f-060dc2757979da-1d3b6650-4da900-17c86383f08b93; DEVICE_SESSIONID=fbeb9142-57a1-4c24-8ee9-11079957fa49; _gcl_au=1.1.967721555.1689028626; _duid=undefined; _tgpc=1142aaae-8f76-5822-9ded-8d207fa445a3; _hjid=22df061d-236e-4a85-8929-6645a3edb49c; _hjSessionUser_966278=eyJpZCI6IjAxNTcxZDBjLWRjOGYtNWM5OC1iMDliLTY3ZWY4MDRiYTJmYiIsImNyZWF0ZWQiOjE2ODkwMjg2MjY4MTEsImV4aXN0aW5nIjp0cnVlfQ==; DM_SitId1455=1; DM_SitId1455SecId12673=1; AMCVS_50AB0C3A53DB1B290A490D4D%40AdobeOrg=1; _dommem=member; aam_did=73479434817952325833538647447935282675; NUID=31c519041bef4105a6803fc01e7952a5; __gsas=ID=b542a291dc613b5b:T=1689028659:RT=1689028659:S=ALNI_MbX5xS0W5YFUykzkFtXMiyc_ZxGVw; DM_SitId1455SecId12671=1; __hstc=80052872.4ffe0d9299b627a583239f72a3e2d933.1689030446073.1689030446073.1689030446073.1; hubspotutk=4ffe0d9299b627a583239f72a3e2d933; __hssrc=1; _pin_unauth=dWlkPU1UTmlZekpoWldFdFpqUTFOaTAwWWpJM0xUaGlZbVF0TldWalpqRmlNMk5pTjJFNA; HPG2=false; _ltm_referrer=https%3A%2F%2Fwww.google.com%2F; optimize=segment%3D18388029; _ga_XQ0HFHLTBL=GS1.1.1689114162.2.0.1689114162.0.0.0; _gid=GA1.3.1260387671.1689382852; _ga_3W8KH4GD7S=GS1.1.1689382852.3.0.1689382852.0.0.0; _derived_epik=dj0yJnU9eTZXNnVyVnBHQXdaNTJHMGhGMTVrcnNvNEJxOE5pdmkmbj1PZ1pzNTFac3VnbWJXcF8yVUxnQnd3Jm09MSZ0PUFBQUFBR1N5VV9rJnJtPTEmcnQ9QUFBQUFHU3lVX2smc3A9Mg; bm_sz=38B7F0483552BF5CA6DBDF70299CFA4C~YAAQLKgtF9rU3k6JAQAA7R3OWxSPTieb097V78SFZ573e0RUMHrImQofm5SNi484lBrXrHWqozMMfHUucTuHttcRAOSSUZhlHAUwDMsyD33Obr/xiimW8REjwywLG0RsU+x9gtXXmKeA9AlG9H22HJzKfY2mbvSpjgyUoJ45c+oJpP3hLD5INHP0n6IqySBH9JGvJ96DYfpyJ53vvXCFL5dWJkNipwLM8q5m+TPBIt1oEgnwk3whD1rsPqmyD0R85v7R4RuF4Ys06ijlBRPRda8vbL5xdXh2c16LuTEfn/1YuUir9xc=~3485766~3229251; _abck=4773194439C20684580456EE14DC3422~0~YAAQLKgtF/zU3k6JAQAAdB/OWwrvFBT+gXMskEfjpthgB6wXUGelFX+xwOKtTDfs8DLqeWosHGt1xTF8nR9bE5X8isQS2lKK+Ds2eGnuCLI8Ju+czbideQ5tNYdthLhck0499uriQfP6lyhnG4xTatXEQKXwTVik1obubRpm9JOjtn+RgSbntuN5hl4xFfNcCZsihpuIHAxYn8Xpqgrq3lXweKvbkdsZm5gROf3/ej7tuZRFGT/1GNvNBBrxmUpmKaZvACofIAxVr23myY65M3NvsnFWFHzJu/okAfwXdga3gHbM++qe4Je1bTVogQlHUt3h2nVhQEt+0/9Fx7JEk4iOAxUWV33y5OHJhgKgbpGkeAPn8z20C/kdyFN4SvDlplWcZxO33nb7FNRkfGCinOMvvm3DiSMryyzA~-1~-1~1689465869; ak_bmsc=CF34C007DA04F84FEFECD6453F8C2CCD~000000000000000000000000000000~YAAQLKgtFyjV3k6JAQAA2iHOWxQuGpkn99lQG5McqntRZKFuqhxf4IbHMnWukwzh72CaNm0KOsPCi6t9anMWCuZqBgG9AFnQXVxaq2O9kLiuqdoeYvu2tug6Wlyn8dpydnVpfNm1ydj15do9sDJ27mnad3vVElkZuRt2MZA+GRyevFhMrfQGWUxryFl+0QbsxOmP2xYFCGrK6miiDgtSrYh3HstSFpMWWNz+wPddB+wsJHNrwpzyaL6ECT/ylw1JqTVkWm92V9lTDaHAgEN9i/SHZz7KF8w7XXHtXjAwVoWfMignvyWkm9HMKDPhJZbFrgSp5hlHprge5tC+vF3Gj5cJdfMIZM2MBqsAaEsJ4Ipd4q9pmAXeYYr6nZvccPeaqT+N3sJSwxS9+5MpJujS3W9Vu/HlGMqOqTHvEQ/1LOrVg+/TgCoPNaqxCSLGowHKmAKkm4ifbFeNLeMYwu7NLAqV5KIX3vl4IrmlcBGG9cIc2W6heXfgpkhm+J8w; _tguatd={"sc":"(direct)"}; _tgidts={"sh":"d41d8cd98f00b204e9800998ecf8427e","ci":"c13dbc69-2e02-5174-b03e-5e2f97b7bd4a","si":"6980b351-5b6a-5ab3-97dc-24af10fc3127"}; _hjSession_966278=eyJpZCI6ImEwOWJjNGYzLTMzYTgtNGNjNi1hNzg0LTQxM2M5NmQwODhhMCIsImNyZWF0ZWQiOjE2ODk0NjIzODMzNDAsImluU2FtcGxlIjp0cnVlfQ==; _hjAbsoluteSessionInProgress=0; AMCV_50AB0C3A53DB1B290A490D4D%40AdobeOrg=-1124106680%7CMCIDTS%7C19554%7CMCMID%7C73462533263068506283535832354595936752%7CMCAAMLH-1690067183%7C8%7CMCAAMB-1690067183%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1689469583s%7CNONE%7CMCAID%7C30B5067EA35D072F-60000DF797DEE80A%7CvVersion%7C5.2.0%7CMCCIDH%7C1320732531; _tgsc=6980b351-5b6a-5ab3-97dc-24af10fc3127:-1; _tgtim=6980b351-5b6a-5ab3-97dc-24af10fc3127:1689462386704:-1; _ga_MCWE28T85S=GS1.3.1689462428.1.0.1689462428.60.0.0; __zlcmid=1GrlyOO2He35Lz6; _tglksd={"s":"6980b351-5b6a-5ab3-97dc-24af10fc3127","st":1689462383150,"sod":"(direct)","sodt":1689408440030,"sods":"c","sodst":1689462432330}; _ga_HFSVJ1Z577=GS1.1.1689462383.9.1.1689463487.58.0.0; _ga_2EL8LE3P1V=GS1.1.1689462383.9.1.1689463487.0.0.0; _ga=GA1.1.172928287.1689028625; _uetsid=9f22de6022e611ee8a0f2f665fdb4a03; _uetvid=0957f9c02e0d11ec969885b89a1a52dc; TEAL=v:218941f38911179105927755697225375331a6d7b60$t:1689465287852$sn:8$en:3$s:1689462383670%3Bexp-sess; _hjIncludedInSessionSample_966278=1; _tgsid={"lpd":"{"lpu":"https://www.domain.com.au%2F","lpt":"Domain.com.au%20%7C%20Real%20Estate%20%26%20Properties%20For%20Sale%20%26%20Rent"}","ps":"7bf7ca4b-5949-4ed0-9d6e-a6fae66550f1","ec":"6","pv":"1"}; cto_bundle=aDUnCF9UY0I3ZTMzNWNpbFdVR1BQZWF5M0JPcUkyJTJCT21tUDFYTTJneURybXRDaSUyRllFOWVlYVFMUSUyRlZzVHdyJTJGeU1ldGpuU1FkamhvcERoZkkzSnRnNmd4UUdlOWlZJTJCUGRodnlYY0NhYWxXYlZRcHJ4ajRDYnFtQ2o2VE5PRk5GUjVpUExISm9IMGNLYUc5Z2NYQiUyRlBzZzRGSkREeDk3bjFBTiUyQlo5NlNPblRVb1FVWWQ4VWVYT3lZRm9lJTJCSWxFNk9YbE82alJiYmVwVzRPSVJFZXJ3MnZFdGIydyUzRCUzRA; nol_fpid=wegm0obowja5gkivyyn5szyblxfra1689028626|1689028626941|1689463488203|1689463488473; bm_sv=05CB586BC72181C166B9F60FDBCD7626~YAAQLKgtF6k14U6JAQAAxQHlWxS8Fd8srvw5C17c1p5x2kk99KzJfcOq1C+9kV5sdl5nTQY/JX8cdR8uakwjlnZNBk/njUaOOcxOsRxrKZV6eVPP/ni6OWIY5FXN/0Ujvm46drhyvfJUsIuL1WDK/W4K0QsZK7Lb8h0osCoLTmr40LzDT6PYbr4id+KQWyKBTNEbjbR2I8YXAeBfSBcdohGkmoQcgMetYeUDZt8EovWYJG4kvYtNCli7jauC94rc84CcHQ==~1; searchSOI=qld; _abck=4773194439C20684580456EE14DC3422~-1~YAAQLKgtF/zZ4U6JAQAASN7qWwqrwQWCKyhlQbmF3XyfeYUN7PggYiBjFy2oevAYzBnbzIMHQ/hXgmxoC9Oe7+osjD9AWrbUhilCl725PD5YSDSvoTjhdAzA7BfFnWi3hZrzBzws4D7NVYQYhvELj3Y9Idl+TZoSVRKFQD9kruQFuukfsUmuMBWOItw248fk4fBclC1ldU2CtGkcw69PW7g7VKX8bgW9uEgOytlUAIMbpX4nLumfUsds/h2TR4DShsJKD5iHA0NevRYgWGJJiZu2F89Kg+doSk/ABUtkDE7SKZuq+wvh+fcUAjpwmV5eSkvLLGpYd0ZGDGQB+UXg3D2aoIaJR5MsaU95oeOyU78yfphW8zB0CVPSkwAnCHO/isfQFoxn3JNtw1ywwLAB9eeYCdiemhYubTyA~0~-1~1689465869; bm_sv=05CB586BC72181C166B9F60FDBCD7626~YAAQLKgtF/3Z4U6JAQAASN7qWxQx3dNUqn7xSAhlRI4iRMB7H/zm6tStPpHtLGDSyDaSsjT841rjDxatllm3qA7eKPmhghqUX/Zs9PfoHBhM484kbqph020wBXmKb9Z86F63YSX3uRjFH6KNwVJREL4UwwzeUD9X0jpGLOm1aJx7ARpGPmjR+C8BKbK8axEj6O+R60YKywj7QL68+eGgbKHbAhfspViuN9tUE9UmINCxQ4fB57/dulAkYcSkBSc8dZIxBQ==~1',
    "sec-ch-ua":
      '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "",
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let chunks = [];

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

function extractText(text) {
  const regex =
    /<script\s+id="__NEXT_DATA__"\s+type="application\/json">\s*({.*?})\s*<\/script>/s;
  const match = text.match(regex);

  if (match && match.length >= 2) {
    const jsonContent = match[1];

    try {
      const jsonObject = JSON.parse(jsonContent);
      const propertyData =
        jsonObject.props.pageProps.componentProps.listingsMap;
      return propertyData;
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }
}

function cleanPriceString(priceString) {
  const cleanedString = priceString.replace(/[$,]/g, "");
  const numericValue = parseFloat(cleanedString);
  return numericValue;
}

const monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const convertTagToDate = (tag) => {
  const [day, month, year] = tag.slice(-11).split(" ");
  return new Date(year, monthMap[month], day);
};

const filterFields = (propertyData) => {
  let outputArray = [];
  const keys = Object.keys(propertyData);
  keys.forEach((key) => {
    outputArray.push({
      price: cleanPriceString(propertyData[key].listingModel.price),
      dateSold: convertTagToDate(propertyData[key].listingModel.tags.tagText),
      address: `${propertyData[key].listingModel.address.street} ${propertyData[key].listingModel.address.suburb}`,
      suburb: propertyData[key].listingModel.address.suburb,
      state: propertyData[key].listingModel.address.state,
      features: propertyData[key].listingModel.features,
    });
  });
  return outputArray;
};

async function makeRequests(suburbObject, suburbCounter) {
  let domainSuburbsProcessed = JSON.parse(
    fs.readFileSync("./domain-suburbs-processed.json", "utf8")
  );

  const { urlPath, suburb } = suburbObject;

  if (domainSuburbsProcessed[suburb]) {
    return;
  }

  let output = [];


  const getOptions = (type, page) => {
    return {
      method: "GET",
      hostname: "www.domain.com.au",
      path: `/sold-listings/${urlPath}/${type}/?excludepricewithheld=1&page=${page}`,
    };
  }
  
  for (const type of ["house", "apartment", "town-house"]) {
    let pageCount = 1;
    let isContinue = true;
    while (isContinue) {
      const promises = [
        makeRequest(getOptions(type, pageCount + 0)),
        makeRequest(getOptions(type, pageCount + 1)),
        makeRequest(getOptions(type, pageCount + 2)),
        makeRequest(getOptions(type, pageCount + 3)),
        makeRequest(getOptions(type, pageCount + 4)),
      ];
      const promiseResults = await Promise.all(promises);

      promiseResults.forEach((result, i) => {
        let properties = extractText(result);
        properties = filterFields(properties);
        if (properties.length && pageCount < 45) {
          output.push(...properties);
          console.log(
            `Log: ${suburbCounter} - ${pageCount + i} - ${urlPath} - ${type} - ${properties.length} properties fetched`
            );
          } else {
            console.log(
              `Aborting: ${suburbCounter} - ${pageCount + i} - ${urlPath} - ${type} - ${properties.length} properties fetched`
              )
            isContinue = false;
          }
        })
        pageCount = pageCount + 5;

      
    }
  }

  fs.writeFileSync(
    `data/${suburbCounter}-${suburb}.json`,
    JSON.stringify(output),
    { flag: "wx", encoding: "utf8" }
  );

  domainSuburbsProcessed[suburb] = true;
  fs.writeFileSync('domain-suburbs-processed.json', '');
  fs.appendFileSync(
    `domain-suburbs-processed.json`,
    JSON.stringify(domainSuburbsProcessed),
    {  encoding: "utf8" }
  );
  // fs.writeFileSync(
  //   `domain-suburbs-processed.json`,
  //   JSON.stringify(domainSuburbsProcessed),
  //   { flag: "wx", encoding: "utf8" }
  // );
}

const main = async () => {
  let suburbs = JSON.parse(fs.readFileSync("./domain-suburbs.json", "utf8"));
  suburbs = suburbs.map((x) => ({
    urlPath: x.value,
    suburb: x.label,
    skip: x.skip,
  }));

  let count = 0;
  for (const suburb of suburbs) {
    if (!suburb.skip) {
      await makeRequests(suburb, count);
    }
    count++;
  }
};

main();

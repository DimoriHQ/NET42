import axios from "axios";

export const authorize = (req) => {
  var url = encodeURIComponent(req.protocol + "//" + req.host + "/v1/home");
  var strava_authorize = `${process.env.STRAVA_AUTH_LINK!}?client_id=${process.env.STRAVA_CLIENT_ID!}&redirect_uri=${url}&approval_prompt=auto&scope=read%2Cactivity%3Aread&response_type=code`;

  return strava_authorize;
};

export const strava_data = async (req) => {
  let code = req.query.code;
  const token = await axios.post(`${process.env.STRAVA_TOKEN_LINK}?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`);
  const token_data = token.data;
  const access_token = token_data.access_token;

  const datetimenow_seconds = Date.now() / 1000;
  const campaign_startdate = new Date("10/01/2023 00:00:00");
  const campaign_startdate_seconds = campaign_startdate.getTime() / 1000;
  const page = 1;
  const per_page = 100;

  let link = `${process.env.STRAVA_ATHLETE_LINK}/activities?before=${datetimenow_seconds}&after=${campaign_startdate_seconds}&page=${page}&per_page=${per_page}`;
  const data = await axios.get(link, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  var total_distance = 0;
  data.data
    .filter((e) => {
      return e.name.includes("Run");
    })
    .forEach((e) => {
      total_distance += e["distance"];
    });

  return total_distance;
};

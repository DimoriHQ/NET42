import axios from "axios";

export const authorize = (req) => {
  var url = encodeURIComponent(req.protocol + "//" + req.host + "/v1/home");
  var strava_authorize = `${process.env.STRAVA_AUTH_LINK!}?client_id=${process.env.STRAVA_CLIENT_ID!}&redirect_uri=${url}&approval_prompt=auto&scope=read%2Cactivity%3Aread&response_type=code`;

  return strava_authorize;
};

export const getToken = async (code: string) => {
  let token = await axios.post(`${process.env.STRAVA_TOKEN_LINK}?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${code}&grant_type=authorization_code`);
  return token.data.access_token
}

export const getTrackingData = async (access_token: string, registertime: number, endtime: number, page: number, per_page: number) => {
  const link = `${process.env.STRAVA_ATHLETE_LINK}/activities?before=${endtime}&after=${registertime}&page=${page}&per_page=${per_page}`;
  let data = await axios.get(link, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  
  return data.data.filter((e) => {
     return e.name.includes("Run");
   });
};

export const getDistance = async (activities) => {
  var total_distance = 0;
  if (activities){
    activities
    .forEach((e) => {
      total_distance += e["distance"];
    });
  }
  return total_distance;
};
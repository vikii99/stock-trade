import axios from 'axios'

const TOKEN = "cg7bct1r01qus5fl1h30cg7bct1r01qus5fl1h3g";
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
});
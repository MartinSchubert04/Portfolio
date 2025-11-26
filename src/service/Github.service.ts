import axios from "axios"
class GithubService {
  async getCommitData() {
    const res = await axios.get("https://github-contributions-api.jogruber.de/v4/MartinSchubert04")
    return res.data
  }
}

export const githubService = new GithubService()
